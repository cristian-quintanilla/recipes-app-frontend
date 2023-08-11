import { useNavigate } from 'react-router-dom';

export const NotFoundRecipe = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  }

  return (
    <section className="mt-16">
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute">
              <div className="">
                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                  Looks like the recipe doesn't exist
                </h1>

                <p className="my-2 text-gray-800">
                  Sorry about that! Please visit our hompage to search more recipes.
                </p>

                <button
                  className="my-2 border rounded md py-2 px-8 text-center bg-dark-purple text-white"
                  onClick={ goToHome }
                >
                  Take me there!
                </button>
              </div>
            </div>

            <div>
              <img
                alt="404"
                src="/assets/images/404.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
