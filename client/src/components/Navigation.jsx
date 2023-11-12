import React, { useEffect } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticate, logout } from "../redux/reducers/authSlice";
import { error, success } from "../redux/reducers/notificationSlice";
import { openCreateProjectDrawer } from "../redux/reducers/projectSlice";

export default function Navigation() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const someDrawerIsOpen = useSelector(
    (state) => state.project.createProjectDrawer
  );
  const location = useLocation();

  useEffect(() => {
    dispatch(authenticate()).then((response) => {
      if (location.pathname !== "/authenticate") {
        if (response.error) {
          dispatch(error(response.error.message));
          navigate("/authenticate");
        }
      }
    });
  }, []);

  const NavComponent = () => {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-4 sticky-top">
        <div className="container-fluid p-0">
          <ul className="navbar-nav w-25">
            <li className="nav-item p-2">
              <Button type="text" onClick={() => navigate("/")}>
                Home
              </Button>
            </li>
          </ul>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse w-100"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav w-75 d-flex justify-content-center">
              <li className="nav-item p-2">
                <Button
                  type="text"
                  onClick={() => dispatch(openCreateProjectDrawer(true))}
                >
                  new project
                </Button>
              </li>
              <li className="nav-item p-2">
                <Button type="text">my projects</Button>
              </li>
              <li className="nav-item p-2">
                <Button type="text">my tasks</Button>
              </li>
            </ul>
            <ul className="navbar-nav w-25  d-flex justify-content-center">
              <li className="nav-item p-2">
                <Button type="text">Account</Button>
              </li>
              <li className="nav-item p-2">
                <Button
                  type="text"
                  onClick={() =>
                    dispatch(logout()).then((response) => {
                      if (response.error) {
                        dispatch(error(response.error.message));
                      } else {
                        dispatch(success("Logged out successfully!"));
                      }
                    })
                  }
                >
                  Logout
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };

  return <>{user && !someDrawerIsOpen ? <NavComponent /> : null}</>;
}
