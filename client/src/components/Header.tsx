import React from "react";
import Button from "./Button";

interface HeaderProps {
  title: string;
}

const headerStyle = {
  color: "red",
  backgroundColor: "black",
};

const Header = (props: HeaderProps) => {
  return (
    <header className="header">
      <h1 style={headerStyle}>{props.title}</h1>
    </header>
  );
};

export default Header;
