import React, { useEffect, useState } from "react";
import useAuth from "@/store/auth";
import { Navigate, useParams } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/firebase";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const UpdateIssue = () => {
  const { isLoggedIn } = useAuth();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    title: "",
    description: "",
    priority: "",
    label: "",
    status: "",
    githubRepoLink: "",
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isLoggedIn) {
    return <Navigate to="/signup" />;
  }

  const { API, AuthToken, user } = useAuth();

  const URL = `${API}/api/post`;
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchIssue = async () => {
      const IssueId = params.id;
      const res = await fetch(`${URL}/get/${IssueId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };
    fetchIssue();
  }, []);

  const isValidGitHubRepoLink = (url) => {
    const githubRepoRegex = /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
    return githubRepoRegex.test(url);
  };

  const handleSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload maximum of 6 images per issue");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress} % done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageRemove = (index, e) => {
    e.stopPropagation();
    e.preventDefault();
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!isValidGitHubRepoLink(formData.githubRepoLink)) {
        toast.error("Please enter a valid GitHub repository URL.");
        return; 
      }

      if (formData.imageUrls.length < 1) {
        toast.error("you must upload atleast one image");
        return;
      }
      setLoading(true);
      const response = await fetch(`${URL}/update/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthToken,
        },
        body: JSON.stringify({
          ...formData,
          userRef: user._id,
        }),
      });

      const data = await response.json();
      console.log(data);
      setLoading(false);
      navigate(`/issue/${data._id}`);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="p-6 max-w-4xl mx-auto h-screen">
    <h1 className="text-center font-bold text-5xl mt-8 text-[#4682B4] dark:text-[#c9c3df] my-7">
      Update Issue
    </h1>

    <form onSubmit={handleFormSubmit} className="space-y-8">
      <input
        onChange={handleChange}
        value={formData.title}
        type="text"
        id="title"
        required
        placeholder="Title"
        className="w-full text-2xl bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
        maxLength="62"
        minLength="10"
      />

      <textarea
        onChange={handleChange}
        value={formData.description}
        id="description"
        placeholder="Description..."
        required
        className="w-full text-lg bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
      />

      <select
        onChange={handleChange}
        value={formData.priority}
        id="priority"
        className="w-full text-lg bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
      >
        <option value="" disabled>
          Select a priority
        </option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <input
        onChange={handleChange}
        value={formData.label}
        type="text"
        id="label"
        placeholder="Label"
        className="w-full text-lg bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
        required
      />

      <select
        onChange={handleChange}
        value={formData.status}
        id="status"
        className="w-full text-lg bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
      >
        <option value="" disabled>
          Select status
        </option>
        <option value="open">Open</option>
        <option value="in progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>

      <input
          onChange={handleChange}
          value={formData.githubRepoLink}
          type="text"
          id="githubRepoLink"
          placeholder="GitHub Repository Link"
          required
           className="w-full text-lg bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
        />

      <div className="flex flex-col flex-1 mt-6">
        <p className="font-semibold text-lg mb-3 text-gray-600 dark:text-gray-400">
          Images:
          <span className="font-normal ml-2">
            Attach relevant images to provide visual context.
            <br />
            The first image will be the cover (max 6).
          </span>
        </p>

        <div className="flex gap-4 items-center">
          <input
            onChange={(e) => setFiles(e.target.files)}
            type="file"
            id="images"
            accept="image/*"
            multiple
            className="p-3 w-full border border-gray-300 rounded cursor-pointer "
          />

          <button
            onClick={handleSubmit}
            type="button"
            className="text-blue-500 px-5 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={uploading || files.length === 0}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {imageUploadError && (
          <p className="text-red-600 mt-2">{imageUploadError}</p>
        )}

        <div className="mt-6 flex flex-wrap gap-4">
          {formData.imageUrls.map((url, index) => (
            <div
              key={index}
              className="relative w-24 h-24 bg-cover bg-center rounded-lg shadow-lg transition-transform transform hover:scale-105"
              style={{ backgroundImage: `url(${url})` }}
            >
              <button
                type="button"
                onClick={(e) => handleImageRemove(index, e)}
                className="absolute top-0 right-0 p-1"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>

    <button
      disabled={loading}
      className={`my-8 w-full bg-gradient-to-r from-blue-400 to-purple-600 text-white text-xl py-3 rounded-lg transition-transform hover:scale-95 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      type="submit"
      onClick={handleFormSubmit}
    >
      {loading ? "Updating..." : "Update Issue"}
    </button>

    <Toaster />
  </div>
  );
};

export default UpdateIssue;
