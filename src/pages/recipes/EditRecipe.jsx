import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { useRecipeStore } from '../../hooks/useRecipeStore';
import { EditRecipeForm, Header, NotFoundRecipe } from '../../components';

export const EditRecipe = () => {
  const { id } = useParams();
  const { isLoading, recipe, getRecipe } = useRecipeStore();

  useEffect(() => {
    getRecipe(id);
  }, []);

  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      {
        isLoading && <section
          className="mt-10 mx-auto px-4 md:px-12 lg:px-24 flex flex-col md:flex-row gap-4 lg:gap-1 w-full"
        >
          <span className="loader"></span>
        </section>
      }

      {
        recipe && <section className="mt-28 pb-10">
          <div className="flex flex-col gap-8 lg:gap-10 w-11/12 lg:w-10/12 xl:w-7/12 mx-auto">
            <h2 className="font-semibold text-2xl xl:text-3xl uppercase text-center">
              Edit Recipe: { recipe.name }
            </h2>

            <EditRecipeForm recipe={ recipe } />
          </div>
        </section>
      }

      {
        !isLoading && !recipe && (<NotFoundRecipe />)
      }

      <Toaster />
    </main>
  );
}
