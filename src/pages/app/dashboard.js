import firebase from "gatsby-plugin-firebase";
import React from "react";
import { useListVals } from "react-firebase-hooks/database";
import CreateResume from "../../components/dashboard/CreateResume";
import ResumePreview from "../../components/dashboard/ResumePreview";
import TopNavbar from "../../components/dashboard/TopNavbar";
import LoadingScreen from "../../components/router/LoadingScreen";
import Wrapper from "../../components/shared/Wrapper";

const Dashboard = ({ user }) => {
  const [resumes, loading] = useListVals(
    firebase.database().ref(`users/${user.uid}/resumes`)
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Wrapper>
      <TopNavbar />

      <div className="container mt-12">
        <div className="grid grid-cols-6 gap-8">
          <CreateResume />

          {resumes.map((x) => (
            <ResumePreview key={x.id} resume={x} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
