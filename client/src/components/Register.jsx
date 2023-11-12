import React, { useState } from "react";
import { Form, Input, Button, Upload, Spin } from "antd";
import { useSelector } from "react-redux";

export default function Register({
  setShowRegister,
  viewportHeight,
  register,
}) {
  const { Dragger } = Upload;
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const loadingRegister = useSelector((state) => state.auth.loadingRegister);

  return (
    <div
      className="row d-flex justify-content-center align-items-center"
      style={{ height: `${viewportHeight}px` }}
    >
      <div className="col"></div>
      <div className="col-md-4">
        <Spin spinning={loadingRegister}>
          <div className="card">
            <div className="card-header" style={{ height: "50px" }}></div>
            <div className="card-body p-1">
              <Form>
                <Input
                  placeholder="first name.."
                  className="mb-1"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
                <Input
                  placeholder="last name.."
                  className="mb-1"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
                <Input
                  placeholder="description.."
                  className="mb-1"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
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

                <Dragger
                  customRequest={({ file }) => {
                    if (!file.type.startsWith("image/")) {
                      dispatch(error("Enter a valid Image (.jpeg .jpg .png) "));
                      return;
                    }

                    setImage(file);
                  }}
                  showUploadList={false}
                >
                  <p className="ant-upload-text">
                    {image ? (
                      <>Image is Ready for upload!</>
                    ) : (
                      <>Click or drag image file in this area!</>
                    )}
                  </p>
                </Dragger>
              </Form>
            </div>
            <div className="card-footer p-1 text-center">
              <Button
                className="w-100"
                onClick={() =>
                  register({
                    fname,
                    lname,
                    description,
                    username,
                    password,
                    image,
                  })
                }
              >
                Register
              </Button>
              <a
                type="button"
                className="w-100 text-dark p-2"
                onClick={() => setShowRegister(false)}
              >
                already have an account
              </a>
            </div>
          </div>
        </Spin>
      </div>
      <div className="col"></div>
    </div>
  );
}
