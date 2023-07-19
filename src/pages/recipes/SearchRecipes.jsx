import { Header } from '../../components/Header';

export const SearchRecipes = () => {
  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      <section className="mt-28 pb-10">
        <div className="w-11/12 md:w-6/12 xl:w-4/12 mx-auto shadow-md rounded-md px-4 py-2 flex items-center gap-2">
          <input className="flex-1 py-1 text-sm outline-none" type="text" placeholder="Search..." />

          <button
            type="button"
            className="text-sm bg-dark-purple border-2 border-dark-purple transition-all ease-linear duration-200 py-1 px-6 rounded-md text-white uppercase font-bold"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mx-4 md:mx-16 lg:mx-32">
          {/* { loading && <span className="loader"></span> } */}

          { [1, 2, 3, 4, 5, 6, 7, 8, 9].map(recipe => (
            <div
              key={ recipe.id }
              className="recipe-card flex flex-col my-2 hover:-translate-y-3 transition duration-500 cursor-pointer"
              // onClick={ () => goToDetails(recipe.id) }
            >
              <div
                className="w-full h-36 rounded-t-md background-image relative"
                style={{
                  // backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(0, 0, 0,.35)), url(${ recipe.imageUrl })`
                  backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(0, 0, 0,.35)), url(https://res.cloudinary.com/dnihaisdg/image/upload/v1655778144/RecipesApp/Recipes/default-recipe_pfodwr.jpg)`
                }}
              >
                <div className="absolute bottom-2 left-4 font-poppins w-11/12">
                  <h4 className="text-white font-bold text-lg">Recipe name</h4>

                  <div className="text-white flex justify-between">
                    <p className="font-semibold text-sm">Servings: { 4 }</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between font-semibold mb-2">
                  <span className="text-xs leading-none">
                    Time Cooking: { '0:10' }
                  </span>

                  <span className="text-xs leading-none">
                    Time Preparation: { '0:20' }
                  </span>
                </div>

                <div>
                  <span className="text-black font-normal text-xs leading-none">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia incidunt voluptatum aperiam!
                  </span>
                </div>
              </div>
            </div>
          )) }
        </div>

        <nav className="mt-8 flex justify-center">
          <div className="inline-flex -space-x-px">
            <span
              className="px-3.5 py-1 text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </span>

            <span
              className="cursor-pointer px-3.5 py-1 border border-gray-300 bg-gray-100 text-gray-700"
            >
              1
            </span>

            <span
              className="cursor-pointer px-3.5 py-1 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              2
            </span>

            <span
              className="cursor-pointer px-3.5 py-1 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              3
            </span>

            <span
              className="cursor-pointer px-3.5 py-1 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              4
            </span>

            <span
              className="cursor-pointer px-3.5 py-1 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              5
            </span>

            <span
              className="px-3.5 py-1 text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </span>
          </div>
        </nav>
      </section>
    </main>
  );
};
