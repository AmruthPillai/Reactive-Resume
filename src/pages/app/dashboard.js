import React from "react";
import Wrapper from "../../components/shared/Wrapper";
import CreateResume from "../../components/dashboard/CreateResume";
import ResumePreview from "../../components/dashboard/ResumePreview";
import TopNavbar from "../../components/dashboard/TopNavbar";

const Dashboard = () => {
  return (
    <Wrapper>
      <TopNavbar />

      <div className="container mt-12">
        <div className="grid grid-cols-6 gap-8">
          <CreateResume />
          <ResumePreview
            title="Full Stack Developer"
            subtitle="Last updated 6 days ago"
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
