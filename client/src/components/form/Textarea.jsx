export default function Textarea({ label, id, placeholder, value, onChange }) {
  return (
    <div>
      <label htmlFor={id}>
        {label}
      </label>
      <textarea 
        id={id} 
        name={id} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}