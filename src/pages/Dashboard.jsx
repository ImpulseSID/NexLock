import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { getAuth, signOut } from "firebase/auth";
import { 
  FaUserCircle, 
  FaKey, 
  FaSave, 
  FaEye, 
  FaSignOutAlt 
} from "react-icons/fa";
import { initializeTorchEffect } from "../utils/torchEffect";

export default function Dashboard() {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    document.body.classList.add("is-loading");

    setTimeout(() => {
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-ready");
    }, 100);

    // Initialize torch effect
    const cleanup = initializeTorchEffect();

    return () => {
      document.body.classList.remove("is-loading", "is-ready");
      cleanup();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
                <h1 id="text01">NexLock</h1>
                <p id="text02">
                  Generate Passwords, View your Saved Passwords and Save your
                  Passwords Securely
                </p>
                <ul id="buttons01" className={styles.buttons}>
                  <li>
                    <Link
                      to="/Account"
                      className={`${styles.button} ${styles.n05}`}
                    >
                      <FaUserCircle className={styles.icon} />
                      <span className={styles.label}>Account</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Generate"
                      className={`${styles.button} ${styles.n01}`}
                    >
                      <FaKey className={styles.icon} />
                      <span className={styles.label}>Generate</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Save"
                      className={`${styles.button} ${styles.n02}`}
                    >
                      <FaSave className={styles.icon} />
                      <span className={styles.label}>Save</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/View"
                      className={`${styles.button} ${styles.n03}`}
                    >
                      <FaEye className={styles.icon} />
                      <span className={styles.label}>View</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className={`${styles.button} ${styles.n04}`}
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className={styles.icon} />
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
