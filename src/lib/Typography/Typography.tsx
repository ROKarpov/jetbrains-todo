import cn from "classnames";
import React from "react";
import { PredefinedColor } from "../PredefinedColor";
import styles from "./Typography.module.scss";

type FontSize = 1 | 2 | 3 | 4 | 5 | 6;
type FontWeighgt = "bold" | "semibold" | "normal" | "light";

type Props = {
  children: React.ReactNode;
  fontSize?: FontSize;
  fontWeight?: FontWeighgt;
  multiline?: boolean;
  color?: PredefinedColor;
  small?: boolean;
  muted?: boolean;
  className?: string;
};

const Typography: React.FC<Props> = ({
  children,
  fontSize,
  fontWeight,
  color,
  multiline = false,
  small = false,
  muted = false,
  className,
}) => (
  <div
    className={cn(
      fontSize ? `fs-${fontSize}` : null,
      fontWeight ? `fw-${fontWeight}` : null,
      color ? `text-${color}` : null,
      {
        small: small,
        "text-muted": muted,
        [styles.singleLine]: !multiline,
      },
      className
    )}
  >
    {children}
  </div>
);

export default Typography;
