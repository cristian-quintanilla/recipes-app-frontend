import { Header } from '../../components/Header';

export const User = () => {
  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      <section className="mt-28 pb-10 ">
        <div className="wrapper">
          <div className="w-96 mx-auto">
            <div className="bg-white shadow-xl rounded-lg py-3">
              <div className="photo-wrapper p-2">
                <img
                  className="w-32 h-32 rounded-full mx-auto shadow-lg"
                  src="https://res.cloudinary.com/dnihaisdg/image/upload/v1655694955/RecipesApp/Users/user-profile_n1xpld.png"
                  alt="User Name"
                />
              </div>

              <div className="p-2">
                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                  Cristian Quintanilla
                </h3>

                <div className="text-center text-gray-400 text-xs font-semibold">
                  <p>cristiancbtis130@gmail.com</p>
                </div>

                <table className="text-xs my-3">
                  <tbody>
                    <tr>
                      <td className="px-2 py-2 text-gray-500 font-semibold text-right">Age</td>
                      <td className="px-2 py-2">24</td>
                    </tr>

                    <tr>
                      <td className="px-2 py-2 text-gray-500 font-semibold text-right">Favorite Recipe</td>
                      <td className="px-2 py-2">Enchiladas</td>
                    </tr>

                    <tr>
                      <td className="px-2 py-2 text-gray-500 font-semibold text-right">Total Recipes</td>
                      <td className="px-2 py-2">3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
