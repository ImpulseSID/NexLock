import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  useEffect(() => {
    document.body.classList.add("is-loading");

    setTimeout(() => {
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-ready");
    }, 100);

    return () => {
      document.body.classList.remove("is-loading", "is-ready");
    };
  }, []);

  return (
    <div id="wrapper">
      <div id="main">
        <div className={styles.inner}>
          <div
            id="container02"
            className={`${styles.container} ${styles.default}`}
          >
            <div className={styles.wrapper}>
              <div className={styles.inner}>
                <h1 id="text01">Password Manager</h1>
                <p id="text02">
                  Generate Passwords, View your Saved Passwords and Save your
                  Passwords Securely
                </p>
                <ul id="buttons01" className={styles.buttons}>
                  <li>
                    <Link
                      to="/account"
                      className={`${styles.button} ${styles.n05}`}
                    >
                      <span className={styles.label}>Account</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Generate"
                      className={`${styles.button} ${styles.n01}`}
                    >
                      <span className={styles.label}>Generate</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/save"
                      className={`${styles.button} ${styles.n02}`}
                    >
                      <span className={styles.label}>Save</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/view"
                      className={`${styles.button} ${styles.n03}`}
                    >
                      <span className={styles.label}>View</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/logout"
                      className={`${styles.button} ${styles.n04}`}
                    >
                      <span className={styles.label}>Logout</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
