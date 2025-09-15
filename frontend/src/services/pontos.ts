// src/services/pontos.ts
import api from "./api";

export type Ponto = {
  id_localizacao: number | string;
  cidade: string;
  estado: string | null;
  rua: string;
  cep: string;
  bairro: string;
  numero: string | null;
  tb_usuarios_id_usuarios: number | string;
  materiais: string | null;
  horario_funcionamento: string | null;
  contato: string | null;
  observacoes: string | null;
  usuario_id?: number | string;
  usuario_nome?: string | null;
};

// cria ponto usando os nomes do SEU formulário
export async function criarPontoFromForm(form: {
  // seu form:
  tipo: string;          // → materiais
  cep: string;
  numero?: string;
  rua: string;
  bairro: string;
  cidade: string;
  horario?: string;      // → horario_funcionamento
  contato?: string;
  observacoes?: string;
  // 'nome' será ignorado (opção 2)
}) {
  const payload = {
    materiais: form.tipo ?? null,
    cep: form.cep,
    numero: form.numero ?? null,
    rua: form.rua,
    bairro: form.bairro,
    cidade: form.cidade,
    horario_funcionamento: form.horario ?? null,
    contato: form.contato ?? null,
    observacoes: form.observacoes ?? null,
  };
  const { data } = await api.post<Ponto>("/pontos", payload);
  return data;
}

export async function listarPontosCursor(opts?: {
  limit?: number;
  cursor?: number | string | null;
  userId?: number | string | null;
}) {
  const params: Record<string, any> = {};
  if (opts?.limit) params.limit = opts.limit;
  if (opts?.cursor != null) params.cursor = opts.cursor;
  if (opts?.userId != null) params.userId = opts.userId;

  const { data } = await api.get<{
    items: Ponto[];
    next_cursor: number | string | null;
    has_more: boolean;
  }>("/pontos", { params });

  return data;
}
