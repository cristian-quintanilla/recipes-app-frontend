import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Header } from '../../components';
import { GET_USER } from '../../graphql/queries';

export const User = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_USER, {
    variables: { _id: id },
  });

  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      <section className="mt-28 pb-10 ">
        <div className="wrapper">
          <div className="w-auto md:w-96 mx-auto">
            {
              loading && <div className="bg-white shadow-xl rounded-lg py-3">
                <div className="loader"></div>
              </div>
            }

            {
              data !== undefined &&  <div className="bg-white shadow-xl rounded-lg py-3">
                <div className="photo-wrapper p-2">
                  <img
                    className="w-32 h-32 rounded-full mx-auto shadow-lg"
                    src={ data.getUser.imageUrl }
                    alt="User Name"
                  />
                </div>

                <div className="p-2">
                  <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                    { data.getUser.name }
                  </h3>

                  <div className="text-center text-gray-400 text-xs font-semibold">
                    <p>{ data.getUser.email }</p>
                  </div>

                  <table className="text-xs my-3">
                    <tbody>
                      <tr className="flex flex-col md:flex-row">
                        <td className="px-2 py-2 text-gray-500 font-semibold md:text-right">Age</td>
                        <td className="px-2 py-2">{ data.getUser.age || '-' }</td>
                      </tr>

                      <tr className="flex flex-col md:flex-row">
                        <td className="px-2 py-2 text-gray-500 font-semibold md:text-right">Favorite Recipe</td>
                        <td className="px-2 py-2">{ data.getUser.favoriteRecipe || '-' }</td>
                      </tr>

                      <tr className="flex flex-col md:flex-row">
                        <td className="px-2 py-2 text-gray-500 font-semibold md:text-right">Total Recipes</td>
                        <td className="px-2 py-2">{ data.getUser.totalRecipes || '-' }</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            }
          </div>
        </div>
      </section>
    </main>
  );
};
