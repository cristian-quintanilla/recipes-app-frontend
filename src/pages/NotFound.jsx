import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  }

  return (
    <div class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div class="relative">
          <div class="absolute">
            <div class="">
              <h1 class="my-2 text-gray-800 font-bold text-2xl">
                Looks like you've found the doorway to the great nothing
              </h1>

              <p class="my-2 text-gray-800">
                Sorry about that! Please visit our hompage to get where you need to go.
              </p>

              <button
                class="my-2 border rounded md py-4 px-8 text-center bg-dark-purple text-white"
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

      <div>
        <img
          alt="Connector"
          src="/assets/images/connector.png"
        />
      </div>
    </div>
  );
};
