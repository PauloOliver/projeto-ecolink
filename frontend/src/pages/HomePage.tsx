
import { CardComponent } from "../components/CardComponent.tsx";
import { CarouselComponent } from "../components/CarouselComponent.tsx";
import { Jumbotron } from "../components/Jumbotron.tsx";
import { MapComponent } from "../components/MapComponent.tsx";



export default function HomePage() {
  return (
    <>
      <Jumbotron/>
      <div className="mt-20 mx-5 text-center">
        <h1 className="text-5xl font-extrabold dark:text-white"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Conecte-se</span><small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">com pessoas como você!</small></h1>
        <CarouselComponent/>
      </div>
      <div className="mt-20 mx-5 text-center">
        <h1 className="text-5xl font-extrabold dark:text-white"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Descubra</span><small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">como você pode ajudar!</small></h1>
        <div className="flex flex-wrap justify-center gap-4 p-4">

              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
        </div>
      </div>
      <div className="mt-20 mx-5 mb-10 text-center">
        <h1 className="text-5xl font-extrabold dark:text-white"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Encontre</span><small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">o local certo para você!</small></h1>
        <MapComponent/>
      </div>

    </>
  );
}
