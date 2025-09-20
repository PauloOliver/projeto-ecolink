import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Label, TextInput, Textarea, Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { criarPontoFromForm, listarPontosCursor } from "../services/pontos"; // ajuste o caminho se necessário

function ClickMarker({ setPosition }: { setPosition: (p: any) => void }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng); // atualiza posição ao clicar no mapa
    },
  });
  return null;
}

function ClickHandler({
  setPosition,
  setFormData,
}: {
  setPosition: (p: any) => void;
  setFormData: (updater: any) => void;
}) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);

      const link = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2&addressdetails=1`;

      try {
        const response = await fetch(link);
        const data = await response.json();

        if (data && data.address) {
          const address = data.address;
          setFormData((prev: any) => ({
            ...prev,
            cep: address.postcode || "",
            cidade: address.city || address.town || address.village || "",
            rua: address.road || "",
            bairro: address.suburb || "",
            numero: address.house_number || "",
          }));
        } else {
          alert("Endereço não encontrado!");
        }
      } catch (error) {
        console.error(error);
        alert("Erro ao buscar endereço!");
      }
    },
  });
  return null;
}

<<<<<<< HEAD:frontend/src/components/MapComponent.tsx
export function MapComponent() {
  const [position, setPosition] = useState([-22.5233, -44.1044]); // Volta Redonda
=======
export function MapaComponent() {
  const [position, setPosition] = useState<any>([-22.5233, -44.1044]); // Volta Redonda
>>>>>>> joao:frontend/src/components/Mapa.tsx
  const [formData, setFormData] = useState<any>({
    tipo: "",
    cep: "",
    cidade: "",
    rua: "",
    bairro: "",
    numero: "",
    horario: "",
    contato: "",
    observacoes: "",
  });

  const [pontos, setPontos] = useState<any[]>([]);

  // carrega a 1ª página de pontos ao montar
  useEffect(() => {
    (async () => {
      try {
        const { items } = await listarPontosCursor({ limit: 10 });
        setPontos(items);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  // envia para o backend e usa o retorno
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const novo = await criarPontoFromForm({
        tipo: formData.tipo, // mapeado para "materiais" no serviço
        cep: formData.cep,
        numero: formData.numero,
        rua: formData.rua,
        bairro: formData.bairro,
        cidade: formData.cidade,
        horario: formData.horario, // mapeado para "horario_funcionamento"
        contato: formData.contato,
        observacoes: formData.observacoes,
      });

      setPontos((prev) => [novo, ...prev]);
      setFormData({
        tipo: "",
        cep: "",
        cidade: "",
        rua: "",
        bairro: "",
        numero: "",
        horario: "",
        contato: "",
        observacoes: "",
      });
    } catch (err: any) {
      alert(err?.response?.data?.error ?? "Erro ao cadastrar ponto");
    }
  };

  return (
    <section className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
      {/* MAPA + FORMULÁRIO */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* MAPA */}
        <div className="w-full md:w-1/2">
          <MapContainer
            center={position}
            zoom={12}
            className="h-[400px] w-full border-2 border-green-400 rounded-lg shadow-sm"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>Local selecionado</Popup>
            </Marker>
            <ClickMarker setPosition={setPosition} />
            <ClickHandler setPosition={setPosition} setFormData={setFormData} />
          </MapContainer>
        </div>

        {/* FORMULÁRIO */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 flex flex-col gap-3 p-4 bg-white rounded-lg shadow-md"
        >
          <Label htmlFor="tipo" value="Tipo de resíduos" />
          <TextInput
            id="tipo"
            name="tipo"
            placeholder="Ex: Plástico, Papel"
            required
            value={formData.tipo}
            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-2">
            <TextInput
              id="cep"
              name="cep"
              placeholder="CEP"
              value={formData.cep}
              onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
            />
            <TextInput
              id="numero"
              name="numero"
              placeholder="Número"
              value={formData.numero}
              onChange={(e) =>
                setFormData({ ...formData, numero: e.target.value })
              }
            />
          </div>

          <TextInput
            id="rua"
            name="rua"
            placeholder="Rua"
            value={formData.rua}
            onChange={(e) => setFormData({ ...formData, rua: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-2">
            <TextInput
              id="bairro"
              name="bairro"
              placeholder="Bairro"
              value={formData.bairro}
              onChange={(e) =>
                setFormData({ ...formData, bairro: e.target.value })
              }
            />
            <TextInput
              id="cidade"
              name="cidade"
              placeholder="Cidade"
              value={formData.cidade}
              onChange={(e) =>
                setFormData({ ...formData, cidade: e.target.value })
              }
            />
          </div>

          <TextInput
            id="horario"
            name="horario"
            placeholder="Horário de funcionamento"
            value={formData.horario}
            onChange={(e) =>
              setFormData({ ...formData, horario: e.target.value })
            }
          />

          <TextInput
            id="contato"
            name="contato"
            placeholder="Contato"
            value={formData.contato}
            onChange={(e) =>
              setFormData({ ...formData, contato: e.target.value })
            }
          />

          <Textarea
            id="observacoes"
            name="observacoes"
            placeholder="Observações"
            rows={3}
            value={formData.observacoes}
            onChange={(e) =>
              setFormData({ ...formData, observacoes: e.target.value })
            }
          />

          <Button type="submit" className="bg-[#47D7AC] hover:bg-[#3db79b]">
            Cadastrar ponto
          </Button>
        </form>
      </div>

      {/* LISTA DE PONTOS CADASTRADOS EM CARROSSEL */}
      {pontos.length > 0 && (
        <section className="overflow-x-auto">
          <div className="flex space-x-4 pb-4">
            {pontos.map((ponto, index) => (
              <Card
                key={index}
                className="min-w-[250px] max-w-xs border-green-300 shadow-md flex-shrink-0"
              >
                <h5 className="text-lg font-bold text-green-700">
                  {ponto.usuario_nome ?? "Ponto de coleta"}
                </h5>
                <p className="text-sm text-gray-600">{ponto.materiais}</p>
                <p className="text-sm">{`${ponto.rua}, ${ponto.numero}, ${ponto.bairro} - ${ponto.cidade}`}</p>
                <p className="text-sm text-gray-500">CEP: {ponto.cep}</p>
                {ponto.horario_funcionamento && (
                  <p className="text-sm text-gray-500">
                    ⏰ {ponto.horario_funcionamento}
                  </p>
                )}
                {ponto.contato && (
                  <p className="text-sm text-gray-500">📞 {ponto.contato}</p>
                )}
                {ponto.observacoes && (
                  <p className="text-sm italic text-gray-400">
                    {ponto.observacoes}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
