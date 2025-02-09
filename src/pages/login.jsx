import React, { useState, useEffect } from "react";
import { Lock, Mail, User, ChevronDown} from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../Utilities/constant";
import { useDispatch, useSelector } from "react-redux";
import store from "../Utilities/store";
import { useNavigate } from "react-router-dom";
import { addItem } from "../Utilities/cartSlice";


function Login() {
  const userInfo = useSelector((store) => store.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");

  const [domainType, setDomainType] = useState(null);
  const [code, setCode] = useState("");

  const branches = ['cs','ee'];

  useEffect(() => {
    const domain = email.split("@")[1];
    if (domain === "gmail.com" && !isSignIn) {
      setDomainType("gmail");
    } else if (domain === "ietdavv.edu.in") {
      setDomainType("ietdavv");
    } else {
      setDomainType(null);
    }
  }, [email, isSignIn,userInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const domain = email.split("@")[1];
    console.log(domain);

    if (isSignIn && domain == "ietdavv.edu.in") {
      // Sign in logic
      try {
        const res = await axios.post(
          BASE_URL + "/user/signin/student/api",
          { email, password },
          { withCredentials: true }
        );
        console.log(res.data.message);
        
        // console.log("Dispatching student info to Redux:", res.data.message);
        const user= {
          name:res?.data?.message?.name,
          email:res?.data?.message?.email,
          rollno:res?.data?.message?.roll_no,
          section:res?.data?.message?.section_id,
          student_Id:res?.data?.message?.student_id,
          year:res?.data?.message?.year,
          role:res?.data?.message?.role

        }
dispatch(addItem(user));
// console.log("Updated Redux state:", store.getState().cart);
navigate("/studhome")

      } catch (err) {
        console.log(err);
      }
    }

    if (
      isSignIn &&
      (domain == "gmail.com" ||
        domain == "gmail.co.in" ||
        domain == "yahoo.com" ||
        domain == "yahoo.co.in")
    ) {
      // Sign in logic
      try {
        const res = await axios.post(
          BASE_URL + "/user/signin/teacher/api",
          { email, password },
          { withCredentials: true }
        );

        console.log(res.data.message);
        // console.log("Dispatching student info to Redux:", res.data.message);
        const user= {
          name:res?.data?.message?.faculty_name,
          email:res?.data?.message?.email,
          
          faculty_id:res?.data?.message?.faculty_id,
          role:res?.data?.message?.role

        }
dispatch(addItem(user));
// console.log("Updated Redux state:", store.getState().cart);
navigate("/teachhome")
      } catch (err) {
        console.log(err);
      }
    }

    if (!isSignIn && domain == "ietdavv.edu.in") {
      const sec = branch;
      const roll_no = rollno;

      // Sign in logic
      try {
        const res = await axios.post(
          BASE_URL + "/user/signup/student/api",
          { email, password, name, sec, roll_no, year },
          { withCredentials: true }
        );
        console.log(res.data.message);
        setIsSignIn(!isSignIn);
      } catch (err) {
        console.log(err);
      }
    }

    if (
      (!isSignIn && domain == "gmail.com") ||
      domain == "gmail.co.in" ||
      domain == "yahoo.com" ||
      domain == "yahoo.co.in"
    ) {
      // Sign in logic
      try {
        const res = await axios.post(
          BASE_URL + "/user/signup/teacher/api",
          { email, password, name, code },
          { withCredentials: true }
        );
        console.log(res.data.message);
        setIsSignIn(!isSignIn);
      } catch (err) {
        console.log(err);
      }
    }
    // Logging input values
    console.log(isSignIn ? "Signing in..." : "Signing up...", {
      email,
      password,
      name,
      code,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Lock className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isSignIn ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="cursor-pointer font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isSignIn && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Full Name"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {/* Dynamically Render Extra Fields */}
            {!isSignIn && domainType === "gmail" && (
              <div>
                <label htmlFor="extra-gmail" className="sr-only">
                  Invitation Code
                </label>
                <input
                  id="extra-gmail"
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Invitation Code"
                />
              </div>
            )}

            {!isSignIn && domainType === "ietdavv" && (
              <div>
                <label htmlFor="extra-ietdavv" className="sr-only">
                  Roll Number
                </label>
                <input
                  id="extra-ietdavv"
                  type="text"
                  required
                  value={rollno}
                  onChange={(e) => setRollno(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your Roll Number"
                />
              </div>
            )}

            {/* {!isSignIn && domainType === "ietdavv" && (
              <div>
                <label htmlFor="extra-ietdavv" className="sr-only">
                  Year
                </label>
                <input
                  id="extra-ietdavv"
                  type="text"
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Year"
                />
              </div>
            )} */}

            {!isSignIn && domainType === "ietdavv" && (
              <div>
                <h1 htmlFor="extra-ietdavv" className="sr-only">
                  Year
                </h1>
                <select id="extra-ietdavv" required value={year} onChange={(e)=>setYear(e.target.value)} 
                  className="cursor-pointer appearance-auto relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                  <option>Select Year</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
            )}


            {/* {!isSignIn && domainType === "ietdavv" && (
              <div>
                <label htmlFor="extra-ietdavv" className="sr-only">
                  Branch
                </label>
                <input
                  id="extra-ietdavv"
                  type="text"
                  required
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Branch"
                />
              </div>
            )} */}

          {!isSignIn && domainType === "ietdavv" && (
              <div>
                <h1 htmlFor="extra-ietdavv" className="sr-only">
                  Branch
                </h1>
                <select required id="extra-ietdavv" value={branch} onChange={(e)=>setBranch(e.target.value)} 
                  className="cursor-pointer appearance-auto relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                  <option>Select Branch</option>
                  <option>CSA</option>
                  <option>CSB</option>
                  <option>ITA</option>
                  <option>ITB</option>
                </select>
              </div>
            )}
          </div>

          {isSignIn && (
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            {isSignIn ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
