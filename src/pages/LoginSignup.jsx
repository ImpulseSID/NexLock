import React from 'react';
import './LoginSignup.css';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { FaKey, FaArrowRight, FaArrowUp } from 'react-icons/fa';

function LoginSignup() {
  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <span className="sliding-link">Log In</span>
                  <span className="switch-arrow">
                    <FaArrowUp />
                  </span>
                <span className="sliding-link">Sign Up</span>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
              />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <form onSubmit={(e) => e.preventDefault()}>
                          <div className="form-group">
                            <input
                              type="email"
                              name="loginEmail"
                              className="form-style"
                              placeholder="Your Email"
                              id="loginEmail"
                              autoComplete="email"
                            />
                            <div className="input-icon">
                              <MdEmail />
                            </div>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="loginPassword"
                              className="form-style"
                              placeholder="Your Password"
                              id="loginPassword"
                              autoComplete="current-password"
                            />
                            <div className="input-icon">
                              <MdLock />
                            </div>
                          </div>
                          <button type="submit" className="btn mt-4">
                            <span>Submit</span>
                          </button>
                          <p className="mb-0 mt-4 text-center">
                            <a href="#0" className="link">
                              Forgot your password?
                            </a>
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <form onSubmit={(e) => e.preventDefault()}>
                          <div className="form-group">
                            <input
                              type="text"
                              name="signupName"
                              className="form-style"
                              placeholder="Your Full Name"
                              id="signupName"
                              autoComplete="name"
                            />
                            <div className="input-icon">
                              <MdPerson />
                            </div>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              name="signupEmail"
                              className="form-style"
                              placeholder="Your Email"
                              id="signupEmail"
                              autoComplete="email"
                            />
                            <div className="input-icon">
                              <MdEmail />
                            </div>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="signupPassword"
                              className="form-style"
                              placeholder="Your Password"
                              id="signupPassword"
                              autoComplete="new-password"
                            />
                            <div className="input-icon">
                              <FaKey />
                            </div>
                          </div>
                          <button type="submit" className="btn mt-4">
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
