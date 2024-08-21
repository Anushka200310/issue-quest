import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import useAuth from "@/store/auth";
import { Navigate } from "react-router-dom";

const Analytics = () => {
  const { isLoggedIn, API, AuthToken, user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!isLoggedIn) {
    return <Navigate to="/signup" />;
  }

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch(`${API}/api/user/posts/${user._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthToken,
          },
        });

        const data = await response.json();
        setIssues(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching issues:", error);
        setLoading(false);
      }
    };

    fetchIssues();
  }, [API, AuthToken, user._id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Count the issues by status
  const statusCount = issues.reduce(
    (acc, issue) => {
      acc[issue.status] = (acc[issue.status] || 0) + 1;
      return acc;
    },
    { open: 0, ongoing: 0, closed: 0 }
  );

  // Data for the Bar chart
  const data = {
    labels: ["Open", "Ongoing", "Closed"],
    datasets: [
      {
        label: "Number of Issues",
        data: [statusCount.open, statusCount.ongoing, statusCount.closed],
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
        borderColor: ["#ff6384", "#36a2eb", "#cc65fe"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mx-auto my-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Analyze Progress
      </h2>
      <div className="flex justify-center">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Analytics;