import React, { Component } from "react";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";

export default class App extends Component {
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  configureCaptcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier("sign-in-button", {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log(response,"this is rds")
        this.onSignInSubmit();
      },
      defaultCountry:"IN"
    },auth);
  };

  onSignInSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = "91" +this.state.mobile;
    console.log(phoneNumber);
    this.configureCaptcha();

    const appVerifier = window.recaptchaVerifier;

    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("otp was send");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("otp was not send");
      });
  };

  render() {
    return (
      <div>
        <h2>Login form</h2>
        <form onSubmit={this.onSignInSubmit}>
          <div id="sign-in-button">u</div>
          <input
            type="number"
            name="mobile"
            placeholder="Mobile number"
            required
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h2>Otp form</h2>
        <form>
          <input
            type="number"
            name="otp"
            placeholder="Otp number"
            required
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
