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
  footer?: React.ReactNode;
  header?: React.ReactNode;
  fullscreenOnMd?: boolean;
  bodyClassName?: string;
};

const Modal: React.FC<Props> = ({
  open,
  setOpen,
  title,
  children,
  footer,
  header,
  fullscreenOnMd = true,
  bodyClassName,
}) => {
  const handleModalClose = useCallback(() => setOpen(false), [setOpen]);
  const handleCloseClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => setOpen(false),
    [setOpen]
  );
  return (
    <BSModal
      fullscreen={fullscreenOnMd ? "md-down" : undefined}
      centered
      show={open}
      onHide={handleModalClose}
    >
      <BSModal.Header
        className={isEmpty(title) ? styles.headerItem : undefined}
      >
        {fullscreenOnMd && (
          <Button
            onClick={handleCloseClick}
            containerType="no-container"
            className={styles.headerItem}
            size="lg"
          >
            <Icon type="close" />
          </Button>
        )}
        {title && (
          <BSModal.Title className={styles.title}>{title}</BSModal.Title>
        )}
        {fullscreenOnMd && header && (
          <div className={styles.headerContainer}>{header}</div>
        )}
      </BSModal.Header>

      <BSModal.Body className={bodyClassName}>{children}</BSModal.Body>
      {footer && (
        <BSModal.Footer
          className={
            fullscreenOnMd
              ? styles.footerContainerFullscreen
              : styles.footerContainer
          }
        >
          {footer}
        </BSModal.Footer>
      )}
    </BSModal>
  );
};
export default Modal;
