import { Ingredients } from './Ingredients';
import { Steps } from './Steps';

export const Description = ({ recipe }) => {
  const goToUser = userId => {
    window.open(`${ window.location.origin }/user/${ userId }`, '_blank');
  }

  return (
    <div className="w-11/12 lg:w-5/12 mx-auto mt-4 lg:mt-8 flex flex-col gap-6">
      <div className="bg-indigo-100 rounded-md px-4 lg:px-8 py-3 lg:py-6 text-gray-600 flex flex-col gap-6">
        <div className="italic text-sm">
          { recipe.description }
        </div>

        <div className="flex items-center gap-2">
          <img
            className="h-8 w-auto rounded-full"
            src={ recipe.user.imageUrl ? recipe.user.imageUrl : '/camera.png' }
            alt={ recipe.user.name }
          />

          <div className="flex flex-col">
            <span
              className="text-sm font-bold cursor-pointer"
              onClick={ () => goToUser(recipe.user._id) }
            >
              { recipe.user.name }
            </span>

            <span className="text-xs">{ recipe.user.email }</span>
          </div>
        </div>
      </div>

      <div className="mt-2"></div>

      <Ingredients ingredients={ recipe.ingredients } />

      <Steps steps={ recipe.steps } />
    </div>
  );
}
