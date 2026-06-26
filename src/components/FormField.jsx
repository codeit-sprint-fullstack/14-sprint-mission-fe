function FormField({ label, placeholder , type = 'text', value, onChange}) {
  return (
    <label>
      {label}
      <input 
      type={type} 
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      />
    </label>
  )
}

export default FormField;