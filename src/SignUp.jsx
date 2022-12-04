import React, { useState } from "react";
import app from "./firebaseConfig";
import { Button, Form } from "react-bootstrap";
import PhoneSignin from "./PhoneSignin";
import "./App.css";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth();
  const Navigate=useNavigate()

  const EpLogin = async () => {
    console.log(email);
    console.log(password);
   await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user, "Sign in");
        Navigate("/")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        setError(errorMessage)
        // ..
      });
  };
  return (
    <center>
      <div className="App">
        <h1>Sign Up</h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="email"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
         {error}
        <br />

        <input
          className="favorite styled"
          type="button"
          value="SignUp"
          onClick={EpLogin}
        />
        <hr />
        <Link to="/">
        <Button>Back</Button>
        </Link>
        <br />
        <br />
        <br />
      </div>
    </center>
  );
}
