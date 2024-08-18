
import useAuth from "@/store/auth";
import { Edit, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import NoIssue from "@/components/NoIssue";

const IssueList = () => {
  const { isLoggedIn, user, API, AuthToken } = useAuth();
  const [issueError, setIssueError] = useState(false);
  const [issueListing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!isLoggedIn) {
    return <Navigate to="/signup" />;
  }

  useEffect(() => {
    const handleShowIssue = async () => {
      try {
        setIssueError(false);
        setLoading(true);
        const response = await fetch(`${API}/api/user/posts/${user._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthToken,
          },
        });

        if (response.status === 404) {
          console.error("Endpoint not found: ", response.url);
          setIssueError(true);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch issues");
        }

        const data = await response.json();
        setListing(data);
      } catch (error) {
        setIssueError(true);
        console.error("Error fetching issues: ", error);
      } finally {
        setLoading(false);
      }
    };

    handleShowIssue();
  }, [API, AuthToken, user._id]);

  const handleDeleteIssue = async (listingId) => {
    try {
      const response = await fetch(`${API}/api/post/delete/${listingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthToken,
        },
      });
      if (!response.ok) {
        toast.error("Couldn't delete, try again");
        return;
      }
      setListing((prev) => prev.filter((list) => list._id !== listingId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900">
      {loading ? (
        <h2 className="text-gray-600 dark:text-gray-400 flex items-center justify-center h-screen text-xl font-semibold">
          Loading...
        </h2>
      ) : issueError ? (
        <NoIssue />
      ) : issueListing.length > 0 ? (
        <div className="flex flex-col gap-6 p-6 md:p-12">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100">
            Your Issues
          </h1>
          {issueListing.map((issue) => (
            <div
              key={issue._id}
              className="bg-white dark:bg-gray-800 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between p-4 gap-4"
            >
              <Link to={`/issue/${issue._id}`} className="flex-shrink-0">
                <img
                  src={issue.imageUrls[0]}
                  alt={issue.title}
                  className="h-24 w-24 object-cover rounded-md shadow-sm"
                />
              </Link>
              <Link
                className="flex-1 text-gray-800 dark:text-gray-200 font-semibold hover:underline"
                to={`/issue/${issue._id}`}
              >
                <p>{issue.title}</p>
              </Link>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleDeleteIssue(issue._id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500"
                >
                  <Trash className="w-6 h-6" />
                </button>
                <Link
                  to={`/update-issue/${issue._id}`}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-500"
                >
                  <Edit className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
       <NoIssue />
      )}
      <Toaster />
    </div>
  );
};

export default IssueList;
