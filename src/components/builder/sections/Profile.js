import React from "react";
import { MdFileUpload } from "react-icons/md";
import Heading from "../../shared/Heading";
import Input from "../../shared/Input";
import styles from "./Profile.module.css";

const Profile = () => {
  return (
    <section>
      <Heading>Profile</Heading>
      <div className="flex items-center">
        <div className={styles.circle}>
          <MdFileUpload size="22px" />
        </div>

        <Input label="Photograph" className="ml-6" path="profile.photograph" />
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
