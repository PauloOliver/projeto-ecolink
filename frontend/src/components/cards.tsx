import { Card } from "flowbite-react";

export function CardsComponent() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      <Card
        className="max-w-sm"
        imgAlt="Imagem 1"
        imgSrc="https://flowbite.com/docs/images/carousel/carousel-1.svg"
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
      </Card>

      <Card
        className="max-w-sm"
        imgAlt="Imagem 2"
        imgSrc="https://flowbite.com/docs/images/carousel/carousel-1.svg"
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          New AI advancements 2024
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          The latest breakthroughs in artificial intelligence this year and their applications.
        </p>
      </Card>

      <Card
        className="max-w-sm"
        imgAlt="Imagem 3"
        imgSrc="https://flowbite.com/docs/images/carousel/carousel-1.svg"
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Startup funding trends
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Overview of recent startup funding trends and investment highlights.
        </p>
      </Card>

      <Card
        className="max-w-sm"
        imgAlt="Imagem 4"
        imgSrc="https://flowbite.com/docs/images/carousel/carousel-1.svg"
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Startup funding trends
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Overview of recent startup funding trends and investment highlights.
        </p>
      </Card>
      <Card
        className="max-w-sm"
        imgAlt="Imagem 4"
        imgSrc="https://flowbite.com/docs/images/carousel/carousel-1.svg"
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Startup funding trends
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Overview of recent startup funding trends and investment highlights.
        </p>
      </Card>
    </div>
  );
}
