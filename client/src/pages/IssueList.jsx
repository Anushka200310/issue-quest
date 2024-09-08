import { useEffect, useState } from "react";
import useAuth from "@/store/auth";
import { Edit, Trash } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import NoIssue from "@/components/NoIssue";

const IssueList = () => {
  const { isLoggedIn, user, API, AuthToken } = useAuth();
  const [issueError, setIssueError] = useState(false);
  const [issueListing, setListing] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
        setFilteredIssues(data);
      } catch (error) {
        setIssueError(true);
        console.error("Error fetching issues: ", error);
      } finally {
        setLoading(false);
      }
    };

    handleShowIssue();
  }, [API, AuthToken, user._id]);

  if (!isLoggedIn) {
    return <Navigate to="/signup" />;
  }

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = issueListing.filter(
      (issue) =>
        issue.title.toLowerCase().includes(query) ||
        issue.description.toLowerCase().includes(query)
    );
    setFilteredIssues(filtered);
  };

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
      setFilteredIssues((prev) =>
        prev.filter((list) => list._id !== listingId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {loading ? (
        <h2 className="text-gray-600 dark:text-gray-400 flex items-center justify-center h-screen text-xl font-semibold">
          Loading...
        </h2>
      ) : issueError ? (
        <NoIssue />
      ) : (
        <div className="flex flex-col gap-6 p-6 md:p-12">
          <h1 className="text-4xl font-extrabold text-center text-blue-600 dark:text-indigo-400">
            Your Issues
          </h1>
          <input
            type="text"
            placeholder="Search issues..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="mb-6 p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
          />
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
              <div
                key={issue._id}
                className="bg-white dark:bg-gray-800 border border-slate-400 dark:border-slate-600 rounded-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-between p-4 gap-4"
              >
                <Link to={`/issue/${issue._id}`} className="flex-shrink-0">
                  <img
                    src={issue.imageUrls[0]}
                    alt={issue.title}
                    className="h-24 w-24 object-cover rounded-md shadow-md"
                  />
                </Link>
                <Link
                  className="flex-1 font-semibold py-2"
                  to={`/issue/${issue._id}`}
                >
                  <p className="text-slate-800 dark:text-slate-400 text-xl">
                    {issue.title}
                  </p>
                  <p className="text-slate-500 dark:text-slate-500 text-sm">
                    {issue.updatedAt && issue.updatedAt !== issue.createdAt
                      ? `Updated at ${formatDate(issue.updatedAt)}`
                      : `Created at ${formatDate(issue.createdAt)}`}
                  </p>
                </Link>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDeleteIssue(issue._id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500 transition-colors duration-300"
                  >
                    <Trash className="w-6 h-6" />
                  </button>
                  <Link
                    to={`/update-issue/${issue._id}`}
                    className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-500 transition-colors duration-300"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <NoIssue />
          )}
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default IssueList;
