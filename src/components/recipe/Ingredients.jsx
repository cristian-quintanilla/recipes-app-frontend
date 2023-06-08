export const Ingredients = ({ ingredients }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-3/12 text-black font-bold">
        Ingredients:
      </div>

      <div className="w-full md:w-8/12 flex flex-col gap-4">
        {
          ingredients.map((ingredient, index) => (
            <div
              key={ index }
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4"
            >
              <div className="w-full sm:w-8">
                <div className="flex flex-col items-center justify-center w-7 h-7 rounded-full border border-gray-700">
                  <span className="text-sm">{ index + 1 }</span>
                </div>
              </div>

              <div className="w-full sm:w-auto font-medium text-sm">{ ingredient.name }</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
