import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { MdEmail, MdLock } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../firebase";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(app);

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent to your email.");
    } catch (error) {
      setMessage("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.row} ${styles["full-height"]} ${styles["justify-content-center"]}`}>
          <div className={`${styles["col-12"]} ${styles["text-center"]} ${styles["align-self-center"]} ${styles["py-5"]}`}>
            <div className={`${styles.sectionInner} ${styles["pb-5"]} ${styles["pt-5"]} ${styles["pt-sm-2"]} ${styles["text-center"]}`}>
              <div className={styles["card-3d-wrap"]}>
                <div className={styles["card-3d-wrapper"]}>
                  <div className={styles["card-front"]}>
                    <div className={styles["center-wrap"]}>
                      <div className={styles["sectionInner"]}>
                        <h4 className={`${styles["mb-4"]} ${styles["pb-3"]}`}>
                          Reset Password
                        </h4>
                        <form onSubmit={handleReset}>
                          <div className={styles["form-group"]}>
                            <input
                              type="email"
                              className={styles["form-style"]}
                              placeholder="Your Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <div className={styles["input-icon"]}>
                              <MdEmail />
                            </div>
                          </div>
                          <button
                            type="submit"
                            className={`${styles.btn} ${styles["mt-4"]}`}
                            disabled={isLoading}
                          >
                            <span>{isLoading ? "Sending..." : "Reset Password"}</span>
                          </button>
                          {message && (
                            <p className={`${styles.message} ${styles["mt-4"]}`}>
                              {message}
                            </p>
                          )}
                          <p className={`${styles["mb-0"]} ${styles["mt-4"]} ${styles["text-center"]}`}>
                            <Link to="/" className={styles.link}>
                              <FaArrowLeft className={styles["back-icon"]} />
                              Back to Login
                            </Link>
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
