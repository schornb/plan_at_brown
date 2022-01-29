import React from "react";

interface ButtonProps {
  color: string;
  text: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button style={{ backgroundColor: props.color }} className="btn">
      {props.text}
    </button>
  );
};

export default Button;
