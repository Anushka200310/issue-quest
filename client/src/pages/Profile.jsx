//firebase storage
// allow read;
// allow write: if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches('image/.*')

import { useState, useEffect, useRef } from "react";
import useAuth from "@/store/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";
import toast, { Toaster } from "react-hot-toast";
import { LogOut } from "lucide-react";

const Profile = () => {
  const { isLoggedIn, user, API, AuthToken } = useAuth();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileper, setFileper] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  if (!isLoggedIn) {
    return <Navigate to="/signup" />;
  }

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileper(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.error("File upload error: ", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/user/update/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthToken,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        toast.success("Your info updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`${API}/api/user/delete/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthToken,
        },
      });
      const data = await res.json();
      if (data.clearToken) {
        localStorage.removeItem("token");
        navigate("/signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] sm:w-[50%] lg:w-[30%]">
          <h1 className="text-3xl sm:text-4xl text-center mb-8 tracking-wider text-blue-950 font-bold dark:text-indigo-100">
            Profile
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <Avatar
              className="w-24 h-24 mb-6 cursor-pointer"
              onClick={() => {
                fileRef.current.click();
              }}
            >
              <AvatarImage
                src={formData.avatar || user.avatar}
                alt="profile picture"
              />
              <AvatarFallback>Img</AvatarFallback>
            </Avatar>
            <p className="mb-6">
              {fileUploadError ? (
                <span>Error image upload</span>
              ) : fileper > 0 && fileper < 100 ? (
                <span>{`uploading ${fileper}%`}</span>
              ) : fileper === 100 ? (
                <span className="text-green-600">
                  Image successfully uploaded
                </span>
              ) : null}
            </p>
            <input
              defaultValue={user.name}
              id="name"
              type="name"
              required
              onChange={handleChange}
              className="py-2 px-3 border border-slate-500 dark:bg-transparent dark:border-slate-400 dark:text-white rounded-md mb-6 w-full"
            />
            <input
              defaultValue={user.email}
              id="email"
              type="email"
              required
              onChange={handleChange}
              className="py-2 px-3 dark:bg-transparent dark:text-white border border-slate-600 dark:border-slate-400 rounded-md mb-6 w-full"
            />
            <button className="border px-6 py-2 rounded-lg bg-violet-500 text-white dark:border-violet-500 w-full mb-4">
              Update
            </button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="border px-6 py-2 rounded-lg border-red-500 hover:bg-red-600 hover:text-white dark:border-red-500 dark:hover:bg-red-500 dark:bg-transparent dark:text-white w-full"
                >
                  Delete account
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      Do you want to delete your account?
                    </h4>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Button variant="outline" onClick={handleDeleteUser}>
                        Yes
                      </Button>
                      <Link
                        to="/"
                        className="border border-input bg-background rounded-md text-center py-2 hover:bg-accent hover:text-accent-foreground"
                      >
                        No
                      </Link>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </form>
          <Link
            to="/logout"
            className="my-4 flex items-center gap-1 dark:text-slate-500"
          >
            <LogOut className="w-4" />
            Logout
          </Link>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Profile;
