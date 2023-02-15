import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Register = () => {
  const [ show, setShow ] = useState(false);

  return (
    <main className="h-screen">
      <header className="py-4 px-2 lg:px-8">
        <span className="font-semibold text-xl">Recipes App</span>
      </header>

      <section className="mt-4 lg:mt-12 mx-auto px-4 md:px-12 lg:px-24 flex flex-col md:flex-row gap-4 lg:gap-12">
        <div className="flex-1 mt-0 lg:mt-16 relative">
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-3xl lg:text-5xl">Sign up to</h2>
            <h3 className='text-lg lg:text-2xl'>and start sharing recipes</h3>

            <div className="mt-4 lg:mt-8">
              <p>If you already have an account</p>
              <p>You can <Link className="text-purple" to={'/login'}>Login here</Link>!</p>
            </div>
          </div>

          <div className="hidden lg:block absolute right-2 top-12">
            <img
              className="h-auto w-72"
              src="/assets/images/auth.png"
              alt="Auth"
            />
          </div>
        </div>

        <div className="flex-1">
          <span className="hidden md:block font-medium text-3xl mb-8">Sign up</span>

          <div className="flex flex-col gap-6 lg:gap-8">
            <div>
              <input
                className="bg-white-purple text-purple py-2 px-6 outline-none rounded-md w-full lg:w-2/3"
                type="text"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <input
                className="bg-white-purple text-purple py-2 px-6 outline-none rounded-md w-full lg:w-2/3"
                type="email"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <input
                className="bg-white-purple text-purple py-2 px-6 outline-none rounded-md w-full lg:w-2/3"
                type={ show ? "text" : "password" }
                placeholder="Password"
              />

              <span
                className={ `-ml-8 z-10 fa fa-fw cursor-pointer ${ show ? 'fa-eye-slash' : 'fa-eye' }` }
                onClick={ () => setShow(!show) }
              ></span>
            </div>

            <div>
              <button
                className="bg-dark-purple hover:opacity-80 shadow-purple transition-all ease-in duration-200 shadow-lg py-2 px-6 focus:outline-none rounded-md w-full md:w-2/3"
              >
                <span className="text-white text-base">Register</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
