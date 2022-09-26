import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Icon from "../Icon/Icon";

import "./bootstrap.scss";
import styles from "./AppBar.module.scss";
import Container from "../Container/Container";

export type TabDescription = {
  id: any;
  title: string;
};

type Props = {
  tabs: TabDescription[];

  selectedTabId: any;
  setSelectedTabId: (id: any) => void;

  children: React.ReactNode;

  className?: string;
};

type ActionsProps = {
  children: React.ReactNode;
};

const AppBar: React.FC<Props> & {
  Actions: React.FC<ActionsProps>;
} = ({ tabs, selectedTabId, setSelectedTabId, children, className }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      bg="light"
      collapseOnSelect
      expand="md"
      expanded={expanded}
      variant="light"
      onToggle={setExpanded}
      className={className}
    >
      <Container>
        <div className={styles.wrapper}>
          <Navbar.Toggle className={styles.hamburger}>
            <Icon type={expanded ? "close" : "list"} />
          </Navbar.Toggle>
          <Navbar.Brand>ToDo List</Navbar.Brand>
        </div>
        {children}
        <Navbar.Collapse>
          <Nav
            activeKey={selectedTabId}
            onSelect={(key) => setSelectedTabId(key ?? "")}
          >
            {tabs.map((tab) => (
              <Nav.Link key={tab.id} eventKey={tab.id}>
                {tab.title}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const AppBarActions: React.FC<ActionsProps> = ({ children }) => (
  <div className={styles.actionWrapper}>{children}</div>
);

AppBar.Actions = AppBarActions;

export default AppBar;
