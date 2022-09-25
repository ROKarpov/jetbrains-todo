import React, { useCallback } from "react";
import Panel from "../../lib/Panel/Panel";
import Typography from "../../lib/Typography/Typography";
import cn from "classnames";
import styles from "./Alert.module.scss";
import Button from "../../lib/Button/Button";
import Icon from "../../lib/Icon/Icon";

type Props = {
  children: React.ReactNode;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  className?: string;
};

const Alert: React.FC<Props> = ({
  children,
  visible,
  setVisible,
  className,
}) => {
  const handleClick = useCallback(() => setVisible(false), [setVisible]);
  return (
    <Panel
      borderColor="danger"
      borderWidth="xs"
      borderRadius="md"
      backgroundColor="danger"
      backgroundOpacity="25"
      className={cn(styles.container, { [styles.hidden]: !visible }, className)}
    >
      <Typography className={styles.content} color="danger">
        {children}
      </Typography>

      <Button
        size="sm"
        color="danger"
        type="no-container"
        onClick={handleClick}
      >
        <Icon type="close" />
      </Button>
    </Panel>
  );
};

export default Alert;
