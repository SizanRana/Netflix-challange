import React, { useRef, useState } from "react";
import "../css/SignInScreen.css";
import { auth } from "../firebase";
import SignUp from "./SignUp";

function SignInScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [signUp, setSignUp] = useState(false);

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="signInSceen">
      {signUp ? (
        <SignUp />
      ) : (
        <>
          <form>
            <h1>Sign In</h1>
            <input ref={emailRef} placeholder="Email" type="email" />
            <input ref={passwordRef} placeholder="Password" type="password" />
            <button type="submit" onClick={signIn}>
              Sign In
            </button>
            <h4>
              <span className="signInScreen__grey">New to Netflix? </span>
              <span
                className="signInScreen__link"
                onClick={() => setSignUp(true)}
              >
                Sign Up now.
              </span>
            </h4>
          </form>
        </>
      )}
    </div>
  );
}

export default SignInScreen;
