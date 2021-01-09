import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faPhoneSquare,
} from "@fortawesome/free-solid-svg-icons";

const RegisterForm = (props) => {
  const formValues = {
    userName: "",
    mobile: "",
    password: "",
  };

  var [values, setValues] = useState(formValues);

  useEffect(() => {
    if (props.currentId == "")
      setValues({
        ...formValues,
      });
    else
      setValues({
        ...props.objects[props.currentId],
      });
  }, [props.currentId, props.objects]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addoredit(values);
  };

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-group input-group ">
          <div className="input-group-prepend">
            <div className="input-group-text text-info">
              <FontAwesomeIcon icon={faUser} />
            </div>
          </div>
          <input
            //type="text"
            className="form-control"
            value={values.userName}
            placeholder="User Name"
            name="userName"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="row">
          <div className="form-group input-group col-md-6">
            <div className="input-group-prepend">
              <div className="input-group-text text-info">
                <FontAwesomeIcon icon={faLock} />
              </div>
            </div>
            <input
              type="password"
              className="form-control"
              value={values.password}
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group input-group col-md-6">
            <div className="input-group-prepend">
              <div className="input-group-text text-info">
                <FontAwesomeIcon icon={faLock} />
              </div>
            </div>
            <input
              type="password"
              className="form-control"
              value={values.password}
              placeholder=" Confirm Pwd"
              name="cpassword"
            />
          </div>
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <div className="input-group-text text-info">
              <FontAwesomeIcon icon={faPhoneSquare} />
            </div>
          </div>

          <input
            //type="number"
            className="form-control"
            value={values.mobile}
            placeholder="Contact"
            name="mobile"
            onChange={handleInputChange}
          />
        </div>
        <div className="row">
          <div className="form-group input-group col-md-6">
            <input
              type="submit"
              className={
                props.currentId == ""
                  ? "btn btn-block btn-info"
                  : "btn btn-block btn-warning"
              }
              value={props.currentId === "" ? "Save" : "Update"}
            />
          </div>
          <div className="form-group input-group col-md-6">
            <input
              type="submit"
              className="btn btn-block btn-success"
              value="Refresh"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
