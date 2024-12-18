function Button({ label, onClick, color = "blue" }) {
  return (
    <div>
      <button onClick={onClick} style={{ backgroundColor: color }}>
        {label}
      </button>
    </div>
  );
}

export default Button;
