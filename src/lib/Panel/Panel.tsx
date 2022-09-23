import React from "react";
import cn from "classnames";

import "./bootstrap.scss";
import styles from "./Panel.module.scss";

type BackgroundOpacity = "0" | "25" | "50" | "75" | "100";
type BorderRadius = "0" | "xs" | "sm" | "md" | "lg" | "xl" | "pill" | "circle";
type BorderWidth = "0" | "xs" | "sm" | "md" | "lg" | "xl";
type BorderColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "light"
  | "dark";
type ShadowRadius = "0" | "sm" | "md" | "lg";

type Props = {
  children: React.ReactNode;
  borderRadius?: BorderRadius;
  borderWidth?: BorderWidth;
  borderColor?: BorderColor;
  shadowRadius?: ShadowRadius;
  backgroundOpacity?: BackgroundOpacity;
  className?: string;
};

const Panel: React.FC<Props> = ({
  children,
  borderRadius,
  borderColor = "primary",
  borderWidth = "xs",
  backgroundOpacity = "0",
  shadowRadius = "0",
  className,
}) => (
  <div
    className={cn(
      styles[`border-${borderWidth}`],
      styles[`border-color-${borderColor}`],
      styles[`bg-${backgroundOpacity}`],
      styles[`radius-${borderRadius}`],
      styles[`shadow-radius-${shadowRadius}`],
      className
    )}
  >
    {children}
  </div>
);

export default Panel;
