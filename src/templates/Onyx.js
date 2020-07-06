import React from "react";
import { FaGlobeAmericas, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Onyx = ({ data, layout, colors }) => {
  return (
    <div
      className="p-8 grid grid-cols-10 gap-4 items-center"
      style={{
        color: colors.textColor,
        backgroundColor: colors.backgroundColor,
      }}
    >
      <img
        className="col-span-2 rounded"
        src="https://i.imgur.com/Icr472Z.jpg"
        alt="Photograph"
      />
      <div className="col-span-5">
        <h2
          className="text-4xl font-bold"
          style={{ color: colors.primaryColor }}
        >
          Nancy Jackson
        </h2>
        <span className="font-medium">Customer Sales Representative</span>

        <div className="mt-5 flex flex-col">
          <span>3879 Gateway Avenue,</span>
          <span>Bakersfield,</span>
          <span>California, USA</span>
        </div>
      </div>
      <div className="col-span-3 grid gap-4">
        <div className="flex items-center">
          <FaPhone size="14" style={{ color: colors.primaryColor }} />
          <span className="ml-4 text-sm font-medium">+1 661-808-4188</span>
        </div>

        <div className="flex items-center">
          <FaGlobeAmericas size="14" style={{ color: colors.primaryColor }} />
          <span className="ml-4 text-sm font-medium">nancyontheweb.com</span>
        </div>

        <div className="flex items-center">
          <MdEmail size="14" style={{ color: colors.primaryColor }} />
          <span className="ml-4 text-sm font-medium">
            nancyjack43@gmail.com
          </span>
        </div>
      </div>

      <hr className="my-2 col-span-10" />

      {JSON.stringify(layout)}
    </div>
  );
};

export default Onyx;
