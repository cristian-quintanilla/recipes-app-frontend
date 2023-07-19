import { Header } from '../../components/Header';

export const MyRecipes = () => {
  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      <section className="mt-28 pb-10">
        <div className="flex flex-col gap-8 lg:gap-10 w-11/12 lg:w-10/12 xl:w-9/12 mx-auto">
          <h2 className="font-semibold text-2xl xl:text-3xl uppercase text-center">
            My Recipes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            { [1, 2, 3, 4, 5, 6, 7, 8, 9].map(recipe => (
              <div
                key={ recipe.id }
                className="recipe-card flex flex-col my-2 hover:-translate-y-3 transition duration-500"
              >
                <div
                  className="w-full h-36 rounded-t-md background-image relative"
                  style={{
                    // backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(0, 0, 0,.35)), url(${ recipe.imageUrl })`
                    backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(0, 0, 0,.35)), url(https://res.cloudinary.com/dnihaisdg/image/upload/v1655778144/RecipesApp/Recipes/default-recipe_pfodwr.jpg)`
                  }}
                >
                  <div className="absolute bottom-2 left-4 font-poppins w-11/12">
                    <div className="flex flex-col items-start">
                      <h4
                        className="text-white hover:text-purple font-bold text-lg w-auto cursor-pointer"
                        // onClick={ () => goToDetails(recipe.id) }
                      >
                        Recipe name
                      </h4>

                      <div className="text-white flex justify-between w-full">
                        <p className="font-semibold text-sm">Servings: { 4 }</p>

                        <div className="flex items-center gap-4">
                          <i className="text-xs fa-solid fa-pencil hover:text-gray-400 cursor-pointer"></i>
                          <i className="text-xs fa-solid fa-trash hover:text-red-500 cursor-pointer"></i>
                        </div>
                      </div>
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
        </div>
      </section>
    </main>
  );
};
