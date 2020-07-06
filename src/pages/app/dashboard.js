import firebase from "gatsby-plugin-firebase";
import React, { useEffect, useState } from "react";
import CreateResume from "../../components/dashboard/CreateResume";
import ResumePreview from "../../components/dashboard/ResumePreview";
import TopNavbar from "../../components/dashboard/TopNavbar";
import LoadingScreen from "../../components/router/LoadingScreen";

const Dashboard = ({ user }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase
      .database()
      .ref(`users/${user.uid}/resumes`)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const resumes = [];
          const data = snapshot.val();
          Object.keys(data).forEach((key) => resumes.push(data[key]));
          setResumes(resumes);
          setLoading(false);
        }
      });
  }, [user]);

  if (loading) {
    return <LoadingScreen message="Connecting to database..." />;
  }

  return (
    <div>
      <TopNavbar />

      <div className="container mt-12">
        <div className="grid grid-cols-6 gap-8">
          <CreateResume />

          {resumes.map((x) => (
            <ResumePreview key={x.id} resume={x} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
