import React, { useEffect, useState } from "react";
import styles from "./View.module.css";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

const Save = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [copied, setCopied] = useState({});

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const querySnapshot = await getDocs(
          collection(db, `users/${user.uid}/passwords`)
        );
        const savedPasswords = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPasswords(savedPasswords);
      } catch (error) {
        console.error("Error fetching passwords:", error);
      }
    };

    fetchPasswords();
  }, [auth.currentUser]);

  const copyToClipboard = (id, text, field) => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [`${id}-${field}`]: true }));

    // Hide "Copied!" message after 2 seconds
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [`${id}-${field}`]: false }));
    }, 2000);
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
        <button className={styles.logoutButton} onClick={() => signOut(auth)}>
          Logout
        </button>
      </div>
      <div className={styles.main}>
        <h2 className={styles.title}>Saved Passwords</h2>
        <div className={styles.cardGrid}>
          {passwords.map((password) => (
            <div key={password.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <strong>{password.website}</strong>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.field}>
                  <span className={styles.label}>Username:</span>
                  <span className={styles.text}>{password.username}</span>
                  <button
                    className={styles.reactButton}
                    onClick={() =>
                      copyToClipboard(
                        password.id,
                        password.username,
                        "username"
                      )
                    }
                  >
                    Copy
                  </button>
                  {copied[`${password.id}-username`] && (
                    <span className={styles.copiedText}>Copied!</span>
                  )}
                </div>
                <div className={styles.field}>
                  <span className={styles.label}>Password:</span>
                  <span className={styles.text}>
                    {visiblePasswords[password.id]
                      ? password.password
                      : "••••••••"}
                  </span>
                  <button
                    className={styles.reactButton}
                    onClick={() => togglePasswordVisibility(password.id)}
                  >
                    {visiblePasswords[password.id] ? "Hide" : "Show"}
                  </button>
                  <button
                    className={styles.reactButton}
                    onClick={() =>
                      copyToClipboard(
                        password.id,
                        password.password,
                        "password"
                      )
                    }
                  >
                    Copy
                  </button>
                  {copied[`${password.id}-password`] && (
                    <span className={styles.copiedText}>Copied!</span>
                  )}
                </div>
                {password.note && (
                  <div className={styles.field}>
                    <span className={styles.label}>Note:</span>
                    <span className={styles.text}>{password.note}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Save;
