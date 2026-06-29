function useProductValidation({ name, description, price }) {
  const isFormValid =
    name.trim() !== "" &&
    description.trim() !== "" &&
    price.trim() !== "";

  return {
    isFormValid,
  };
}

export default useProductValidation;