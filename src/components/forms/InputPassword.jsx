import { useState } from 'react';
import { ErrorMessage, useField } from 'formik';

export const InputPassword = ({ label, ...props }) => {
  const [ show, setShow ] = useState(false);
  const [ field ] = useField(props);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div className="relative w-auto md:w-96">
        <input
          className="bg-white-purple py-2 px-6 outline-none rounded-md w-full"
          type={ show ? "text" : "password" }
          { ...field }
          { ...props }
        />

        <span
          className={ `-ml-8 z-10 fa fa-fw cursor-pointer ${ show ? 'fa-eye-slash' : 'fa-eye' }` }
          onClick={ () => setShow(!show) }
        ></span>
      </div>

      <ErrorMessage
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-auto md:w-96"
        name={ props.name }
        component="span"
      />
    </div>
  );
}
