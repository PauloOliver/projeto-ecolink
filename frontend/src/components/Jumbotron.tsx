

export function JumbotronMain(){
    return(
    <section className="bg-center bg-no-repeat bg-[url(./assets/img-fundo.png)] bg-green-200 bg-blend-multiply">
      <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-[#11111F] md:text-5xl lg:text-6xl">
          Conectando pessoas por mundo melhor!
        </h1>
        <p className="mb-8 text-lg font-normal text-[#11111F] lg:text-xl sm:px-16 lg:px-48">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ipsa culpa praesentium eligendi perspiciatis ullam dignissimos exercitationem quam. Sit molestias hic illo! Hic aspernatur ipsam earum minima provident veniam officia.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <a
            href="#"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg 
             bg-gradient-to-r from-sky-400 to-emerald-600 
             hover:opacity-90 focus:ring-4 focus:ring-sky-300 dark:focus:ring-emerald-900"
          >
            
            Registre-se
            
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
          >
            Logar
          </a>
        </div>
      </div>
    </section>
    )
}