export const Information = ({ recipe }) => {
  return (
    <div className="bg-white px-6 lg:px-12 py-6 rounded-lg shadow w-11/12 lg:w-5/12 mx-auto -mt-4 lg:-mt-12">
      <div className="flex items-center gap-4">
        <i className="fa-solid fa-utensils text-2xl lg:text-4xl"></i>
        <span className="text-xl lg:text-2xl">{ recipe.name }</span>
      </div>

      <div className="flex flex-col gap-4 mt-6 lg:mt-8">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-angles-right text-lg"></i>

          <div className="text-lg font-light">
            <span className="mr-1">Servings:</span>
            <span className="text-gray-400">{ recipe.servings }</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <i className="fa-solid fa-angles-right text-lg"></i>

          <div className="text-lg font-light">
            <span className="mr-1">Time Coooking:</span>
            <span className="text-gray-400">{ recipe.timeCooking }</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <i className="fa-solid fa-angles-right text-lg"></i>

          <div className="text-lg font-light">
            <span className="mr-1">Time Preparation:</span>
            <span className="text-gray-400">{ recipe.timePreparation }</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <span className="py-2 px-8 bg-purple text-white font-semibold">
          { recipe.category.name }
        </span>
      </div>
    </div>
  );
}
