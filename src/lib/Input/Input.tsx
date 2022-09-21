import React, { ChangeEventHandler, FocusEventHandler } from "react";
import { Form } from "react-bootstrap";

import "./bootstrap.scss";

type Props = {
  id: string;
  value: string | string[] | number;
  label?: string;
  type?: string;
  multiline?: boolean;
  readonly?: boolean;
  helperText?: string;
  hasError?: boolean;
  children?: React.ReactNode;
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

const Input: React.FC<Props> = ({
  id,
  value,
  className,
  label,
  helperText,
  multiline = false,
  readonly = false,
  hasError,
  type = "text",
  children,
  onChange,
  onFocus,
  onBlur,
}) => {
  const control = (
    <Form.Control
      id={id}
      as={multiline ? "textarea" : "input"}
      readOnly={readonly}
      type={type}
      aria-describedby={helperText ? `${id}-help-text` : undefined}
      placeholder={label}
      value={value}
      isInvalid={hasError}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
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
