import React, { useState, useEffect, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrash,
  faPhoneSquare,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import RegisterForm from "./RegisterForm";
import firebaseDb from "../../Firebase";

const Register = () => {
  let [currentId, setCurrentId] = useState("");
  let [objects, setObjects] = useState({});

  useEffect(() => {
    firebaseDb.child("details").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setObjects({
          ...snapshot.val(),
        });
      }
    });
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this user account?")) {
      firebaseDb.child(`details/${id}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId("");
        alert("User deleted!");
        window.location.reload();
      });
    }
  };

  const addoredit = (obj) => {
    if (currentId == "") {
      firebaseDb.child("details").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    } else {
      firebaseDb.child(`details/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <div className="card">
          <div className="card-header text-center text-info">
            <strong>REGISTER AS AN USER</strong>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-5">
                <RegisterForm
                  {...{ currentId, objects, addoredit }}
                ></RegisterForm>
              </div>
              <div className="col-md-7">
                <table className="table table-borderless table-stripped">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-info text-center">Name</th>
                      <th className="text-info text-center">Mobile</th>
                      <th className="text-info text-center">Password</th>
                      <th className="text-info text-center">Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(objects).map((key) => (
                      <tr key={key}>
                        <td>{objects[key].userName}</td>
                        <td>{objects[key].mobile}</td>
                        <td>{objects[key].password}</td>
                        <td className="bg-light">
                          <a
                            className="btn text-primary"
                            onClick={() => {
                              setCurrentId(key);
                            }}
                          >
                            <button className="btn btn-outline-primary">
                              <FontAwesomeIcon icon={faPencilAlt} />
                              &nbsp;Edit
                            </button>
                          </a>
                          <a
                            className="btn text-danger"
                            onClick={() => {
                              onDelete(key);
                            }}
                          >
                            <button className="btn btn-outline-danger">
                              <FontAwesomeIcon icon={faTrashAlt} />
                              &nbsp;Delete
                            </button>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
