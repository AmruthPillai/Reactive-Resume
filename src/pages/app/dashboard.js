import React, { useContext } from "react";
import Wrapper from "../../components/shared/Wrapper";
import CreateResume from "../../components/dashboard/CreateResume";
import ResumePreview from "../../components/dashboard/ResumePreview";
import TopNavbar from "../../components/dashboard/TopNavbar";
import ResumeContext from "../../contexts/ResumeContext";

const Dashboard = () => {
  const { resumes } = useContext(ResumeContext);

  return (
    <Wrapper>
      <TopNavbar />

      <div className="container mt-12">
        <div className="grid grid-cols-6 gap-8">
          <CreateResume />

          {resumes
            .filter((x) => x !== null)
            .map((x) => (
              <ResumePreview key={x.id} resume={x} />
            ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
