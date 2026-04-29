const Button = ({ label, onClick, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white px-4 py-2 rounded-lg transition-colors cursor-pointer ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
