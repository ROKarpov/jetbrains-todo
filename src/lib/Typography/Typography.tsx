import cn from "classnames";
import React from "react";
import { PredefinedColor } from "../PredefinedColor";

type FontSize = 1 | 2 | 3 | 4 | 5 | 6;
type FontWeighgt = "bold" | "semibold" | "normal" | "light";

type Props = {
  children: React.ReactNode;
  fontSize?: FontSize;
  fontWeight?: FontWeighgt;
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
      },
      className
    )}
  >
    {children}
  </div>
);

export default Typography;
