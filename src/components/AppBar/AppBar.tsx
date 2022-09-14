import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import cn from "classnames";
import Icon, { IconType } from "../Icon/Icon";

import "./bootstrap.scss";
import styles from "./AppBar.module.scss";

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
};

export const AppBar: React.FC<Props> = ({
  tabs,
  selectedTabId,
  setSelectedTabId,
  actions = EMPTY_ACTIONS,
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
    >
      <Container>
        <div className={cn(styles.wrapper, "d-flex")}>
          <Navbar.Toggle className={styles.hamburger}>
            <Icon type={expanded ? "close" : "list"} />
          </Navbar.Toggle>
          <Navbar.Brand>ToDo List</Navbar.Brand>
        </div>
        <div className={cn("d-flex", styles["action-wrapper"])}>
          {actions.map((action) => (
            <button
              key={action.iconType}
              type="button"
              className={styles.action}
              onClick={() => {
                action.action();
              }}
            >
              <Icon type={action.iconType} />
            </button>
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

//export default AppBar;
