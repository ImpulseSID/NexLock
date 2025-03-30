import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { MdEmail } from "react-icons/md";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../firebase";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const auth = getAuth(app);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent to your email.");
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Forgot Password</h2>
        <form onSubmit={handleReset}>
          <div className={styles.inputGroup}>
            <MdEmail className={styles.icon} />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.btn}>
            Reset Password
          </button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;
