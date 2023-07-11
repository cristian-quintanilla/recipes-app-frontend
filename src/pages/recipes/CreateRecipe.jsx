import { Header } from '../../components/Header';

export const CreateRecipe = () => {
  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      <section className="mt-28 pb-10">
        <div className="flex flex-col gap-8 lg:gap-10 w-11/12 lg:w-10/12 xl:w-7/12 mx-auto">
          <h2 className="font-semibold text-2xl xl:text-3xl uppercase text-center">
            {/* Change title to edit/create */}
            Create Recipe
          </h2>

          <div className="flex flex-col gap-6">
            <div className="w-40 mx-auto">
              <div
                className="bg-white-purple hover:opacity-80 flex flex-col justify-center items-center w-32 h-32 p-4 cursor-pointer"
              >
                <i class="fa-solid fa-camera text-5xl text-gray-300"></i>
              </div>
            </div>

            <input
              className="bg-white-purple py-2 px-6 outline-none rounded-md"
              type="text"
              placeholder="Name..."
            />

            <textarea
              className="bg-white-purple py-2 px-6 outline-none rounded-md"
              rows="5"
              placeholder="Description..."
            ></textarea>

            <div className="flex flex-col gap-2">
              <span className="text-sm text-dark-purple block">
                Category:
              </span>

              <select
                className="w-full bg-white-purple py-2 px-6 outline-none rounded-md"
              >
                <option value="1">Categoría 1</option>
                <option value="2">Categoría 2</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row lg:items-end gap-4">
              <div className="flex-1">
                <span className="text-sm text-dark-purple block mb-2">
                  Time Preparation:
                </span>

                <div className="flex">
                  <select
                    className="w-24 bg-white-purple py-2 px-6 outline-none rounded-md"
                  >
                    <option value="1">00</option>
                    <option value="2">01</option>
                    <option value="2">02</option>
                    <option value="2">03</option>
                    <option value="2">04</option>
                    <option value="2">05</option>
                  </select>

                  <select
                    className="w-24 bg-white-purple py-2 px-6 outline-none rounded-md"
                  >
                    <option value="1">00</option>
                    <option value="2">05</option>
                    <option value="2">10</option>
                    <option value="2">15</option>
                    <option value="2">20</option>
                    <option value="2">25</option>
                    <option value="2">30</option>
                    <option value="2">35</option>
                    <option value="2">40</option>
                    <option value="2">45</option>
                    <option value="2">50</option>
                    <option value="2">55</option>
                  </select>
                </div>
              </div>

              <div className="flex-1">
                <span className="text-sm text-dark-purple block mb-2">
                  Time Cooking:
                </span>

                <div className="flex">
                  <select
                    className="w-24 bg-white-purple py-2 px-6 outline-none rounded-md"
                  >
                    <option value="1">00</option>
                    <option value="2">01</option>
                    <option value="2">02</option>
                    <option value="2">03</option>
                    <option value="2">04</option>
                    <option value="2">05</option>
                  </select>

                  <select
                    className="w-24 bg-white-purple py-2 px-6 outline-none rounded-md"
                  >
                    <option value="1">00</option>
                    <option value="2">05</option>
                    <option value="2">10</option>
                    <option value="2">15</option>
                    <option value="2">20</option>
                    <option value="2">25</option>
                    <option value="2">30</option>
                    <option value="2">35</option>
                    <option value="2">40</option>
                    <option value="2">45</option>
                    <option value="2">50</option>
                    <option value="2">55</option>
                  </select>
                </div>
              </div>

              <div className="flex-1">
                <input
                  className="bg-white-purple py-2 px-6 outline-none rounded-md"
                  type="number"
                  placeholder="Servings..."
                />
              </div>
            </div>

            <div className="mt-6">
              <span className="text-base font-semibold text-dark-purple block mb-2">
                Ingredients
              </span>

              <div className="flex flex-col gap-2">
                <div className="flex gap-4 lg:gap-8 items-center">
                  <input
                    className="bg-white-purple py-2 px-6 outline-none rounded-md flex-1"
                    type="text"
                    placeholder="Name..."
                  />

                  <button
                    type="button"
                    className="text-sm bg-dark-purple border-2 border-dark-purple px-4 py-2 rounded-md text-white font-bold"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <span className="text-base font-semibold text-dark-purple block mb-2">
                Steps
              </span>

              <div className="flex flex-col gap-2">
                <div className="flex gap-4 lg:gap-8 items-center">
                  <input
                    className="bg-white-purple py-2 px-6 outline-none rounded-md flex-1"
                    type="text"
                    placeholder="Step..."
                  />

                  <button
                    type="button"
                    className="text-sm bg-dark-purple border-2 border-dark-purple px-4 py-2 rounded-md text-white font-bold"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
