import React, { FC, MouseEvent, ReactNode } from "react";
import styles from './basicButton.module.css'

interface BasicButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const BasicButton: FC<BasicButtonProps> = ({ onClick, children, className, style }) => {
  return (
    <button className={`${styles.basicBtn} ${className}`} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default BasicButton;
