import React, { Ref } from "react";
import cn from "classnames";

import "./bootstrap.scss";
import styles from "./Button.module.scss";
import containerStyles from "./Container.module.scss";

export type ButtonType = "filled" | "outlined" | "no-container";
export type ButtonColor = "primary" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  containerType?: ButtonType;
  color?: ButtonColor;
  size?: ButtonSize;
  children: React.ReactNode;
  disabled?: boolean;
};

const Button = React.forwardRef(
  (
    {
      containerType = "filled",
      color = "primary",
      size = "md",
      children,
      className,
      disabled,
      ...other
    }: Props,
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          styles.button,
          styles[size],
          containerStyles[`${containerType}-${color}`],
          className
        )}
        disabled={disabled}
        {...other}
      >
        {children}
      </button>
    );
  }
);

export default Button;
