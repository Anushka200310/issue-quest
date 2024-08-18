import React from "react";
import { Button } from "./ui/button";
import { CircleDot, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

const NoIssue = () => {
  return (
    <div className="flex flex-col space-y-2 items-center justify-center h-screen">
      <h2 className="text-gray-600 dark:text-gray-400 text-xl font-semibold flex items-center">
        No Issues <CircleDot className="ml-2" />
      </h2>
      <Link to="/create">
        <Button
          variant="outline"
          className="flex items-center gap-2 mt-4"
          aria-label="Create new issue"
        >
          Create <PlusIcon />
        </Button>
      </Link>
    </div>
  );
};

export default NoIssue;
