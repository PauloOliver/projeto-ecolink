
import { CardComponent } from "../components/Card";
import { CarouselMain } from "../components/Carousel";
import { JumbotronMain } from "../components/Jumbotron.tsx";
import { MapaComponent } from "../components/Mapa";



export default function HomePage() {
  return (
    <>
      <JumbotronMain/>
      <div className="mt-20 mx-5 text-center">
        <h1 className="text-5xl font-extrabold dark:text-white"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Conecte-se</span><small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">com pessoas como você!</small></h1>
        <CarouselMain/>
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
        <MapaComponent/>
      </div>

    </>
  );
}
