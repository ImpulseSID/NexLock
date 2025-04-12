import React, { useEffect, useState } from "react";
import styles from "./View.module.css";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";
import { initializeTorchEffect } from "../utils/torchEffect";
import { useAuth } from "../context/AuthContext";

const View = () => {
  const { currentUser } = useAuth();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [copied, setCopied] = useState({});
  const [showingPassword, setShowingPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize torch effect
    const cleanup = initializeTorchEffect();

    const fetchPasswords = async () => {
      try {
        if (!currentUser) {
          navigate("/");
          return;
        }
        
        const querySnapshot = await getDocs(
          collection(db, `users/${currentUser.uid}/passwords`)
        );
        const savedPasswords = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPasswords(savedPasswords);
      } catch (error) {
        console.error("Error fetching passwords:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPasswords();

    return () => {
      cleanup();
    };
  }, [currentUser, navigate]);

  const handleDelete = async (id) => {
    try {
      if (!currentUser) return;

      await deleteDoc(doc(db, `users/${currentUser.uid}/passwords`, id));
      setPasswords((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting password:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const copyToClipboard = (id, text, field) => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [`${id}-${field}`]: true }));

    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [`${id}-${field}`]: false }));
    }, 2000);
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    
    if (!visiblePasswords[id]) {
      setShowingPassword(id);
    } else {
      setShowingPassword(null);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
        <button className={styles.logoutButton} onClick={handleLogout}>
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
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(password.id)}
                  aria-label="Delete password"
                >
                  <FaTrash />
                </button>
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
                <div className={`${styles.field} ${visiblePasswords[password.id] ? styles.visible : ''} ${showingPassword === password.id ? styles.showing : ''}`}>
                  <span className={styles.label}>Password:</span>
                  <span className={`${styles.text} ${visiblePasswords[password.id] ? styles.visible : ''}`}>
                    {visiblePasswords[password.id]
                      ? password.password
                      : "••••••••"}
                  </span>
                  <button
                    className={`${styles.eyeButton} ${visiblePasswords[password.id] ? styles.showing : ''}`}
                    onClick={() => togglePasswordVisibility(password.id)}
                    aria-label={visiblePasswords[password.id] ? "Hide password" : "Show password"}
                  >
                    {visiblePasswords[password.id] ? (
                      <FaEyeSlash className={styles.eyeIcon} />
                    ) : (
                      <FaEye className={styles.eyeIcon} />
                    )}
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

export default View;
