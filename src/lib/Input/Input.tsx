import React from "react";
import { Form } from "react-bootstrap";

import "./bootstrap.scss";

type Props = {
  id: string;
  label?: string;
  type?: string;
  multiline?: boolean;
  readonly?: boolean;
  helperText?: string;
  children?: React.ReactNode;
  className?: string;
};

const Input: React.FC<Props> = ({
  className,
  id,
  label,
  helperText,
  multiline = false,
  readonly = false,
  type = "text",
  children,
}) => {
  const control = (
    <Form.Control
      id={id}
      as={multiline ? "textarea" : "input"}
      readOnly={readonly}
      type={type}
      aria-describedby={helperText ? `${id}-help-text` : undefined}
      placeholder={label}
    >
      {children}
    </Form.Control>
  );

  return (
    <Form.Group className={className}>
      {label ? (
        <Form.Floating>
          {control}
          <label htmlFor={id}>{label}</label>
        </Form.Floating>
      ) : (
        control
      )}
      {helperText && (
        <Form.Text id={`${id}-help-text`} muted>
          {helperText}
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default Input;
