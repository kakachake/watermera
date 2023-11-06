import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ExifInfo } from "@shared";
import styles from "./index.module.scss";
import { ChangeEvent } from "react";

export interface ExifInfoProps {
  exifInfo: ExifInfo | null;
  onChange: (exifInfo: ExifInfo) => void;
}

export default function ExifInfoComp(props: ExifInfoProps) {
  const { exifInfo } = props;

  if (!exifInfo) {
    return null;
  }

  const handleExifInfoChange = (
    key: keyof ExifInfo,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    props.onChange({
      ...exifInfo,
      [key]: value,
    });
  };

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="table"
        removeWrapper
        classNames={{
          base: styles.base,
          table: styles.table,
        }}
      >
        <TableHeader>
          <TableColumn>属性</TableColumn>
          <TableColumn>值</TableColumn>
        </TableHeader>
        <TableBody>
          {Object.keys(exifInfo).map((key) => {
            return (
              <TableRow key={key}>
                <TableCell>
                  <div className={styles.key}>{key}</div>
                </TableCell>
                <TableCell>
                  <div className={styles.value}>
                    <Input
                      size={"sm"}
                      value={exifInfo[key as keyof ExifInfo].toString()}
                      onChange={handleExifInfoChange.bind(
                        null,
                        key as keyof ExifInfo
                      )}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
