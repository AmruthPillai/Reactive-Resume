import React from "react";
import Artboard from "../../components/builder/center/Artboard";
import LeftSidebar from "../../components/builder/left/LeftSidebar";
import RightSidebar from "../../components/builder/right/RightSidebar";
import Wrapper from "../../components/shared/Wrapper";

const Builder = ({ id }) => {
  return (
    <Wrapper>
      <div className="h-screen grid grid-cols-11">
        <div className="col-span-3">
          <LeftSidebar />
        </div>
        <div className="col-span-5 bg-inverse-dark flex items-center justify-center">
          <Artboard />
        </div>
        <div className="col-span-3">
          <RightSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default Builder;
