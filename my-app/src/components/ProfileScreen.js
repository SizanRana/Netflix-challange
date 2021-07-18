import React from "react";
import { useSelector } from "react-redux";
import "../css/ProfileScreen.css";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import Nav from "./Nav";
import PlanScreen from "./PlanScreen";

function ProfileScreen() {
  const user = useSelector(selectUser);

  const logout = () => {
    auth.signOut();
  };
  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
            alt=""
          />
          <dv className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans</h3>
              <PlanScreen productName="Premium" productData="4K + HDR" />
              <PlanScreen productName="Standard" productData="1080p" />
              <PlanScreen productName="Basic" productData="720p" />
            </div>
            <form>
              <button
                onClick={() => logout()}
                className="profileScreen__signout"
              >
                Sign Out
              </button>
            </form>
          </dv>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
