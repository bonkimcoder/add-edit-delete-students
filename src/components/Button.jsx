const Button = ({
  handleButtonClick,
  text,
  color,
  left_arrow,
  right_arrow,
  display,
}) => {
  return (
    <button
      onClick={handleButtonClick}
      className={`${display} text-white bg-${color}-700 hover:bg-${color}-800 focus:outline-none focus:ring-${color}-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800`}
    >
      {left_arrow} {text} {right_arrow}
    </button>
  );
};

export default Button;
