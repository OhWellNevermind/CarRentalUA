import React, { FC } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export const Button: FC<Props> = ({ onClick, text, className }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`bg-blue text-white font-semibold leading-5 py-[12px] rounded-xl hover:bg-dark-blue mt-[28px] ${className}`}
    >
      {text}
    </button>
  );
};
