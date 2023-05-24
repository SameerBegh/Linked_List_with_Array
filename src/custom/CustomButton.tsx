import { FC } from "react";

interface IButton {
  type: "button" | "submit" | "reset" | undefined;
  className: string;
  label: string;
  onClick?: () => void;
}

const CustomButton: FC<IButton> = ({
  type,
  className,
  onClick,
  label
}) => (
  <button
    type={type}
    className={className}
    onClick={onClick}
  >
    {label}
  </button>
);

export default CustomButton;
