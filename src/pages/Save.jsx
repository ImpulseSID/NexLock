import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Copy } from "lucide-react";
import styles from "./Save.module.css";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase";

const Save = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    website: "",
    username: "",
    password: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      console.error("No user logged in.");
      return;
    }

    try {
      await addDoc(collection(db, `users/${user.uid}/passwords`), {
        website: formData.website,
        username: formData.username,
        password: formData.password,
        note: formData.note,
        createdAt: new Date(),
      });
      console.log("Password saved successfully!");
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error saving password:", error);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setFormData((prev) => ({ ...prev, password: text }));
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/Dashboard")}
        >
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </button>

        <button className={styles.logoutButton} onClick={() => navigate("/")}>
          <span>Logout</span>
        </button>
      </header>

      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Save New Password</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Website</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="example.com"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username or email"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.passwordInputContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className={styles.passwordInput}
                  required
                />
                <div className={styles.passwordActions}>
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={handlePaste}
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Note (Optional)</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Add any additional information"
                className={styles.textarea}
                rows={3}
              />
            </div>

            <button type="submit" className={styles.saveButton}>
              Save Password
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Save;
