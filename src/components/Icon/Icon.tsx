import React from "react";
import { ReactComponent as Close } from "bootstrap-icons/icons/x-lg.svg";
import { ReactComponent as FileExport } from "bootstrap-icons/icons/file-earmark-arrow-up.svg";
import { ReactComponent as FileImport } from "bootstrap-icons/icons/file-earmark-arrow-down.svg";
import { ReactComponent as List } from "bootstrap-icons/icons/list.svg";
import sizeStyles from "./IconSize.module.scss";

export type IconType = "close" | "file-import" | "file-export" | "list";
export type IconSize = "small" | "medium" | "large";

type Props = {
  type: IconType;
  size?: IconSize;
};

const Icon: React.FC<Props> = ({ type, size = "medium" }) => {
  let sizeClassName = sizeStyles[size];
  switch (type) {
    case "close":
      return <Close className={sizeClassName} />;
    case "file-import":
      return <FileImport className={sizeClassName} />;
    case "file-export":
      return <FileExport className={sizeClassName} />;
    case "list":
      return <List className={sizeClassName} />;
    default:
      return <>{type}</>;
  }
};

export default Icon;
