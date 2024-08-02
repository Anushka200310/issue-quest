// //aefaced364f008600ef2878167c9f10a5178784c1cf2798c713249a9f4d9168c

import useAuth from "@/store/auth";
import { CircleDot } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Article = () => {
  const { isLoggedIn, user, API, AuthToken } = useAuth();
  const [listingError, setListingError] = useState(false);
  const [listing, setListing] = useState([]);

  if (!isLoggedIn) {
    return <Navigate to="/signup" />;
  }

  useEffect(() => {
    const handleShowListing = async () => {
      try {
        setListingError(false);
        const response = await fetch(`${API}/api/user/posts/${user._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthToken,
          },
        });
        if (!response.ok) {
          setListingError(true);
        }
        const data = await response.json();
        setListing(data);
        console.log(listing);
      } catch (error) {
        setListingError(true);
      }
    };

    handleShowListing();
  }, []);

  const handleDeleteListing = async (listingId) => {
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
      const data = await response.json();

      setListing((prev) => prev.filter((list) => list._id !== listingId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen">
      {listingError ? (
        <h2 className="dark:text-gray-400 flex items-center justify-center h-screen">
          No Issues <CircleDot className="mr-2" /> Available
        </h2>
      ) : null}
      {listing && listing.length > 0 && (
        <div className="flex flex-col gap-4 px-3 sm:px-[10%] md:px-[25%]">
          <h1 className="text-center text-2xl my-7 font-semibold">
            Your Issues
          </h1>
          {listing.map((list) => (
            <div
              key={list._id}
              className="border flex justify-between items-center p-3 gap-4"
            >
              <Link to={`/post/${list._id}`}>
                <img
                  src={list.imageUrls[0]}
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold flex-1 hover:underline truncate"
                to={`/post/${list._id}`}
              >
                <p>{list.title}</p>
              </Link>
              <div className="flex flex-col">
                <button
                  onClick={() => handleDeleteListing(list._id)}
                  className="text-red-700"
                >
                  Delete
                </button>
                <button className="text-green-600">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Article;
