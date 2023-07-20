import { useState } from 'react';

import { Header } from '../../components';

export const Profile = () => {
  const [ show, setShow ] = useState(false);

  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      <section className="mt-28 pb-10">
        <div className="flex flex-col gap-8 lg:gap-10 w-11/12 lg:w-10/12 xl:w-8/12 mx-auto">
          <h2 className="font-semibold text-2xl xl:text-3xl text-center">
            Cristian Quintanilla
          </h2>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-12">
            <div className="flex-1 flex flex-col gap-6">
              <div className="w-40 mx-auto">
                <div
                  className="bg-white-purple hover:opacity-80 flex flex-col justify-center items-center w-32 h-32 p-4 cursor-pointer"
                >
                  <i className="fa-solid fa-camera text-5xl text-gray-300"></i>
                </div>
              </div>

              <input
                className="bg-white-purple py-2 px-6 outline-none rounded-md"
                type="text"
                placeholder="Name..."
              />

              <input
                className="bg-white-purple py-2 px-6 outline-none rounded-md"
                type="number"
                placeholder="Age..."
              />

              <input
                className="bg-white-purple py-2 px-6 outline-none rounded-md"
                type="text"
                placeholder="Favorite recipe..."
              />

              <div className="flex justify-center">
                <button
                  type="button"
                  className="text-sm bg-dark-purple border-2 border-dark-purple px-4 py-2 rounded-md text-white font-bold"
                >
                  Update Account
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-end gap-6">
              <div>
                <input
                  className="bg-white-purple py-2 px-6 outline-none rounded-md w-full"
                  type={ show ? "text" : "password" }
                  placeholder="Password..."
                  id="password"
                  name="password"
                />

                <span
                  className={ `-ml-8 z-10 fa fa-fw cursor-pointer ${ show ? 'fa-eye-slash' : 'fa-eye' }` }
                  onClick={ () => setShow(!show) }
                ></span>
              </div>

              <div>
                <input
                  className="bg-white-purple py-2 px-6 outline-none rounded-md w-full"
                  type={ show ? "text" : "password" }
                  placeholder="Confirm Password..."
                  id="password2"
                  name="password2"
                />

                <span
                  className={ `-ml-8 z-10 fa fa-fw cursor-pointer ${ show ? 'fa-eye-slash' : 'fa-eye' }` }
                  onClick={ () => setShow(!show) }
                ></span>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  className="text-sm bg-dark-purple border-2 border-dark-purple px-4 py-2 rounded-md text-white font-bold"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
