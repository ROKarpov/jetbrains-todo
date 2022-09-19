import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Icon, { IconType } from "../Icon/Icon";

import "./bootstrap.scss";
import styles from "./AppBar.module.scss";
import Button from "../Button/Button";
import Container from "../Container/Container";

export type ActionDescription = {
  iconType: IconType;
  action: () => void;
};

const EMPTY_ACTIONS: ActionDescription[] = [];

export type TabDescription = {
  id: string;
  title: string;
};

type Props = {
  tabs: TabDescription[];

  selectedTabId: string;
  setSelectedTabId: (id: string) => void;

  actions?: ActionDescription[];

  className?: string;
};

const AppBar: React.FC<Props> = ({
  tabs,
  selectedTabId,
  setSelectedTabId,
  actions = EMPTY_ACTIONS,
  className,
}) => {
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
        <div className={styles.actionWrapper}>
          {actions.map((action) => (
            <Button
              key={action.iconType}
              type="no-container"
              size="lg"
              className={styles.action}
              onClick={() => {
                action.action();
              }}
            >
              <Icon type={action.iconType} />
            </Button>
          ))}
        </div>
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

export default AppBar;
