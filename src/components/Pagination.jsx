export const Pagination = ({ recipesPerPage, totalRecipes, paginate }) => {
	const pageNumbers = [];

  for(let i = 1; i <= Math.ceil( totalRecipes / recipesPerPage ); i++){
		pageNumbers.push(i);
	}

  return (
    <nav className="mt-8 flex justify-center">
      <div className="inline-flex -space-x-px">
        { pageNumbers.map(number => (
          <div
            key={ number }
            className="cursor-pointer px-3.5 py-1 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={ () => paginate(number) }
          >
            <span>{ number }</span>
          </div>
        )) }
      </div>
    </nav>
  );
}
