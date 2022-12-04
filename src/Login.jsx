import React, { useState } from "react";
import app from "./firebaseConfig";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import PhoneSignin from "./PhoneSignin";
import "./App.css";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { useEffect } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth();
  const Navigate = useNavigate();
  const [islogin,setisLogin]=useState(false)


  const initialConform = async () => {
    const emailin = localStorage.getItem("email");
    const passwordin = localStorage.getItem("password");
    console.log(emailin)
    console.log(passwordin)
    await signInWithEmailAndPassword(auth, emailin, passwordin)
      .then((userCredential) => {
        setError("");
        Navigate("/home");
        console.log("user Login")
      })
      .catch((error) => {
        console.log("User is not login");
      });
  };

  useEffect(()=>{
    initialConform()
},[])

  const LoginEP = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        localStorage.setItem("password", password);
        localStorage.setItem("email", email);
        setError("");
        Navigate("/home");
        const user = userCredential.user;
        console.log(user, "singin");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        setError(errorMessage, errorCode);
      });
  };
  return (
    <center>
      <div className="App">
        <h1>Firebase Auth Login</h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        {error}
        <br />
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="email"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <br />
        <input
          className="favorite styled"
          type="button"
          value="Login"
          onClick={LoginEP}
        />
        <hr />
        <br />
        <Link to="/phoneSignin">
          <input
            className="signin-phone"
            type="button"
            value="Sign in with phone"
          />
        </Link>
        <br />
        <br />
        <Link to="/signUp">
          <button type="button" className="btn btn-primary">
            SignUp
          </button>
        </Link>
      </div>
    </center>
  );
};
