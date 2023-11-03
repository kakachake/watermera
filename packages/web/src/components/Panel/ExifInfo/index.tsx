import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ExifInfo } from "@shared";
import styles from "./index.module.scss";

export interface ExifInfoProps {
  exifInfo: ExifInfo | null;
}

export default function ExifInfoComp(props: ExifInfoProps) {
  const { exifInfo } = props;
  console.log(exifInfo);

  if (!exifInfo) {
    return null;
  }
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
                    {exifInfo[key as keyof ExifInfo].toString()}
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
