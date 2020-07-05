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
          <MdFileUpload size="22px" className="text-secondary-dark" />
        </div>

        <Input label="Photograph" className="ml-6" path="profile.photograph" />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <Input label="First Name" path="profile.firstName" />
        <Input label="Last Name" path="profile.lastName" />
      </div>
    </section>
  );
};

export default Profile;
