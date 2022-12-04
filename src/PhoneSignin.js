import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate } from "react-router-dom";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";


const PhoneSignin = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpConfo, setOtpComfo] = useState(false);
  const [conFoObj, setConfoObj] = useState("");
  const navigate = useNavigate();

  const getOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (number === "" || number === undefined)
      return setError("Plese enter a valid phone number");
    try {
      const response = await setUprecaptcha(number);
      setConfoObj(response);
      setOtpComfo(true);
      console.log(response);
    } catch (err) {
      setError(err.message);
    }
    console.log(number);
  };

  const auth = getAuth();
  function setUprecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }
  
  const verifyOtp = async (e) => {
    e.preventDefault();
    console.log(otp);
    if (otp === " " || otp === null) return;
    try {
      setError("");
      await conFoObj.confirm(otp);
      navigate("/home");
      localStorage.setItem("phoneNumber",`${number}`)
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <center>
      <div className="App">
        <Form
          onSubmit={getOtp}
          style={{ display: otpConfo ? "none" : "block" }}
        >
          <div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <PhoneInput
                defaultCountry="IN"
                value={number}
                onChange={setNumber}
                placeholder="Enter Phone Number "
                width="10%"
                height="10%"
              />
              {error}
              <div id="recaptcha-container" />
            </Form.Group>
          </div>
          <div className="Button-right">
            <Link to="/">
              <Button variant="primary">Cancel</Button>
            </Link>
            <Button variant="success" type="submit">
              Send OTP
            </Button>{" "}
          </div>
        </Form>

        <Form
          onSubmit={verifyOtp}
          style={{ display: otpConfo ? "block" : "none" }}
        >
          <div>
            <Form.Group className="mb-3" controlId="formbasicotp">
              <Form.Control
                placeholder="Enter otp"
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>
            {error}
          </div>
          <div className="Button-right">
            <Link to="/">
              <Button variant="primary">Cancel</Button>
            </Link>
            <Button variant="success" type="submit">
              Verify OTP
            </Button>
          </div>
        </Form>
      </div>
    </center>
  );
};
export default PhoneSignin;
