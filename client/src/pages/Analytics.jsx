import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useAuth from "@/store/auth";
import { Navigate } from "react-router-dom";

// Register necessary components for the Bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const { isLoggedIn, API, AuthToken, user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (!isLoggedIn) {
    return <Navigate to="/signup" />;
  }

  if (loading) {
    return (
      <h2 className="text-gray-600 dark:text-gray-400 flex items-center justify-center h-screen text-xl font-semibold">
        Loading...
      </h2>
    );
  }

  const statusCount = issues.reduce(
    (acc, issue) => {
      acc[issue.status] = (acc[issue.status] || 0) + 1;
      return acc;
    },
    { open: 0, ongoing: 0, closed: 0 }
  );

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
    <div className="container mx-auto my-6 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4 sm:mb-6 text-center sm:text-left">
        Analyze Progress
      </h2>
      <div className="w-full overflow-x-auto">
        <div className="w-[300px] sm:w-full flex justify-center">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
