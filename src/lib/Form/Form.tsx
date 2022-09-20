import React from "react";
import BSForm from "react-bootstrap/Form";

import "./bootstrap.scss";

type Props = {
  children: React.ReactNode;
};

const Form: React.FC<Props> = ({ children }) => <BSForm>{children}</BSForm>;
export default Form;
