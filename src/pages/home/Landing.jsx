import { useEffect, useState } from 'react';
import './landing.css';

export const Landing = () => {
  const [ recipes, setRecipes ] = useState();

  useEffect(() => {
    setRecipes([
      {
        description: "Descripción...",
        imageUrl: "https://res.cloudinary.com/dnihaisdg/image/upload/v1655778144/RecipesApp/Recipes/default-recipe_pfodwr.jpg",
        name: "Receta uno",
        servings: 6,
        timeCooking: "00:25",
        timePreparation: "00:10",
        id: "6369d3fac6a753cca098aa87"
      },
      {
        description: "Las enchiladas rojas se pueden cocinar con una variedad de chiles y especias diferentes en cada región de México. Estas enchiladas se pueden encontrar en presentaciones diversas: con las tortillas enrolladas; dobladas por la mitad; o dobladas en cuatro como un triángulo; y van rellenas de queso fresco o carne deshebrada de pollo o de cerdo.",
        imageUrl: "https://res.cloudinary.com/dnihaisdg/image/upload/v1655778144/RecipesApp/Recipes/default-recipe_pfodwr.jpg",
        name: "Enchiladas Rojas",
        servings: 6,
        timeCooking: "00:25",
        timePreparation: "00:12",
        id: "635daff15fbe2914570db175"
      }
    ]);
  }, []);

  return (
    <main className="h-screen">
      <header className="py-4 px-2 lg:px-8 shadow bg-white">
        <span className="font-semibold text-xl">RecipesApp</span>
      </header>

      <section
        className="background-image pt-16 lg:pt-48 pb-96 lg:pb-60 pl-4 md:pl-16 lg:pl-32 xl:pl-40 flex flex-col justify-center hero"
      >
        <div className="w-full md:w-3/5 lg:w-2/5">
          <p className="text-xl font-semibold text-purple">RecipesApp</p>
        </div>

        <h1 className="text-4xl lg:text-5xl w-full md:w-3/5 lg:w-2/5 text-white">Your best option for sharing</h1>

        <div className="w-full md:w-3/5 lg:w-2/5 mt-6">
          <p className="text-base text-white">
            With RecipesApp you can search, comment and create recipes.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="px-4 md:px-16 lg:px-32">
          <h2 className="text-xl lg:text-2xl font-bold">Some recipes our users created</h2>
        </div>

        <div className="recipes-row mt-6 ml-4 md:ml-16 lg:ml-32">
          {
            recipes !== undefined ? <> {
              recipes.map(recipe => (
                <div
                  key={ recipe.id }
                  className="recipe-card flex flex-col my-2 w-10/12 md:w-6/12 lg:w-3/12 hover:-translate-y-3 transition duration-300"
                >
                  <div
                    className="w-full h-36 rounded-t-md background-image relative"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(0, 0, 0,.35)), url(${ recipe.imageUrl })`
                    }}
                  >
                    <div className="absolute bottom-2 left-4 font-poppins w-11/12">
                      <h4 className="text-white font-bold text-lg">{ recipe.name }</h4>

                      <div className="text-white flex justify-between">
                        <p className="font-semibold text-sm">Servings: { recipe.servings }</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between font-semibold mb-2">
                      <span className="text-xs leading-none">
                       Time Cooking: { recipe.timeCooking }
                      </span>

                      <span className="text-xs leading-none">
                       Time Preparation: { recipe.timePreparation }
                      </span>
                    </div>

                    <div>
                      <span className="text-black font-normal text-xs leading-none">
                        {
                          recipe.description.length >= 94 ? recipe.description.slice(0, 94) + '...' : recipe.description
                        }
                      </span>
                    </div>
                  </div>
                </div>
              ))
            } </> : null
          }
        </div>
      </section>
    </main>
  );
}
