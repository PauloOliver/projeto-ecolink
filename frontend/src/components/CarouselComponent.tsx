import { Carousel } from "flowbite-react";
import img1 from '../assets/coleta_lixo_praia.jpg'
import img2 from '../assets/garrafas.jpg'
import img3 from '../assets/separar_caixa.jpg'

const customTheme = {
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-hidden scroll-smooth rounded-lg", 
    snap: "snap-x"
  }
};

export function CarouselComponent() {
  return (
    <div className="m-6 px-4 h-[80vh] w-[90vw] justify-center">
      <Carousel slideInterval={800} theme={customTheme}>
        <img src={img1} alt="..." />
        <img src={img2} alt="..." />
        <img src={img3} alt="..." />
      </Carousel>
    </div>
  );
}
