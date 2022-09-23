import React from "react";
import MainLayoutContext, { useMainLayoutContext } from "./MainLayoutContext";
import cn from "classnames";

import styles from "./MainLayout.module.scss";

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
} = ({ children }) => (
  <MainLayoutContext.Provider value={0}>
    <div className={styles.container}>{children}</div>
  </MainLayoutContext.Provider>
);

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
