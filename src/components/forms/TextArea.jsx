import { ErrorMessage, useField } from 'formik';

export const TextArea = ({ label, ...props }) => {
  const [ field ] = useField(props);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <textarea
        className="p-2 w-full text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none"
        { ...field }
        { ...props }
      ></textarea>

      <ErrorMessage
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full"
        name={ props.name }
        component="div"
      />
    </div>
  );
}
