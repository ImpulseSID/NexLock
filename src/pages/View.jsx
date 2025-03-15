import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./View.module.css";

const View = () => {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch saved passwords from the backend API
    fetch("http://localhost:3001/api/passwords")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not OK");
        }
        return res.json();
      })
      .then((data) => {
        setPasswords(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching passwords:", err);
        setError("Failed to fetch passwords");
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      {/* Header always visible */}
      <header className={styles.header}>
        <Link to="/Dashboard" className={styles.backButton}>
          Back to Dashboard
        </Link>
      </header>

      {/* Conditional rendering for loading or error */}
      {loading && <div className={styles.loading}>Loading passwords...</div>}
      {error && <div className={styles.error}>{error}</div>}

      {/* If not loading and no error, render the table */}
      {!loading && !error && (
        <>
          <h1 className={styles.title}>Saved Passwords</h1>
          {passwords.length === 0 ? (
            <p>No passwords found.</p>
          ) : (
            <table className={styles.passwordTable}>
              <thead>
                <tr>
                  <th>Website</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {passwords.map((pwd) => (
                  <tr key={pwd.id}>
                    <td>{pwd.website}</td>
                    <td>{pwd.username}</td>
                    <td>{pwd.password}</td>
                    <td>{pwd.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default View;
