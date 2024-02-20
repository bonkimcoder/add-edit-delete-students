import { useState } from "react";

const Button = ({
  handleButtonClick,
  text,
  color_1,
  color_2,
  left_arrow,
  right_arrow,
  display,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      onClick={handleButtonClick}
      className={`${display} text-white focus:outline-none font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center`}
      style={{ backgroundColor: isHovered ? color_2 : color_1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {left_arrow} {text} {right_arrow}
    </button>
  );
};

export default Button;
