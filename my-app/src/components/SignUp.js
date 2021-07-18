import { Modal } from "@material-ui/core";
import React, { useRef, useState } from "react";
import "../css/SignUp.css";
import { auth } from "../firebase";

function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        alert("Your account is successfully created :)");
      })
      .catch((error) => {
        alert(error.message);
        e.preventDefault();
      });
  };
  return (
    <div className="signUp">
      <form>
        <h1>Sign Up</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button type="submit" onClick={register}>
          Sign Up
        </button>
      </form>

      <Modal className="signUp__modal" open={open} onClose={handleClose}>
        <header
        // className="row__modalHeader"
        // style={{
        //   backgroundSize: "cover",
        //   backgroundImage: `url("http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png")`,
        //   backgroundPosition: "center center",
        // }}
        >
          <img
            className="modal__logo"
            src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt=""
          />
          <div className="modal__content">
            <h2>{modalMessage}</h2>
          </div>
          <div className="modal--fadeButton" />
        </header>
      </Modal>
    </div>
  );
}

export default SignUp;
