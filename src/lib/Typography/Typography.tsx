import cn from "classnames";
import React from "react";

type FontSize = 1 | 2 | 3 | 4 | 5 | 6;
type FontWeighgt = "bold" | "semibold" | "normal" | "light";

type Props = {
  children: React.ReactNode;
  fontSize?: FontSize;
  fontWeight?: FontWeighgt;
  small?: boolean;
  muted?: boolean;
  className?: string;
};

const Typography: React.FC<Props> = ({
  children,
  fontSize = 6,
  fontWeight = "normal",
  small = false,
  muted = false,
  className,
}) => (
  <div
    className={cn(
      `fs-${fontSize}`,
      `fw-${fontWeight}`,
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
