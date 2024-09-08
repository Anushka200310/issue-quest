import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "@/firebase";
import useAuth from "@/store/auth.jsx";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const { storeTokenInLS, API } = useAuth();
  const navigate = useNavigate();

  const URL = `${API}/api/auth/google`;

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      if (res.ok) {
        const data = await res.json();

        storeTokenInLS(data.token);

        console.log("welcome back");
        navigate("/");
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleGoogleClick}
        className="flex w-full items-center justify-center mt-4 rounded-md bg-white border border-slate-500 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 dark:bg-black dark:text-white"
      >
        <FcGoogle className="text-2xl" />
        <span className="ml-2">Continue with google</span>
      </button>
    </>
  );
};

export default OAuth;
