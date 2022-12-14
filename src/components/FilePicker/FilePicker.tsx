import React, {
  ChangeEventHandler,
  DragEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import Button from "../../lib/Button/Button";
import styles from "./FilePicker.module.scss";
import cn from "classnames";
import Panel from "../../lib/Panel/Panel";
import Typography from "../../lib/Typography/Typography";

type Props = {
  onFileSelected: (file: Blob) => void;
  className?: string;
};

const FilePicker: React.FC<Props> = ({ onFileSelected, className }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (ev) => {
      console.log("File(s) dropped");

      // Prevent default behavior (Prevent file from being opened)
      ev.preventDefault();

      if (ev.dataTransfer.items) {
        for (let i = 0; i < ev.dataTransfer.items.length; i++) {
          const item = ev.dataTransfer.items[i];
          if (item.kind === "file") {
            const file = item.getAsFile();
            if (file !== null) {
              onFileSelected(file);
              break;
            }
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        if (ev.dataTransfer.files.length > 0) {
          onFileSelected(ev.dataTransfer.files[0]);
        }
      }
      setHovered(false);
    },
    [onFileSelected, setHovered]
  );
  const handleDragOver: DragEventHandler<HTMLDivElement> = useCallback((ev) => {
    ev.preventDefault();
  }, []);
  const handleDragEnter: DragEventHandler<HTMLDivElement> = useCallback(() => {
    setHovered(true);
  }, [setHovered]);
  const handleDragLeave: DragEventHandler<HTMLDivElement> = useCallback(() => {
    setHovered(false);
  }, [setHovered]);
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.target.files && e.target.files.length > 0) {
        onFileSelected(e.target.files[0]);
      }
    },
    [onFileSelected]
  );
  return (
    <Panel
      backgroundOpacity={hovered ? "25" : "0"}
      borderRadius="xl"
      borderWidth="0"
      className={cn(styles.container, className)}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <Typography fontSize={4} fontWeight="bold" className={styles.text}>
        Drag File Here
      </Typography>
      <Typography fontSize={5} small muted className={styles.text}>
        Or
      </Typography>
      <Button
        disabled={hovered}
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        Browse
      </Button>
      <input
        ref={inputRef}
        type="file"
        className={styles.input}
        onChange={handleOnChange}
      />
    </Panel>
  );
};

export default FilePicker;
