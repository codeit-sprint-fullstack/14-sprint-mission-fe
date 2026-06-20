function FormField({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-lg font-bold leading-7 text-gray-800" htmlFor={id}>
        {label}
      </label>
      {children}
      {error ? <p className="-mt-1 text-sm font-medium leading-5 text-error">{error}</p> : null}
    </div>
  );
}

export default FormField;
