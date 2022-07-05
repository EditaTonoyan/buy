import "./Button.scss";

function Button({ name, type, onClick }) {
  return (
    <button
      className={`w-100 button ${type}`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {name}
    </button>
  );
}

export default Button;
