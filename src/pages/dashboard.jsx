import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  useEffect(() => {
    document.body.classList.add("is-loading");

    setTimeout(() => {
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-ready");
    }, 100);

    return () => {
      document.body.classList.remove("is-loading", "is-ready");
    };
  }, []);

  return (
    <div id="wrapper">
      <div id="main">
        <div className="inner">
          <div id="container02" className="container default">
            <div className="wrapper">
              <div className="inner">
                <h1 id="text01">Password Manager</h1>
                <p id="text02">
                  Generate Passwords, View your Saved Passwords and Save your
                  Passwords Securely
                </p>
                <ul id="buttons01" className="buttons">
                  <li>
                    <Link to="/account" className="button n05">
                      <span className="label">Account</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/Generate" className="button n01">
                      <span className="label">Generate</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/save" className="button n02">
                      <span className="label">Save</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/view" className="button n03">
                      <span className="label">View</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/logout" className="button n04">
                      <span className="label">Logout</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
