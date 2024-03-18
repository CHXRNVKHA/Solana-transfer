"use client";

import { useEffect, useState } from "react";
import { cinzel } from "./fonts";
import phantomIcon from "../public/phantomIcon.png";
import BasicButton from "./components/basicButton/basicButton";
import ConnectButton from "./components/ConnectButton/ConnectButton";
import { fetchRecentBlockhash, transfer } from "./services/solanaService";

const TransferPage = () => {
  const [amount, setAmount] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [status, setStatus] = useState("");
  const [sourceAccount, setSourceAccount] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recentBlockhash, setRecentBlockhash] = useState("");

  const connectToPhantomWallet = async () => {
    try {
      if ((window as any).solana && (window as any).solana.isPhantom) {
        const blockHash = await fetchRecentBlockhash();
        setRecentBlockhash(blockHash);

        await (window as any).solana.connect();

        const publicKey = await (window as any).solana.publicKey;

        setSourceAccount(publicKey.toString());

        setStatus("Connected to Phantom Wallet!");
      } else {
        setStatus("Phantom Wallet not found or not installed");
      }
    } catch (error: any) {
      setStatus(`Error connecting to Phantom Wallet: ${error.message}`);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleOutsideClick = (e: any) => {
    if (!e.target.closest(".sidebar") && sidebarOpen) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [sidebarOpen]);

  const handleTransfer = async () => {
    try {
      const blockHash = await fetchRecentBlockhash();
      setRecentBlockhash(blockHash);

      const result = await transfer(
        destinationAddress,
        sourceAccount,
        recentBlockhash,
        amount
      );

      setStatus(`${result}`);
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="page" onClick={handleOutsideClick}>
      <header className="header">
        <h1 className={`header__title ${cinzel.className}`}>
          SOL{" "}
          <span className="header__title-gradient">
            S<span className="header__title-smaller">EA</span>
          </span>
        </h1>
        <nav className="nav">Explore</nav>
        <div className="header__wallet-btn" onClick={toggleSidebar}>
          <svg
            width="24"
            height="22"
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <svg
              width="24"
              height="22"
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.3338 0.877075H3.8338C1.90413 0.877075 0.333801 2.44741 0.333801 4.37708V18.3771C0.333801 20.3067 1.90413 21.8771 3.8338 21.8771H21.3338C22.6206 21.8771 23.6671 20.8306 23.6671 19.5437V3.21041C23.6671 1.92358 22.6206 0.877075 21.3338 0.877075ZM3.8338 19.5437C3.1898 19.5437 2.66713 19.0199 2.66713 18.3771V4.37708C2.66713 3.73424 3.1898 3.21041 3.8338 3.21041H21.3338V6.71041H14.3338C13.047 6.71041 12.0005 7.75691 12.0005 9.04374V13.7104C12.0005 14.9972 13.047 16.0437 14.3338 16.0437H21.335V19.5437H3.8338ZM21.3338 9.04374V13.7104H14.3338V9.04374H21.3338Z"
                fill="white"
              />
            </svg>
          </svg>
        </div>
      </header>

      <div className="container">
        <div className="description">
          <h2 className={`description__title ${cinzel.className}`}>
            S<span className="description__title-smaller">END</span> SOL
          </h2>
          <p className="description__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sem
            tortor quis amet scelerisque vivamus egestas.
          </p>
        </div>

        <div className="form">
          <input
            className="form__text"
            type="text"
            placeholder="Destination Address"
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
          />

          <input
            type="number"
            className="form__amount"
            placeholder="0.0"
            min={0.0}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <BasicButton className="basic-btn-send" onClick={handleTransfer}>
            Send
          </BasicButton>
          <p className="status">{status}</p>
        </div>

        <footer className="footer">
          <div className="footer__container">
            <h1 className={`header__title ${cinzel.className}`}>
              SOL{" "}
              <span className="header__title-gradient">
                S<span className="header__title-smaller">EA</span>
              </span>
            </h1>
            <p className="footer__text">SOL Sea 2024 © All right reserved </p>
            <BasicButton className="footer__btn">
              Explore Marketplace
            </BasicButton>
          </div>
        </footer>

        <div className={`sidebar ${sidebarOpen ? "open" : ""}`} id="sidebar">
          <div className="sidebar__header">
            <p className="sidebar__title">Connect Wallet</p>
            <div className="sidebar__close" onClick={closeSidebar}>
              X
            </div>
          </div>

          <ConnectButton
            onClick={connectToPhantomWallet}
            imagePath={phantomIcon}
            alt="Phantom Icon"
            className="sidebar__connect"
          />

          <p className="sidebar__add">
            Dont have a wallet?{" "}
            <span>
              <a href="/" className="sidebar__link">
                Learn more
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransferPage;
