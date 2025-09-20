import { Carousel } from "flowbite-react";

const customTheme = {
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-hidden scroll-smooth rounded-lg", 
    snap: "snap-x"
  }
};

export function CarouselComponent() {
  return (
    <div className="m-6 px-4 h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slideInterval={800} theme={customTheme}>
        <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
      </Carousel>
    </div>
  );
}
