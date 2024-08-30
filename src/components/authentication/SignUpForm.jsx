import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AuthContext } from "../../contexts/AuthContext";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { notify } from "../../utils/toastify";
const SignUpForm = () => {
  const { setShowForm, register } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    isCheck: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    console.log("credentials", credentials);
    if (e.target.name === "isCheck") {
      setCredentials({ ...credentials, [e.target.name]: e.target.checked });
      return;
    }
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password || !credentials.name) {
      alert("Please fill all the fields!");
      return notify("Please fill all the fields!", "error");
    }

    if (!credentials.isCheck) {
      return notify("Please accept the terms and conditions!", "error");
    }
    setIsSubmitting(true);
    const data = await register(credentials);

    if (data.sucess === "success") {
      setShowForm("login");
      notify("Register successful");
    } else {
      setIsSubmitting(false);
      notify(data.error.message, "error");
    }
  };

  return (
    <div className="relative ">
      <div className="fixed inset-0  bg-black/70 z-[1000] flex justify-center items-center p-4">
        <div className="bg-white w-[370px] py-6 px-7 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xl">Sign Up</span>
            <img
              className="cursor-pointer"
              onClick={() => setShowForm(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>

          <form action="">
            <div className="flex flex-col gap-6 mt-8">
              <input
                onChange={handleOnChange}
                className="border p-2 rounded focus:outline-orange-500"
                type="text"
                name="name"
                placeholder="Your name"
              />
              <input
                onChange={handleOnChange}
                className="border p-2 rounded  focus:outline-orange-500"
                type="text"
                name="email"
                placeholder="Your email"
              />
              <div className="relative">
                <input
                  onChange={handleOnChange}
                  name="password"
                  className="border p-2 pr-8 rounded focus:outline-orange-500 w-full"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />

                <div className="absolute right-3 top-[50%] -translate-y-[50%]">
                  <span
                    className="cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <IoMdEye className="text-gray-600" />
                    ) : (
                      <IoMdEyeOff className="text-gray-600" />
                    )}
                  </span>
                </div>
              </div>
            </div>
            <button
              disabled={isSubmitting}
              onClick={handleSignUp}
              className="mt-7 bg-orange-600 text-white text-center w-full py-1.5 rounded"
            >
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </button>

            <div className="mt-2 flex items-center gap-2">
              <input type="checkbox" name="isCheck" onChange={handleOnChange} />
              <span className="text-xs text-gray-500">
                By continuing, you agree to accept our Privacy Policy & Terms of
                Service.
              </span>
            </div>
          </form>

          <div>
            <p className="mt-4 text-xs text-gray-500">
              Already have an account? {/* <Link to="/login"> */}{" "}
              <span
                onClick={() => setShowForm("login")}
                className="text-orange-500 cursor-pointer"
              >
                Login here
              </span>
              {/* </Link> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
