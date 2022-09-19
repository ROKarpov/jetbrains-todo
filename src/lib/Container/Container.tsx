import React from "react";
import BSContainer from "react-bootstrap/Container";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<Props> = ({ children, className }) => (
  <BSContainer className={className}>{children}</BSContainer>
);

export default Container;
