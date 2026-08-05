function FormGroup({ label, children }) {
  return (
    <div className="formGroup">
      <label>{label}</label>
      {children}
    </div>
  );
}

export default FormGroup;
