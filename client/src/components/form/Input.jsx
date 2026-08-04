export default function Input({ label, type, id, placeholder, value, onChange }) {
  return (
    <div>
      <label htmlFor={id}>
        {label}
      </label>
      <input 
        type={type} 
        id={id} 
        name={id} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}