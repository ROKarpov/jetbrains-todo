import React from "react";
import cn from "classnames";
import { ReactComponent as Close } from "bootstrap-icons/icons/x-lg.svg";
import { ReactComponent as FileExport } from "bootstrap-icons/icons/file-earmark-arrow-up.svg";
import { ReactComponent as FileImport } from "bootstrap-icons/icons/file-earmark-arrow-down.svg";
import { ReactComponent as InfoCircle } from "bootstrap-icons/icons/info-circle.svg";
import { ReactComponent as List } from "bootstrap-icons/icons/list.svg";

import styles from "./Icon.module.scss";

export type IconType =
  | "close"
  | "file-import"
  | "file-export"
  | "info-circle"
  | "list";

type Props = {
  type: IconType;
  className?: string;
};

const Icon: React.FC<Props> = ({ className, type }) => {
  const resultClassName = cn(styles.icon, className);
  switch (type) {
    case "close":
      return <Close className={resultClassName} />;
    case "file-import":
      return <FileImport className={resultClassName} />;
    case "file-export":
      return <FileExport className={resultClassName} />;
    case "info-circle":
      return <InfoCircle className={resultClassName} />;
    case "list":
      return <List className={resultClassName} />;
    default:
      return <div className={resultClassName}>{type}</div>;
  }
};

export default Icon;
