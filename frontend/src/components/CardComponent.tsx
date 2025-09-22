export function CardComponent({ image, title }) {
  return (
    <div className="max-w-sm bg-[#11111F] border border-gray-200 rounded-lg shadow-sm dark:bg-[#11111F] dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg w-full h-72 object-cover"  
          src={image}
          alt="Card image"
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, temporibus.
        </p>
        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-sky-400 to-emerald-600 rounded-lg hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          Saiba mais
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
