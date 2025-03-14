import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Save } from "lucide-react";
import styles from "./Account.module.css";

const Account = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // Mock user data - in a real app, this would come from authentication
  const user = {
    fullName: "John Doe",
    email: "john.doe@example.com",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    console.log("Updating password:", formData.password);
    // Here you would update the password
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
                <div className={styles.value}>{user.fullName}</div>
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
