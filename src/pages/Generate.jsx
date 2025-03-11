import React, { useState, useEffect, useRef } from "react";
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

  // Determine if a checkbox should be disabled (if it’s the only one checked).
  const totalChecked = [
    includeUpper,
    includeLower,
    includeNumber,
    includeSymbol,
  ].filter(Boolean).length;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Password Generator</h2>
      <div
        className={styles.result}
        ref={resultContainerRef}
        onMouseMove={handleMouseMove}
      >
        <div className={`${styles["result__title"]} ${styles["field-title"]}`}>
          Generated Password
        </div>
        <div className={`${styles["result__info"]} ${styles.right}`}>
          click to copy
        </div>
        <div className={`${styles["result__info"]} ${styles.left}`}>copied</div>
        <div className={styles["result__viewbox"]} id="result">
          {password}
        </div>
        <button
          id="copy-btn"
          ref={copyBtnRef}
          style={{ "--x": "0", "--y": "0" }}
          onClick={handleCopy}
        >
          <i className="far fa-copy"></i>
        </button>
      </div>

      <div
        className={`${styles.length} ${styles["range__slider"]}`}
        data-min="4"
        data-max="32"
      >
        <div
          className={`${styles["length__title"]} ${styles["field-title"]}`}
          ref={sliderTitleRef}
          data-length={length}
        >
          length:
        </div>
        <input
          id="slider"
          ref={sliderRef}
          type="range"
          min="4"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>

      <div className={styles.settings}>
        <span
          className={`${styles["settings__title"]} ${styles["field-title"]}`}
        >
          settings
        </span>
        <div className={styles.setting}>
          <input
            type="checkbox"
            id="uppercase"
            checked={includeUpper}
            disabled={totalChecked === 1 && includeUpper}
            onChange={(e) => setIncludeUpper(e.target.checked)}
          />
          <label htmlFor="uppercase">Include Uppercase</label>
        </div>
        <div className={styles.setting}>
          <input
            type="checkbox"
            id="lowercase"
            checked={includeLower}
            disabled={totalChecked === 1 && includeLower}
            onChange={(e) => setIncludeLower(e.target.checked)}
          />
          <label htmlFor="lowercase">Include Lowercase</label>
        </div>
        <div className={styles.setting}>
          <input
            type="checkbox"
            id="number"
            checked={includeNumber}
            disabled={totalChecked === 1 && includeNumber}
            onChange={(e) => setIncludeNumber(e.target.checked)}
          />
          <label htmlFor="number">Include Numbers</label>
        </div>
        <div className={styles.setting}>
          <input
            type="checkbox"
            id="symbol"
            checked={includeSymbol}
            disabled={totalChecked === 1 && includeSymbol}
            onChange={(e) => setIncludeSymbol(e.target.checked)}
          />
          <label htmlFor="symbol">Include Symbols</label>
        </div>
      </div>

      <button
        className={`${styles.btn} ${styles.generate}`}
        id="generate"
        onClick={generatePassword}
      >
        Generate Password
      </button>
    </div>
  );
}
