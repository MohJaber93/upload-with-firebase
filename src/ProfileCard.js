import React, { useState } from "react";
import PropTypes from "prop-types";
import FileInput from "./FileInput";
import { storage, database } from "./firebase";
import "./ProfileCard.css";

const ProfileCard = (props) => {
  const [showProgress, setShowProgress] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const userPhotoStorageRef = storage.ref("/user-images").child(props.uid);
  const userRef = database.ref("/users").child(props.uid);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    // const progressElement = document.getElementById("progress");
    // console.log(progressElement.value);
    setShowProgress(true);
    const uploadedPhoto = userPhotoStorageRef
      .child(file.name)
      .put(file, { contentType: file.type });

    uploadedPhoto.on("state_changed", (snapshot) => {
      const percentage =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgressValue(percentage);
      // progressElement.value = percentage;
    });

    uploadedPhoto.then(() => {
      userPhotoStorageRef
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          userRef.child("photoURL").set(url);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    // uploadedPhoto.on('state_changed',snapshot=>{
    //   console.log(snapshot)
    // })
    console.log(uploadedPhoto);
  };
  return (
    <article className="ProfileCard">
      <img
        className="ProfileCard--photo"
        src={props.photoURL}
        alt={props.displayName}
      />
      <h3>{props.displayName}</h3>
      <FileInput
        accept=".png,.gif,.jpg"
        placeholder="Select an image"
        onChange={handlePhotoChange}
      />
      {showProgress && (
        <progress id="progress" value={progressValue} max="100" />
      )}
    </article>
  );
};

ProfileCard.propTypes = {
  displayName: PropTypes.string,
  email: PropTypes.string,
  imageName: PropTypes.string,
  imageURL: PropTypes.string,
  photoURL: PropTypes.string,
  uid: PropTypes.string,
};

export default ProfileCard;
