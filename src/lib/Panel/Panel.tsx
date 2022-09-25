import React from "react";
import cn from "classnames";

import "./bootstrap.scss";
import styles from "./Panel.module.scss";
import { PredefinedColor } from "../PredefinedColor";

type BackgroundOpacity = "0" | "25" | "50" | "75" | "100";
type BorderRadius = "0" | "xs" | "sm" | "md" | "lg" | "xl" | "pill" | "circle";
type BorderWidth = "0" | "xs" | "sm" | "md" | "lg" | "xl";
type ShadowRadius = "0" | "sm" | "md" | "lg";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  borderRadius?: BorderRadius;
  borderWidth?: BorderWidth;
  borderColor?: PredefinedColor;
  shadowRadius?: ShadowRadius;
  backgroundColor?: PredefinedColor;
  backgroundOpacity?: BackgroundOpacity;
};

const Panel: React.FC<Props> = ({
  children,
  borderRadius,
  borderColor = "primary",
  borderWidth = "xs",
  backgroundColor = "primary",
  backgroundOpacity = "0",
  shadowRadius = "0",
  className,
  ...props
}) => (
  <div
    className={cn(
      styles[`border-${borderWidth}`],
      styles[`border-${borderColor}`],
      styles[`bg-${backgroundOpacity}`],
      styles[`bg-${backgroundColor}`],
      styles[`radius-${borderRadius}`],
      styles[`shadow-radius-${shadowRadius}`],
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default Panel;
