import React, { MouseEventHandler, useCallback } from "react";
import BSModal from "react-bootstrap/Modal";
import Button, { ButtonType } from "../Button/Button";
import Icon, { IconType } from "../Icon/Icon";

import "./bootstrap.scss";
import styles from "./Modal.module.scss";
import { isEmpty } from "./utils";

export type ModalFooterAction = {
  label: string;
  buttonType: ButtonType;
  onClick: () => void;
};

export type ModalHeaderAction = {
  iconType: IconType;
  onClick: () => void;
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  footerActions: ModalFooterAction[];
  headerActions: ModalHeaderAction[];
};

const Modal: React.FC<Props> = ({
  open,
  setOpen,
  title,
  children,
  footerActions,
  headerActions,
}) => {
  const handleModalClose = useCallback(() => setOpen(false), [setOpen]);
  const handleCloseClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => setOpen(false),
    [setOpen]
  );
  return (
    <BSModal
      fullscreen="md-down"
      centered
      show={open}
      onHide={handleModalClose}
    >
      <BSModal.Header
        className={isEmpty(title) ? styles.headerItem : undefined}
      >
        <Button
          onClick={handleCloseClick}
          type="no-container"
          className={styles.headerItem}
          size="lg"
        >
          <Icon type="close" />
        </Button>
        {title && (
          <BSModal.Title className={styles.title}>{title}</BSModal.Title>
        )}
        <div className={styles.headerContainer}>
          {headerActions.map((action) => (
            <Button
              key={action.iconType}
              onClick={action.onClick}
              type="no-container"
              size="lg"
            >
              <Icon type={action.iconType} />
            </Button>
          ))}
        </div>
      </BSModal.Header>

      <BSModal.Body>{children}</BSModal.Body>
      {footerActions && footerActions.length > 0 && (
        <BSModal.Footer className={styles.footerContainer}>
          {footerActions.map((action) => (
            <Button
              key={action.label}
              onClick={action.onClick}
              type={action.buttonType}
            >
              {action.label}
            </Button>
          ))}
        </BSModal.Footer>
      )}
    </BSModal>
  );
};
export default Modal;
