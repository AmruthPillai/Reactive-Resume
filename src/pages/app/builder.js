import React, { useContext, useEffect, useState } from "react";
import Artboard from "../../components/builder/center/Artboard";
import LeftSidebar from "../../components/builder/left/LeftSidebar";
import RightSidebar from "../../components/builder/right/RightSidebar";
import LoadingScreen from "../../components/router/LoadingScreen";
import Wrapper from "../../components/shared/Wrapper";
import DatabaseContext from "../../contexts/DatabaseContext";
import ResumeContext from "../../contexts/ResumeContext";

const Builder = ({ user, id }) => {
  const [loading, setLoading] = useState(true);
  const { getResume } = useContext(DatabaseContext);
  const { dispatch } = useContext(ResumeContext);

  useEffect(() => {
    (async () => {
      const resume = await getResume(id);
      dispatch({ type: "set_data", payload: resume });
      setLoading(false);
    })();
  }, [id, getResume, dispatch]);

  if (loading) {
    return <LoadingScreen type="Resume" />;
  }

  return (
    <Wrapper>
      <div className="h-screen grid grid-cols-11">
        <div className="col-span-3">
          <LeftSidebar />
        </div>
        <div className="h-screen overflow-scroll col-span-5 bg-inverse-dark grid items-center justify-center">
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
