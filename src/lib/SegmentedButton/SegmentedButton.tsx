import React, { useCallback } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { ButtonSize } from "../Button/Button";

import "./bootstrap.scss";

export type Segment = {
  title: string;
  value: any;
};

type Props = {
  name: string;
  segments: Segment[];
  value: any;
  onChange: (value: any) => void;
  size?: ButtonSize;
  className?: string;
};

const SegmentedButton: React.FC<Props> = ({
  name,
  segments,
  size,
  value,
  className,
  onChange,
}) => {
  const handleChange = useCallback(
    (value: string) => onChange(value),
    [onChange]
  );

  return (
    <ToggleButtonGroup
      name={name}
      type="radio"
      value={value}
      onChange={handleChange}
      className={className}
      size={size !== "md" ? size : undefined}
    >
      {segments.map((segment) => (
        <ToggleButton
          key={segment.value}
          id={segment.value}
          value={segment.value}
          variant="outline-primary"
        >
          {segment.title}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default SegmentedButton;
