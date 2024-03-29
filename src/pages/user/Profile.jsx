import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Swal from 'sweetalert2';

import { GET_ME } from '../../graphql/queries';
import { Header, UpdateAccount, UpdatePassword } from '../../components';
import { Toast } from '../../helpers/toast';
import { useUserStore } from '../../hooks';

export const Profile = () => {
  const { data } = useQuery(GET_ME);
  const { error, status, startDeleteAccount } = useUserStore();

  useEffect(() => {
    if (error !== null) {
      Toast.fire({ icon: 'error', title: error, });
    }
  }, [error]);

  const deleteAccount = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        startDeleteAccount();
      }
    })
  }

  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      <section className="mt-28 pb-10">
        <div className="flex flex-col gap-8 lg:gap-10 w-11/12 lg:w-10/12 xl:w-8/12 mx-auto">
          <div className="flex flex-col items-center gap-2">
            <h2 className="font-semibold text-2xl xl:text-3xl text-center">
              { data?.getMe.name }
            </h2>

            <button
              type="button"
              className="red-btn"
              disabled={ status === 'deleting' ? true : false }
              onClick={ () => deleteAccount() }
            >
              <span className="text-white text-sm">Delete Account</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-10 lg:gap-12">
            <UpdateAccount data={ data } />

            <UpdatePassword />
          </div>
        </div>
      </section>
    </main>
  );
};
