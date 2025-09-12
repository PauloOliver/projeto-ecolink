import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Label, TextInput, Textarea, Button } from "flowbite-react";
import { useState } from "react";

function ClickMarker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng); // Atualiza posição ao clicar no mapa
    },
  });
  return null;
}





export function MapaComponent() {
     const [position, setPosition] = useState([-22.5233, -44.1044]); // Volta Redonda
     const [formData, setFormData] = useState({
    cep: "",
    cidade: "",
    rua: "",
    bairro: "",
    numero: "",
  });
    
function ClickHandler() {
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

            setFormData({
              cep: address.postcode || "",
              cidade: address.city || address.town || address.village || "",
              rua: address.road || "",
              bairro: address.suburb || "",
              numero: address.house_number || "",
            });
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
  return (
    <section className="flex flex-col md:flex-row gap-4 p-4 items-stretch max-w-4xl mx-auto">
      
      {/* MAPA */}
      <div className="w-full md:w-1/2">
        <MapContainer
          center={[-22.5233, -44.1044]}
          zoom={12}
         className="h-[300px] md:h-full w-full border-2 border-green-400 rounded-lg shadow-sm"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
           <ClickMarker setPosition={setPosition} />
          <ClickHandler></ClickHandler>
        </MapContainer>
      </div>

      {/* FORMULÁRIO */}
      <form
  className="w-full md:w-1/2 flex flex-col gap-3 p-3 bg-white rounded-lg shadow-sm"
>
  <div>
    <Label htmlFor="nome" value="Nome do ponto" />
    <TextInput
      id="nome"
      name="nome"
      type="text"
      placeholder="Ex: Ponto de coleta Central"
      required
      value={formData.nome || ""}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev, nome: e.target.value }))
      }
    />
  </div>

  <div>
    <Label htmlFor="tipo" value="Tipo de resíduos" />
    <TextInput
      id="tipo"
      name="tipo"
      type="text"
      placeholder="Ex: Papel, Plástico, Orgânico"
      required
      value={formData.tipo || ""}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev, tipo: e.target.value }))
      }
    />
  </div>

  <div className="flex gap-2">
    <div className="flex-1">
      <Label htmlFor="cep" value="CEP" />
      <TextInput
        id="cep"
        name="cep"
        type="text"
        placeholder="Ex: 27200-000"
        required
        value={formData.cep || ""}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, cep: e.target.value }))
        }
      />
    </div>
    <div className="flex-1">
      <Label htmlFor="numero" value="Número" />
      <TextInput
        id="numero"
        name="numero"
        type="text"
        placeholder="Ex: 123"
        required
        value={formData.numero || ""}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, numero: e.target.value }))
        }
      />
    </div>
  </div>

  <div>
    <Label htmlFor="rua" value="Rua" />
    <TextInput
      id="rua"
      name="rua"
      type="text"
      placeholder="Ex: Rua das Flores"
      required
      value={formData.rua || ""}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev, rua: e.target.value }))
      }
    />
  </div>

  <div className="flex gap-2">
    <div className="flex-1">
      <Label htmlFor="bairro" value="Bairro" />
      <TextInput
        id="bairro"
        name="bairro"
        type="text"
        placeholder="Ex: Centro"
        required
        value={formData.bairro || ""}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, bairro: e.target.value }))
        }
      />
    </div>
    <div className="flex-1">
      <Label htmlFor="cidade" value="Cidade" />
      <TextInput
        id="cidade"
        name="cidade"
        type="text"
        placeholder="Ex: Volta Redonda"
        required
        value={formData.cidade || ""}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, cidade: e.target.value }))
        }
      />
    </div>
  </div>

  <div>
    <Label htmlFor="horario" value="Horário de funcionamento" />
    <TextInput
      id="horario"
      name="horario"
      type="text"
      placeholder="Ex: 08:00 - 18:00"
      value={formData.horario || ""}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev, horario: e.target.value }))
      }
    />
  </div>

  <div>
    <Label htmlFor="contato" value="Contato" />
    <TextInput
      id="contato"
      name="contato"
      type="text"
      placeholder="Ex: (24) 99999-9999"
      value={formData.contato || ""}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev, contato: e.target.value }))
      }
    />
  </div>

  <div>
    <Label htmlFor="observacoes" value="Observações" />
    <Textarea
      id="observacoes"
      name="observacoes"
      placeholder="Ex: Aceita somente recicláveis"
      rows={3}
      value={formData.observacoes || ""}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev, observacoes: e.target.value }))
      }
    />
  </div>

  <Button type="submit" className="bg-[#47D7AC] hover:bg-[#3db79b]">
    Cadastrar ponto
  </Button>
</form>

    </section>
  );
}
