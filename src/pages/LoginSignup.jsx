import React, { useState } from "react";
import styles from "./LoginSignup.module.css";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { FaKey, FaArrowRight, FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../firebase";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function LoginSignup() {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.querySelector('[name="signupEmail"]')) {
      // Sign Up Form
      const name = form.signupName.value;
      const email = form.signupEmail.value;
      const password = form.signupPassword.value;

      try {
        console.log("Attempting to sign up...");
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        if (user) {
          console.log("User signed up, adding to Firestore...");
          await setDoc(doc(db, "users", user.uid), {
            fullName: name,
            email: email,
            uid: user.uid,
            createdAt: new Date(),
          });
          console.log("User added to Firestore.");
          navigate("/Dashboard");
        }
      } catch (error) {
        console.error("Signup error:", error.code, error.message);
      }
    } else if (form.querySelector('[name="loginEmail"]')) {
      // Log In Form
      const email = form.loginEmail.value;
      const password = form.loginPassword.value;

      try {
        console.log("Attempting to log in...");
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("User logged in:", userCredential.user);
        navigate("/Dashboard");
      } catch (error) {
        console.error("Login error:", error.code, error.message);
      }
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div
          className={`${styles.row} ${styles["full-height"]} ${styles["justify-content-center"]}`}
        >
          <div
            className={`${styles["col-12"]} ${styles["text-center"]} ${styles["align-self-center"]} ${styles["py-5"]}`}
          >
            <div
              className={`${styles.sectionInner} ${styles["pb-5"]} ${styles["pt-5"]} ${styles["pt-sm-2"]} ${styles["text-center"]}`}
            >
              <h6 className={`${styles["mb-0"]} ${styles["pb-3"]}`}>
                <span className={styles["sliding-link"]}>Log In</span>
                <span className={styles["switch-arrow"]}>
                  <FaArrowUp />
                </span>
                <span className={styles["sliding-link"]}>Sign Up</span>
              </h6>
              <input
                className={styles.checkbox}
                type="checkbox"
                id="reg-log"
                name="reg-log"
              />
              <label htmlFor="reg-log"></label>
              <div className={styles["card-3d-wrap"]}>
                <div className={styles["card-3d-wrapper"]}>
                  <div className={styles["card-front"]}>
                    <div className={styles["center-wrap"]}>
                      <div className={styles["sectionInner"]}>
                        <h4 className={`${styles["mb-4"]} ${styles["pb-3"]}`}>
                          Log In
                        </h4>
                        <form onSubmit={handleSubmit}>
                          <div className={styles["form-group"]}>
                            <input
                              type="email"
                              name="loginEmail"
                              className={styles["form-style"]}
                              placeholder="Your Email"
                              id="loginEmail"
                              autoComplete="email"
                            />
                            <div className={styles["input-icon"]}>
                              <MdEmail />
                            </div>
                          </div>
                          <div
                            className={`${styles["form-group"]} ${styles["mt-2"]}`}
                          >
                            <input
                              type="password"
                              name="loginPassword"
                              className={styles["form-style"]}
                              placeholder="Your Password"
                              id="loginPassword"
                              autoComplete="current-password"
                            />
                            <div className={styles["input-icon"]}>
                              <MdLock />
                            </div>
                          </div>
                          <button
                            type="submit"
                            className={`${styles.btn} ${styles["mt-4"]}`}
                          >
                            <span>Submit</span>
                          </button>
                          <p
                            className={`${styles["mb-0"]} ${styles["mt-4"]} ${styles["text-center"]}`}
                          >
                            <Link to="/ForgotPassword" className={styles.link}>
                              Forgot your password?
                            </Link>
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className={styles["card-back"]}>
                    <div className={styles["center-wrap"]}>
                      <div className={styles["sectionInner"]}>
                        <h4 className={`${styles["mb-4"]} ${styles["pb-3"]}`}>
                          Sign Up
                        </h4>
                        <form onSubmit={handleSubmit}>
                          <div className={styles["form-group"]}>
                            <input
                              type="text"
                              name="signupName"
                              className={styles["form-style"]}
                              placeholder="Your Full Name"
                              id="signupName"
                              autoComplete="name"
                            />
                            <div className={styles["input-icon"]}>
                              <MdPerson />
                            </div>
                          </div>
                          <div
                            className={`${styles["form-group"]} ${styles["mt-2"]}`}
                          >
                            <input
                              type="email"
                              name="signupEmail"
                              className={styles["form-style"]}
                              placeholder="Your Email"
                              id="signupEmail"
                              autoComplete="email"
                            />
                            <div className={styles["input-icon"]}>
                              <MdEmail />
                            </div>
                          </div>
                          <div
                            className={`${styles["form-group"]} ${styles["mt-2"]}`}
                          >
                            <input
                              type="password"
                              name="signupPassword"
                              className={styles["form-style"]}
                              placeholder="Your Password"
                              id="signupPassword"
                              autoComplete="new-password"
                            />
                            <div className={styles["input-icon"]}>
                              <FaKey />
                            </div>
                          </div>
                          <button
                            type="submit"
                            className={`${styles.btn} ${styles["mt-4"]}`}
                          >
                            <span>Submit</span>
                          </button>
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

export default LoginSignup;
