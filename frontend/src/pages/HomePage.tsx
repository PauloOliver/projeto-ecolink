
import { CardComponent } from "../components/CardComponent.tsx";
import { CarouselComponent } from "../components/CarouselComponent.tsx";
import { Jumbotron } from "../components/Jumbotron.tsx";
import { MapComponent } from "../components/MapComponent.tsx";
import img1 from '../assets/separa_garrafas.jpg';
import img2 from '../assets/separa_materiais.jpg';
import img3 from '../assets/criança_garrafa.jpg';


export default function HomePage() {
  return (
    <>
      <Jumbotron />
      <div className="mt-20 mx-5 text-center">
        <h1 className="text-5xl font-extrabold dark:text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Conecte-se</span>
          <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">com pessoas como você!</small>
        </h1>

        <div className="mt-10 w-full flex justify-center">
          <CarouselComponent />
        </div>
      </div>

      <div className="mt-20 mx-5 text-center">
        <h1 className="text-5xl font-extrabold dark:text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Descubra</span>
          <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">como você pode ajudar!</small>
        </h1>
        <div className="flex flex-wrap justify-center gap-4 p-4">
          <CardComponent image={img1} title="Reciclagem e Limpeza de Materiais" />
          <CardComponent image={img2} title="Organização e Separação de Resíduos"/>
          <CardComponent image={img3} title="Gerenciamento de Resíduos Específicos"/>
        </div>
      </div>

      <div className="mt-20 mx-5 mb-10 text-center">
        <h1 className="text-5xl font-extrabold dark:text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Encontre</span>
          <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">o local certo para você!</small>
        </h1>
        <MapComponent />
      </div>
    </>
  );
}

