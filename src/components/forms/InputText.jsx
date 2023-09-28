import { ErrorMessage, useField } from 'formik';

export const InputText = ({ label, ...props }) => {
  const [ field ] = useField(props);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <input
        className="bg-white-purple py-2 px-6 outline-none rounded-md w-auto md:w-96"
        { ...field }
        { ...props }
      />

      <ErrorMessage
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-auto md:w-96"
        name={ props.name }
        component="div"
      />
    </div>
  );
}
