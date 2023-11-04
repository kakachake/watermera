import { Button, ButtonProps, Progress } from "@nextui-org/react";
import styles from "./index.module.scss";
import classNames from "classnames";

export interface ProgressButtonProps extends ButtonProps {
  progress: number;
}

export default function ProgressButton(props: ProgressButtonProps) {
  const { children, progress } = props;
  return (
    <Button {...props} variant="flat">
      {children}
      <Progress
        size="sm"
        value={progress}
        className={classNames(styles.progress, {
          "opacity-0": progress === 0 || progress === 100,
        })}
      />
    </Button>
  );
}
