import { Carousel } from "flowbite-react";

export function CarouselMain() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 no-scrollbar overflow-y-auto">
      <Carousel slideInterval={300} className="no-scrollbar overflow-y-auto">
        <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
      </Carousel>
    </div>
  );
}
