import React from "react";
import { Tooltip } from "react-bootstrap";
import OverlayTrigger, {
  OverlayTriggerRenderProps,
} from "react-bootstrap/OverlayTrigger";

import "./bootstrap.scss";

type TooltipPosition = "left" | "top" | "right" | "bottom";

type TooltipProviderRenderProps = OverlayTriggerRenderProps;

type Props = {
  tooltipContent: React.ReactNode;
  children: (props: TooltipProviderRenderProps) => React.ReactNode;
  position?: TooltipPosition;
};

const TooltipProvider: React.FC<Props> = ({
  tooltipContent,
  children,
  position = "top",
}) => (
  <OverlayTrigger
    placement={position}
    overlay={<Tooltip>{tooltipContent}</Tooltip>}
    delay={{ show: 150, hide: 250 }}
  >
    {(props) => children(props)}
  </OverlayTrigger>
);

export default TooltipProvider;
