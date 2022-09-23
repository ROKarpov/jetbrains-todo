import React, { useRef } from "react";
import styles from "./FileExporter.module.scss";
import { useMutation } from "react-query";

interface CreateChildrenFn {
  (isExporting: boolean, exportCallback: () => void): React.ReactNode;
}

type Props = {
  fileName?: string;
  getFile: () => Promise<Blob>;
  children: CreateChildrenFn;
};

const FileExporter: React.FC<Props> = ({
  fileName = "data",
  getFile,
  children,
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const exportMutation = useMutation(
    () => getFile().then((file) => URL.createObjectURL(file)),
    {
      onSuccess: (url) => {
        if (linkRef.current == null) return;
        linkRef.current.href = url;
        linkRef.current.click();
      },
    }
  );

  return (
    <>
      {children(exportMutation.isLoading, exportMutation.mutate)}
      <a ref={linkRef} download={fileName} className={styles.downloadLink}></a>
    </>
  );
};

export default FileExporter;
