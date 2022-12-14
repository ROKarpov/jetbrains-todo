import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import styles from "./List.module.scss";

type Props = {
  items: any[];
  className?: string;
  row: (item: any, index: number) => React.ReactNode;
  rowHeight: number;
};

const List: React.FC<Props> = ({ items, className, row, rowHeight }) => (
  <AutoSizer className={className}>
    {({ width, height }) => {
      return (
        <FixedSizeList
          width={width}
          height={height}
          itemSize={rowHeight}
          itemCount={items.length}
        >
          {({ index, style }) => (
            <div style={style} className={styles.row}>
              <div className={styles.contentWrapper}>
                {row(items[index], index)}
                <hr className={styles.separator} />
              </div>
            </div>
          )}
        </FixedSizeList>
      );
    }}
  </AutoSizer>
);

export default List;
