
import useAuth from "@/store/auth";
import { CircleDot, Edit, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

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
        setLoading(true); // Start loading
        const response = await fetch(`${API}/api/user/posts/${user._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthToken,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch issues");
        }
        const data = await response.json();
        setListing(data);
      } catch (error) {
        setIssueError(true);
      } finally {
        setLoading(false); // End loading
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
      }
      setListing((prev) => prev.filter((list) => list._id !== listingId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen">
      {loading ? (
        <h2 className="dark:text-slate-400 flex items-center justify-center h-screen">
          Loading...
        </h2>
      ) : issueError ? (
        <h2 className="dark:text-gray-400 flex items-center justify-center h-screen">
          No Issues <CircleDot className="mr-2" /> Available
        </h2>
      ) : issueListing.length > 0 ? (
        <div className="flex flex-col gap-4 px-3 sm:px-[10%] md:px-[25%]">
          <h1 className="text-center text-3xl my-7 font-semibold">
            Your Issues
          </h1>
          {issueListing.map((issue) => (
            <div
              key={issue._id}
              className="border flex justify-between items-center p-3 gap-4"
            >
              <Link to={`/issue/${issue._id}`}>
                <img
                  src={issue.imageUrls[0]}
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-500 font-semibold flex-1 hover:underline truncate"
                to={`/issue/${issue._id}`}
              >
                <p>{issue.title}</p>
              </Link>
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => handleDeleteIssue(issue._id)}
                  className="text-red-700"
                >
                  <Trash className="w-5 h-5" />
                </button>
                <Link to={`/update-issue/${issue._id}`} className="text-green-600">
                    <Edit className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="dark:text-gray-400 flex items-center justify-center h-screen">
          No Issues <CircleDot className="mr-2" /> Available
        </h2>
      )}
    </div>
  );
};

export default IssueList;

