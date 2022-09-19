import React, { ChangeEventHandler } from "react";
import { Form } from "react-bootstrap";

import "./bootstrap.scss";

type Props = {
  checked: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  readOnly?: boolean;
  label?: string;
  ariaLabel?: string;
  className?: string;
};

const Checkbox: React.FC<Props> = ({
  checked,
  onChange,
  readOnly,
  label,
  ariaLabel,
  className,
}) => {
  return (
    <Form.Check
      className={className}
      readOnly={readOnly}
      aria-label={ariaLabel}
      checked={checked}
      onChange={onChange}
      label={label}
    />
  );
};

export default Checkbox;
