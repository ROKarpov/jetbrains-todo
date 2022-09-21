import React, { MouseEventHandler, useCallback } from "react";
import BSModal from "react-bootstrap/Modal";
import Button, { ButtonType } from "../Button/Button";
import Icon, { IconType } from "../Icon/Icon";

import "./bootstrap.scss";
import styles from "./Modal.module.scss";
import { isEmpty } from "../../utils/utils";

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
  footer: React.ReactNode;
  header: React.ReactNode;
};

const Modal: React.FC<Props> = ({
  open,
  setOpen,
  title,
  children,
  footer,
  header,
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
        {header && <div className={styles.headerContainer}>{header}</div>}
      </BSModal.Header>

      <BSModal.Body>{children}</BSModal.Body>
      {footer && (
        <BSModal.Footer className={styles.footerContainer}>
          {footer}
        </BSModal.Footer>
      )}
    </BSModal>
  );
};
export default Modal;