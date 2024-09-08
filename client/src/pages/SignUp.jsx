import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/store/auth.jsx";
import OAuth from "@/components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { storeTokenInLS, API } = useAuth();
  const URL = `${API}/api/auth/signup`;
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
      if (res.ok) {
        storeTokenInLS(data.token);
        setLoading(false);
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col md:flex-row w-full">
        <div className="flex justify-center items-center md:w-1/2 w-full p-8">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-slate-200">
              Create an Account
            </h1>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-slate-400"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="off"
                  required
                  placeholder="Enter your name"
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-transparent py-2 px-4 text-gray-900 dark:text-white shadow-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-slate-400"
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
                  className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-transparent py-2 px-4 text-gray-900 dark:text-white shadow-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-slate-400"
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
                  className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-transparent py-2 px-4 text-gray-900 dark:text-white shadow-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center rounded-md bg-indigo-600 dark:bg-indigo-500 py-2 px-4 text-sm font-semibold text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 shadow-md"
                >
                  {loading ? "Loading..." : "Sign up"}
                </button>
                <OAuth />
              </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
        <div className="md:w-1/2 w-full p-8 flex justify-center items-center mt-6 md:mt-0">
          <img
            src="/signup.svg"
            alt="Sign up"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
