import React, { useContext, useRef } from "react";
import { MdFileUpload } from "react-icons/md";
import StorageContext from "../../../contexts/StorageContext";
import { handleKeyDown } from "../../../utils";
import Heading from "../../shared/Heading";
import Input from "../../shared/Input";
import styles from "./Profile.module.css";

const Profile = () => {
  const fileInputRef = useRef(null);
  const { uploadPhotograph } = useContext(StorageContext);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    uploadPhotograph(file);
  };

  return (
    <section>
      <Heading>Profile</Heading>
      <div className="flex items-center">
        <div
          role="button"
          tabIndex="0"
          className={styles.circle}
          onClick={handleIconClick}
          onKeyDown={(e) => handleKeyDown(e, handleIconClick)}
        >
          <MdFileUpload size="22px" />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        <Input label="Photograph" className="pl-6" path="profile.photograph" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Input label="First Name" path="profile.firstName" />
        <Input label="Last Name" path="profile.lastName" />
      </div>

      <Input label="Subtitle" path="profile.subtitle" />

      <hr />

      <Input label="Address Line 1" path="profile.address.line1" />
      <Input label="Address Line 2" path="profile.address.line2" />

      <div className="grid grid-cols-2 gap-6">
        <Input label="City" path="profile.address.city" />
        <Input label="Pincode" path="profile.address.pincode" />
      </div>

      <hr />

      <Input label="Phone Number" path="profile.phone" />
      <Input label="Website" path="profile.website" />
      <Input label="Email Address" path="profile.email" />
    </section>
  );
};

export default Profile;
