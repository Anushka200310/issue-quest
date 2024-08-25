import useAuth from "@/store/auth";
import { Edit, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const Issue = () => {
  const [error, setError] = useState(false);
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { API } = useAuth();

  const URL = `${API}/api/post`;
  useEffect(() => {
    const fetchIssue = async () => {
      try {
        setLoading(true);
        const result = await fetch(`${URL}/get/${params.id}`);
        const data = await result.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setIssue(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchIssue();
  }, [params.id]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="flex items-center justify-center flex-col space-y-2">
        {loading && (
          <p className="flex items-center justify-center mt-[50%] md:mt-[15%] animate-spin">
            <Loader2Icon className="w-8 h-8 text-black dark:text-slate-300" />
          </p>
        )}
        {error && (
          <>
            <p className="flex items-center justify-center mt-[50%] md:mt-[15%] text-xl font-semibold">
              Something went wrong...
            </p>
            <Link
              to="/"
              className="px-5 py-2 border border-green-500 rounded-lg text-green-500 dark:border-green-400 dark:text-green-400 hover:bg-green-500 dark:hover:bg-green-400 hover:text-white dark:hover:text-gray-900 transition-colors"
            >
              Go to Home
            </Link>
          </>
        )}
      </div>
      <div className="max-w-5xl mx-auto p-4">
        {issue && !loading && !error && (
          <div>
            <div className="relative group">
              <img
                src={issue.imageUrls[0]}
                className="w-full h-96 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40 dark:opacity-50 rounded-lg"></div>
              <Link to={`/update-issue/${issue._id}`}>
                <Edit className="absolute top-4 right-4 w-6 h-6 text-white dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
            <h1 className="text-5xl font-extrabold my-8 dark:text-slate-200">
              {issue.title}
            </h1>
            <p className="text-lg font-light mb-6 leading-relaxed border-l-4 border-green-500 dark:border-green-400 pl-4 dark:text-slate-300">
              {issue.description}
            </p>
            <div className="flex flex-col space-y-4">
              <p className="text-xl dark:text-slate-300">
                <span className="font-semibold">Priority:</span>{" "}
                {issue.priority}
              </p>
              <p className="text-xl dark:text-slate-300">
                <span className="font-semibold">Status:</span> {issue.status}
              </p>
            </div>
            <div className="mt-6 flex items-center space-x-2">
              <button className="py-2 px-8 text-sm font-semibold bg-green-300 dark:bg-green-400 rounded-2xl dark:text-slate-700 shadow-md">
                {issue.label}
              </button>
              {issue.githubRepoLink && (
                <a
                  href={issue.githubRepoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    <FaGithub className="w-8 h-8" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Issue;
