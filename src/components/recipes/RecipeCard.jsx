export const RecipeCard = ({ recipe }) => {
  return (
    <>
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
              recipe.description.length >= 94 ? recipe.description.slice(0, 124) + '...' : recipe.description
            }
          </span>
        </div>
      </div>
    </>
  )
}
