import React from "react";
import { auth, googleAuthProvider } from "./firebase";

const SignIn = () => {
  return (
    <div className="SignIn">
      <button onClick={() => auth.signInWithPopup(googleAuthProvider)}>
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
