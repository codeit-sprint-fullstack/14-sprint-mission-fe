function FormField({ label, placeholder , type = 'text', value, onChange, onKeyDown}) {
  return (
    <label>
      {label}
      <input 
      type={type} 
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      onKeyDown={onKeyDown}
      />
    </label>
  )
}

export default FormField;