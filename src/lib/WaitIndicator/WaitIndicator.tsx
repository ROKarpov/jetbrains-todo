import React from "react";
import { Spinner } from "react-bootstrap";

import "./bootstrap.scss";

type WaitIndicatorSize = "sm";

type Props = {
  size?: WaitIndicatorSize;
  className?: string;
};

const WaitIndicator: React.FC<Props> = ({ size, className }) => (
  <Spinner
    animation="border"
    role="status"
    variant="primary"
    size={size}
    className={className}
  >
    <span className="visually-hidden">Loading...</span>
  </Spinner>
);

export default WaitIndicator;
