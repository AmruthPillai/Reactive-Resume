import { navigate } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Artboard from "../../components/builder/center/Artboard";
import LeftSidebar from "../../components/builder/left/LeftSidebar";
import RightSidebar from "../../components/builder/right/RightSidebar";
import LoadingScreen from "../../components/router/LoadingScreen";
import DatabaseContext from "../../contexts/DatabaseContext";
import ResumeContext from "../../contexts/ResumeContext";

const Builder = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const { getResume } = useContext(DatabaseContext);
  const { dispatch } = useContext(ResumeContext);

  useEffect(() => {
    (async () => {
      const resume = await getResume(id);

      if (!resume) {
        navigate("/app/dashboard");
        toast.error(
          `The resume you were looking for does not exist anymore... or maybe it never did?`
        );
        return null;
      }

      dispatch({ type: "set_data", payload: resume });
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
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
  );
};

export default Builder;
