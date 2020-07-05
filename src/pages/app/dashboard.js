import React, { useContext } from "react";
import CreateResume from "../../components/dashboard/CreateResume";
import ResumePreview from "../../components/dashboard/ResumePreview";
import TopNavbar from "../../components/dashboard/TopNavbar";
import Wrapper from "../../components/shared/Wrapper";
import DashboardContext from "../../contexts/DashboardContext";

const Dashboard = () => {
  const { resumes } = useContext(DashboardContext);

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
