import React from "react";
import cn from "classnames";
import { ReactComponent as Close } from "bootstrap-icons/icons/x-lg.svg";
import { ReactComponent as FileAdd } from "bootstrap-icons/icons/file-earmark-plus-fill.svg";
import { ReactComponent as FileExport } from "bootstrap-icons/icons/file-earmark-arrow-up.svg";
import { ReactComponent as FileImport } from "bootstrap-icons/icons/file-earmark-arrow-down.svg";
import { ReactComponent as List } from "bootstrap-icons/icons/list.svg";
import { ReactComponent as Pencil } from "bootstrap-icons/icons/pencil.svg";
import { ReactComponent as Plus } from "bootstrap-icons/icons/plus-lg.svg";
import { ReactComponent as Trash } from "bootstrap-icons/icons/trash3.svg";

import styles from "./Icon.module.scss";

export type IconType =
  | "close"
  | "file-add"
  | "file-export"
  | "file-import"
  | "list"
  | "pencil"
  | "plus"
  | "trash";

type Props = {
  type: IconType;
  className?: string;
};

const Icon: React.FC<Props> = ({ className, type }) => {
  const resultClassName = cn(styles.icon, className);
  switch (type) {
    case "close":
      return <Close className={resultClassName} />;
    case "file-add":
      return <FileAdd className={resultClassName} />;
    case "file-import":
      return <FileImport className={resultClassName} />;
    case "file-export":
      return <FileExport className={resultClassName} />;
    case "pencil":
      return <Pencil className={resultClassName} />;
    case "list":
      return <List className={resultClassName} />;
    case "plus":
      return <Plus className={resultClassName} />;
    case "trash":
      return <Trash className={resultClassName} />;
    default:
      return <div className={resultClassName}>{type}</div>;
  }
};

export default Icon;
