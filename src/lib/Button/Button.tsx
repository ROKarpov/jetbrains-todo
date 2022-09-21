import React, { MouseEventHandler, useCallback } from "react";
import cn from "classnames";

import "./bootstrap.scss";
import styles from "./Button.module.scss";
import containerStyles from "./Container.module.scss";

export type ButtonType = "filled" | "outlined" | "no-container";
export type ButtonSize = "sm" | "md" | "lg";

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({
  onClick,
  type = "filled",
  size = "md",
  disabled,
  className,
  children,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        styles.button,
        styles[size],
        containerStyles[type],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
