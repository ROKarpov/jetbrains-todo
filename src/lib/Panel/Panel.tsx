import React from "react";
import cn from "classnames";

import "./bootstrap.scss";
import styles from "./Panel.module.scss";

type BackgroundOpacity = "0" | "25" | "50" | "75" | "100";
type BorderRadius = "0" | "xs" | "sm" | "md" | "lg" | "xl" | "pill" | "circle";
type BorderWidth = "0" | "xs" | "sm" | "md" | "lg" | "xl";

type Props = {
  children: React.ReactNode;
  borderRadius?: BorderRadius;
  borderWidth?: BorderWidth;
  backgroundOpacity?: BackgroundOpacity;
  className?: string;
};

const Panel: React.FC<Props> = ({
  children,
  borderRadius,
  borderWidth = "xs",
  backgroundOpacity = 0,
  className,
}) => (
  <div
    className={cn(
      styles[`border-${borderWidth}`],
      styles[`bg-${backgroundOpacity}`],
      styles[`radius-${borderRadius}`],
      className
    )}
  >
    {children}
  </div>
);

export default Panel;
