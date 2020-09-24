import React, { useState, useEffect } from "react";
import { auth, database } from "./firebase";
import CurrentUser from "./CurrentUser";
import SignIn from "./SignIn";
import ProfileCard from "./ProfileCard";
import pick from "lodash/pick";
import map from "lodash/map";
import "./Application.css";

const App = () => {
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        //setUser(currentUser);
        const usersRef = database.ref("/users");
        const userRef = usersRef.child(currentUser.uid);
        userRef.once("value").then((snapshot) => {
          if (snapshot.val()) return;
          const currentUserData = pick(currentUser, [
            "displayName",
            "photoURL",
            "email",
          ]);
          userRef.set(currentUserData);
        });
        usersRef.on("value", (snapshot) => {
          setUsers(snapshot.val());
        });
      }
    });
  }, []);
  return (
    <div className="App">
      <header className="App--header">
        <h1>Social Animals</h1>
      </header>
      {user ? (
        <>
          <section className="ProfileCards">
            {map(users, (user, uid) => {
              return <ProfileCard key={uid} {...user} uid={uid} />;
            })}
          </section>
          <CurrentUser user={user} />
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default App;
