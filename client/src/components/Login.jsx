import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Spin } from "antd";
import { useSelector } from "react-redux";

export default function Login({ setShowRegister, viewportHeight, login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loadingLogin = useSelector((state) => state.auth.loadingLogin);

  return (
    <div
      className="row d-flex justify-content-center align-items-center"
      style={{ height: `${viewportHeight}px` }}
    >
      <div className="col"></div>
      <div className="col-md-4">
        <Spin spinning={loadingLogin}>
          <div className="card">
            <div className="card-header" style={{ height: "50px" }}></div>
            <div className="card-body text-center p-1">
              <Form>
                <Input
                  placeholder="username.."
                  className="mb-1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input.Password
                  autoComplete="on"
                  placeholder="password.."
                  className="mb-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Checkbox name="remember-me!" className="m-5">
                  Remember me!
                </Checkbox>
              </Form>
            </div>
            <div className="card-footer p-1 text-center">
              <Button
                className="w-100"
                onClick={() => login({ username, password })}
              >
                Login
              </Button>
              <a
                type="button"
                className="w-100 text-dark p-2"
                onClick={() => setShowRegister(true)}
              >
                register an account
              </a>
            </div>
          </div>
        </Spin>
      </div>
      <div className="col"></div>
    </div>
  );
}
