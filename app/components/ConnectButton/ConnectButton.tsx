import React, { FC, MouseEvent } from "react";
import Image, { ImageProps } from "next/image";
import styles from "./ConnectButton.module.css";

interface ConnectButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  imagePath: ImageProps['src'];
  alt: string;
  className?: string;
}

const ConnectButton: FC<ConnectButtonProps> = ({ onClick, imagePath, alt, className }) => {
  return (
    <button className={`${styles.connectBtn} ${className}`} onClick={onClick}>
      <Image className={`${styles.connectIcon}`} src={imagePath} width={20} height={20} alt={alt} />
      <span className={`${styles.connectText}`}>Connect Wallet</span>
    </button>
  );
};

export default ConnectButton;

