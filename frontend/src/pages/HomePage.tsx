import { Carousel } from "flowbite";
import { CardsComponent } from "../components/cards";
import { CarouselMain } from "../components/Carousel";
import HomeBanner from "../components/HomeBanner";


export default function HomePage() {
  return (
    <>
      <CarouselMain/>
      <CardsComponent/>
    </>
  );
}
