import { test, assert, startScript, envFile } from 'poku';
import quibble from 'quibble';

await envFile('.env.test');
const port = Number(process.env.PORT || 4000);
const baseURL = `http://localhost:${port}`;

test('server UP responde GET / com 200 e {server:"OK"}', async () => {
  const srv = await startScript('start', {
    startAfter: 'Servidor rodando',
    timeout: 15000
  });

  try {
    const res = await fetch(`${baseURL}/`);
    assert.strictEqual(res.status, 200, `Status inesperado: ${res.status}`);
    const body = await res.json();
    assert.strictEqual(body?.server, 'OK', `Payload inesperado: ${JSON.stringify(body)}`);
  } finally {
    srv.end();
  }
});

test('POST /api/v1/pontos sem token deve falhar (auth guard ativo)', async () => {
  const srv = await startScript('start', {
    startAfter: 'Servidor rodando',
    timeout: 15000
  });

  try {
    const res = await fetch(`${baseURL}/api/v1/pontos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qualquer: 'coisa' })
    });
    assert.ok(res.status >= 400, `Esperava erro de auth, veio ${res.status}`);
  } finally {
    srv.end();
  }
});

test('ClientRepository com DB mockado (getByEmail e listPontosCursor)', async () => {

  await quibble.esm('../src/database/connection.js', {
    dbQuery: async (sql, params = []) => {
      const q = String(sql).toLowerCase();

      if (q.includes('from tb_usuarios') && q.includes('where lower(email)')) {
        const email = (params[0] || '').toString().toLowerCase();
        if (email === 'a@b.com') {
          return {
            rows: [{ id_usuarios: 1, nome_usuarios: 'Alice', email: 'a@b.com' }]
          };
        }
        return { rows: [] };
      }

      if (q.includes('from tb_pontos_coleta') && q.includes('join tb_usuarios')) {
        return {
          rows: [
            { id_localizacao: 30, tb_usuarios_id_usuarios: 10, usuario_id: 10, usuario_nome: 'User' },
            { id_localizacao: 29, tb_usuarios_id_usuarios: 10, usuario_id: 10, usuario_nome: 'User' },
            { id_localizacao: 28, tb_usuarios_id_usuarios: 10, usuario_id: 10, usuario_nome: 'User' }
          ]
        };
      }

      return { rows: [] };
    }
  });

  const repo = await import('../src/repositories/ClientRepository.js');

  const u1 = await repo.getByEmail('a@b.com');
  assert.ok(u1 && u1.id_usuarios === 1, 'getByEmail deve retornar usuário');

  const u2 = await repo.getByEmail('naoexiste@dominio.com');
  assert.strictEqual(u2, null, 'getByEmail deve retornar null quando não encontra');

  const { items, nextCursor, hasMore } = await repo.listPontosCursor({ limit: 2 });
  assert.strictEqual(items.length, 2, 'items deve respeitar o limit');
  assert.strictEqual(hasMore, true, 'hasMore deve ser true quando há mais registros');
  assert.strictEqual(nextCursor, items[items.length - 1].id_localizacao, 'nextCursor deve ser último id da página');

  await quibble.reset();
});
