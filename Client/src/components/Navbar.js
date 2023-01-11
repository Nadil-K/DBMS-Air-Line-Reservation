import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTypo3 } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";

function useToken() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return [token, setToken];
}

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [logoutStatus, setLogoutStatus] = useState("");

  const [token, setToken] = useToken();

  // useEffect(() => {
  //   if (token !== localStorage.getItem("token")) {
  //     localStorage.setItem("token", token);
  //   }
  // }, [token]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // const logout = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     await axios.post(
  //       "http://localhost:6969/API/registered/logout",
  //       {},
  //       config
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   localStorage.removeItem("token");
  //   console.log(token);
  //   window.location.reload();
  //   setLogoutStatus("Logged Out");
  // };

  const logout = () => {
    axios
      .post("http://localhost:6969/API/registered/logout", {}, config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "400") {
          setLogoutStatus("Error While Logging Out");
        } else {
          setToken("");
          localStorage.removeItem("token");
          console.log(token);
          window.location.reload();
          setLogoutStatus("Logged Out");
        }
      });

    window.location.replace("http://localhost:3000/Auth/logout");
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const inlinefunction = () => {
    closeMobileMenu();
    logout();
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      {token ? (
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              B Airways
              <FontAwesomeIcon icon={faTypo3} />
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  User
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/book-a-flight"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Book A Flight
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/destinations"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Destinations
                </Link>
              </li>
              {button && (
                <Button
                  className="btn-mobile"
                  buttonStyle="btn--outline"
                  onClick={logout}
                >
                  LOG OUT
                </Button>
              )}
              <li>
                <Link
                  to="/Auth/login"
                  className="nav-links-mobile"
                  onClick={inlinefunction}
                >
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              B Airways
              <FontAwesomeIcon icon={faTypo3} />
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Userrr
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/book-a-flight"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Book A Flight
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/destinations"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  to="/Auth/login"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  to="/Auth/Register"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
            <Link to="/Auth/login" className="btn-mobile">
              {button && <Button buttonStyle="btn--outline">LOG IN</Button>}
            </Link>
            <Link to="/Auth/Register" className="btn-mobile">
              {button && <Button buttonStyle="btn--outline">SIGN UP</Button>}
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
