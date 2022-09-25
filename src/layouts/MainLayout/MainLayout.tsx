import React, { useMemo, useState } from "react";
import MainLayoutContext, {
  ContextContent,
  useMainLayoutContext,
} from "./MainLayoutContext";
import cn from "classnames";

import styles from "./MainLayout.module.scss";
import Panel from "../../lib/Panel/Panel";
import Alert from "../../components/Alert/Alert";

type MainLayoutProps = {
  children: React.ReactNode;
};

type MainLayoutHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

type MainLayoutContentProps = {
  children: React.ReactNode;
  className?: string;
};

const MainLayout: React.FC<MainLayoutProps> & {
  Header: React.FC<MainLayoutHeaderProps>;
  Content: React.FC<MainLayoutContentProps>;
} = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  const contextValue: ContextContent = useMemo(
    () => ({
      setAlert: (message: string) => {
        setErrorMessage(message);
        setAlertVisible(true);
      },
    }),
    [setErrorMessage]
  );
  return (
    <MainLayoutContext.Provider value={contextValue}>
      <div className={styles.container}>{children}</div>
      <Alert
        visible={alertVisible}
        setVisible={setAlertVisible}
        className={styles.alert}
      >
        {errorMessage}
      </Alert>
    </MainLayoutContext.Provider>
  );
};

const MainLayoutHeader: React.FC<MainLayoutHeaderProps> = ({
  children,
  className,
}) => {
  useMainLayoutContext();
  return <div className={cn(styles.header, className)}>{children}</div>;
};

const MainLayoutContent: React.FC<MainLayoutContentProps> = ({
  children,
  className,
}) => {
  useMainLayoutContext();
  return <div className={cn(styles.content, className)}>{children}</div>;
};

MainLayout.Header = MainLayoutHeader;
MainLayout.Content = MainLayoutContent;

export default MainLayout;
