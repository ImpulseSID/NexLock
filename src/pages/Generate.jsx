import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCopy, FaKey } from "react-icons/fa";
import { MdPassword, MdSettings } from "react-icons/md";
import styles from "./Generate.module.css";

export default function Generate() {
  const [password, setPassword] = useState("CLICK GENERATE");
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSymbol, setIncludeSymbol] = useState(false);
  const [generated, setGenerated] = useState(false);

  const resultContainerRef = useRef(null);
  const copyBtnRef = useRef(null);
  const sliderRef = useRef(null);
  const sliderTitleRef = useRef(null);

  // Slider styling and fill update.
  const sliderProps = {
    fill: "#0B1EDF",
    background: "rgba(255, 255, 255, 0.214)",
  };

  useEffect(() => {
    if (sliderRef.current) {
      applyFill(sliderRef.current);
    }
  }, [length]);

  function applyFill(slider) {
    const percentage =
      (100 * (slider.value - slider.min)) / (slider.max - slider.min);
    const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${
      sliderProps.background
    } ${percentage + 0.1}%)`;
    slider.style.background = bg;
    if (sliderTitleRef.current) {
      sliderTitleRef.current.setAttribute("data-length", slider.value);
    }
  }

  // Random generation helper functions.
  function secureMathRandom() {
    return (
      window.crypto.getRandomValues(new Uint32Array(1))[0] /
      (Math.pow(2, 32) - 1)
    );
  }
  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }
  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }
  function getRandomNumber() {
    return String.fromCharCode(Math.floor(secureMathRandom() * 10) + 48);
  }
  function getRandomSymbol() {
    const symbols = '~!@#$%^&*()_+{}":?><;.,';
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };

  // Generate the password based on settings.
  function generatePassword() {
    const typesCount = [
      includeLower,
      includeUpper,
      includeNumber,
      includeSymbol,
    ].filter(Boolean).length;
    const typesArr = [
      { lower: includeLower },
      { upper: includeUpper },
      { number: includeNumber },
      { symbol: includeSymbol },
    ].filter((item) => Object.values(item)[0]);

    if (typesCount === 0) return "";
    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }
    // Shuffle and slice to desired length.
    generatedPassword = generatedPassword
      .slice(0, length)
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    setPassword(generatedPassword);
    setGenerated(true);

    // Reset copy info messages (if needed).
    const copyInfoEl =
      document.querySelector(`.${styles["result__info"]}.right`) ||
      document.querySelector(".result__info.right");
    const copiedInfoEl =
      document.querySelector(`.${styles["result__info"]}.left`) ||
      document.querySelector(".result__info.left");
    if (copyInfoEl && copiedInfoEl) {
      copyInfoEl.style.transform = "translateY(0%)";
      copyInfoEl.style.opacity = "0.75";
      copiedInfoEl.style.transform = "translateY(200%)";
      copiedInfoEl.style.opacity = "0";
    }
  }

  // Handle copy-to-clipboard.
  function handleCopy() {
    if (!password || password === "CLICK GENERATE") return;
    navigator.clipboard.writeText(password).then(() => {
      const copyInfoEl =
        document.querySelector(`.${styles["result__info"]}.right`) ||
        document.querySelector(".result__info.right");
      const copiedInfoEl =
        document.querySelector(`.${styles["result__info"]}.left`) ||
        document.querySelector(".result__info.left");
      if (copyInfoEl && copiedInfoEl) {
        copyInfoEl.style.transform = "translateY(200%)";
        copyInfoEl.style.opacity = "0";
        copiedInfoEl.style.transform = "translateY(0%)";
        copiedInfoEl.style.opacity = "0.75";
      }
    });
  }

  // Update copy button position based on mouse movement.
  const handleMouseMove = (e) => {
    if (!generated) {
      if (copyBtnRef.current) {
        copyBtnRef.current.style.opacity = "0";
        copyBtnRef.current.style.pointerEvents = "none";
      }
      return;
    }
    const rect = resultContainerRef.current.getBoundingClientRect();
    if (copyBtnRef.current) {
      copyBtnRef.current.style.opacity = "1";
      copyBtnRef.current.style.pointerEvents = "all";
      copyBtnRef.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
      copyBtnRef.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
    }
  };

  // Determine if a checkbox should be disabled (if it's the only one checked).
  const totalChecked = [
    includeUpper,
    includeLower,
    includeNumber,
    includeSymbol,
  ].filter(Boolean).length;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <Link to="/dashboard" className={styles.backButton}>
          <FaArrowLeft /> Back to Dashboard
        </Link>
        
        <h2 className={styles.title}>
          <FaKey className={styles.titleIcon} />
          Password Generator
        </h2>
        
        <div
          className={styles.result}
          ref={resultContainerRef}
          onMouseMove={handleMouseMove}
        >
          <div className={styles.resultTitle}>
            <MdPassword className={styles.sectionIcon} />
            Generated Password
          </div>
          <div className={`${styles.resultInfo} ${styles.right}`}>
            click to copy
          </div>
          <div className={`${styles.resultInfo} ${styles.left}`}>copied!</div>
          <div className={styles.resultViewbox}>{password}</div>
          <button
            className={styles.copyBtn}
            ref={copyBtnRef}
            style={{ "--x": "0", "--y": "0" }}
            onClick={handleCopy}
          >
            <FaCopy />
          </button>
        </div>

        <div className={styles.lengthContainer}>
          <div className={styles.lengthTitle} ref={sliderTitleRef} data-length={length}>
            Password Length: {length}
          </div>
          <input
            className={styles.slider}
            ref={sliderRef}
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        <div className={styles.settings}>
          <div className={styles.settingsTitle}>
            <MdSettings className={styles.sectionIcon} />
            Password Options
          </div>
          <div className={styles.settingsList}>
            {[
              { id: "uppercase", label: "Include Uppercase", state: includeUpper, setState: setIncludeUpper },
              { id: "lowercase", label: "Include Lowercase", state: includeLower, setState: setIncludeLower },
              { id: "number", label: "Include Numbers", state: includeNumber, setState: setIncludeNumber },
              { id: "symbol", label: "Include Symbols", state: includeSymbol, setState: setIncludeSymbol },
            ].map(({ id, label, state, setState }) => (
              <div key={id} className={styles.setting}>
                <input
                  type="checkbox"
                  id={id}
                  checked={state}
                  disabled={totalChecked === 1 && state}
                  onChange={(e) => setState(e.target.checked)}
                />
                <label htmlFor={id}>{label}</label>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`${styles.generateBtn} ${generated ? styles.generated : ''}`}
          onClick={generatePassword}
        >
          <FaKey className={styles.btnIcon} />
          Generate Password
        </button>
      </div>
    </div>
  );
}
