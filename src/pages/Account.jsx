import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Save } from "lucide-react";
import { getAuth, updatePassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import styles from "./Account.module.css";

const Account = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [userData, setUserData] = useState({
    fullName: "",
    email: user?.email || "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData((prev) => ({
            ...prev,
            fullName: userDoc.data().fullName,
          }));
        }
      };
      fetchUserData();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    if (user) {
      try {
        await updatePassword(user, formData.password);
        console.log("Password updated successfully");
      } catch (error) {
        console.error("Error updating password:", error.message);
      }
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
        <div className={styles.accountContainer}>
          <h1 className={styles.title}>Account Information</h1>

          <div className={styles.infoContainer}>
            <div className={styles.infoGroup}>
              <label className={styles.label}>Full Name</label>
              <div className={styles.valueContainer}>
                <div className={styles.value}>
                  {userData.fullName || "Loading..."}
                </div>
              </div>
            </div>

            <div className={styles.infoGroup}>
              <label className={styles.label}>Email</label>
              <div className={styles.valueContainer}>
                <div className={styles.value}>{user.email}</div>
              </div>
            </div>
          </div>

          <h2 className={styles.subtitle}>Change Password</h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>New Password</label>
              <div className={styles.passwordInputContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className={styles.passwordInput}
                  required
                />
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Confirm New Password</label>
              <div className={styles.passwordInputContainer}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  className={styles.passwordInput}
                  required
                />
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.saveButton}>
              <Save size={18} />
              <span>Update Password</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Account;
