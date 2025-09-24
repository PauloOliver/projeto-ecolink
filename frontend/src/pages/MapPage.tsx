import { MapComponent } from "../components/MapComponent";

export default function MapPage() {
    return(
        <>
            <div className="mt-5 mx-5 px-10 text-center">
                <h1 className="text-5xl font-extrabold dark:text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Encontre</span>
                <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">locais de coleta próximos a você!</small>
                </h1>
                <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-10 dark:bg-gray-700"></hr>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mt-5">Com o mapa do Ecolink você pode visualizar os pontos de coleta disponíveis na sua região e descartar seus materiais de forma correta. Além disso, é possível cadastrar seus próprios pontos, ajudando outras pessoas a encontrarem locais de reciclagem e tornando sua comunidade mais sustentável.</p>
  
            </div>

            <MapComponent/>
        </>
    );
}
