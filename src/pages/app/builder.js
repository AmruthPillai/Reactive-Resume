import React from "react";
import LeftSidebar from "../../components/builder/left/LeftSidebar";
import Wrapper from "../../components/shared/Wrapper";

const Builder = ({ id }) => {
  return (
    <Wrapper>
      <div className="h-screen grid grid-cols-12">
        <div className="col-span-3">
          <LeftSidebar />
        </div>
        <div className="col-span-6"></div>
        <div className="col-span-3"></div>
      </div>
    </Wrapper>
  );
};

export default Builder;
