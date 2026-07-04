const ProductFormField = ({
  label,
  name,
  value,
  onChange,
  error = '',
  multiline = false,
  ...inputProps
}) => {
  const InputElement = multiline ? 'textarea' : 'input'
  const baseClassName = multiline
    ? 'product-registration-form__textarea'
    : 'product-registration-form__input'

  return (
    <label className="product-registration-form__field">
      <span className="product-registration-form__label">{label}</span>
      <InputElement
        name={name}
        value={value}
        onChange={onChange}
        className={`${baseClassName} ${
          error ? 'product-registration-form__input--error' : ''
        }`}
        {...inputProps}
      />
      {error && (
        <p className="product-registration-form__field-error">{error}</p>
      )}
    </label>
  )
}

export default ProductFormField
