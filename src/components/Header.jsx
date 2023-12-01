import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../hooks';

export const Header = () => {
  const { user, startLogout } = useAuthStore();
  const [ menuOpen, setMenuOpen ] = useState(false);

  return (
    <header className="py-4 px-2 lg:px-8 shadow-md bg-white flex items-center justify-between fixed w-full z-50">
      <NavLink className="font-semibold text-lg xl:text-xl" to="/">
        RecipesApp
      </NavLink>

      {
        user === null ? (
          <div className="flex items-center gap-2">
            <NavLink
              className="border-2 border-dark-purple transition-all ease-linear duration-200 py-1 px-6 rounded-md text-dark-purple uppercase font-bold"
              to="/login"
            >
              Login
            </NavLink>

            <NavLink
              className="bg-dark-purple border-2 border-dark-purple transition-all ease-linear duration-200 py-1 px-6 rounded-md text-white uppercase font-bold"
              to="/register"
            >
              Register
            </NavLink>
          </div>
        ) :  (
          <div className="flex items-center gap-4 cursor-pointer" onClick={ () => setMenuOpen(!menuOpen) }>
            <div>
              <p className="text-base">{ user.name }</p>
              <p className="text-sm text-zinc-500 -mt-1">{ user.email }</p>
            </div>

            <div className="relative inline-block">
              <span className="text-lg text-zinc-500 fa-solid fa-caret-down"></span>

              {
                menuOpen ? (
                  <div className="absolute top-10 right-0 z-10 w-56 rounded-md bg-white shadow-lg border border-zinc-300">
                    <div className="p-3 flex flex-col gap-3">
                      <NavLink
                        className="text-gray-700 block text-sm cursor-pointer py-1 px-2 rounded-sm hover:bg-zinc-200"
                        to="/me"
                      >
                        Profile
                      </NavLink>

                      <NavLink
                        className="text-gray-700 block text-sm cursor-pointer py-1 px-2 rounded-sm hover:bg-zinc-200"
                        to="/home"
                      >
                        Search Recipes
                      </NavLink>

                      {/* User */}
                      <NavLink
                        className="text-gray-700 block text-sm cursor-pointer py-1 px-2 rounded-sm hover:bg-zinc-200"
                        to="/create"
                      >
                        Create Recipe
                      </NavLink>

                      <NavLink
                        className="text-gray-700 block text-sm cursor-pointer py-1 px-2 rounded-sm hover:bg-zinc-200"
                        to="/my-recipes"
                      >
                        My Recipes
                      </NavLink>

                      <span
                        className="text-gray-700 block text-sm cursor-pointer py-1 px-2 rounded-sm hover:bg-zinc-200"
                        onClick={ startLogout }
                      >
                        Sign Out
                      </span>
                    </div>
                  </div>
                ) : null
              }
            </div>
          </div>
        )
      }
    </header>
  );
}
