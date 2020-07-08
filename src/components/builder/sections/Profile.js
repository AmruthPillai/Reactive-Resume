import React from "react";
import Heading from "../../shared/Heading";
import Input from "../../shared/Input";
import PhotoUpload from "../../shared/PhotoUpload";

const Profile = () => {
  return (
    <section>
      <Heading>Profile</Heading>

      <PhotoUpload />

      <div className="grid grid-cols-2 gap-6">
        <Input name="firstName" label="First Name" path="profile.firstName" />
        <Input name="lastName" label="Last Name" path="profile.lastName" />
      </div>

      <Input name="subtitle" label="Subtitle" path="profile.subtitle" />

      <hr />

      <Input
        name="addressLine1"
        label="Address Line 1"
        path="profile.address.line1"
      />
      <Input
        name="addressLine2"
        label="Address Line 2"
        path="profile.address.line2"
      />

      <div className="grid grid-cols-2 gap-6">
        <Input name="city" label="City" path="profile.address.city" />
        <Input name="pincode" label="Pincode" path="profile.address.pincode" />
      </div>

      <hr />

      <Input name="phone" label="Phone Number" path="profile.phone" />
      <Input name="website" label="Website" path="profile.website" />
      <Input name="email" label="Email Address" path="profile.email" />
    </section>
  );
};

export default Profile;
