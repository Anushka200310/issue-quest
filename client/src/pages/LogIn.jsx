import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "@/store/auth.jsx";
import OAuth from "@/components/OAuth";
import toast, { Toaster } from "react-hot-toast";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { storeTokenInLS, API } = useAuth();
  const URL = `${API}/api/auth/login`;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        storeTokenInLS(data.token);
        setLoading(false);
        setFormData({
          email: "",
          password: "",
        });
        console.log("login successful");
        navigate("/");
      } else {
        setLoading(false);
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-gray-900 dark:to-black">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10 max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
          Log in to your account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              placeholder="example@gmail.com"
              required
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 py-2 px-4 text-gray-900 dark:text-gray-300 placeholder-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="off"
              placeholder="********"
              required
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 py-2 px-4 text-gray-900 dark:text-gray-300 placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg focus:ring-4 focus:ring-indigo-400 dark:focus:ring-indigo-700"
          >
            {loading ? "Loading..." : "Log in"}
          </button>

          <OAuth />
        </form>
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Sign up
          </Link>
        </p>
      </div>
      <Toaster />
    </section>
  );
};

export default LogIn;
