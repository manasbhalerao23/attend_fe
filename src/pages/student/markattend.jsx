import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../Utilities/constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MarkAttend() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  const user = useSelector((store) => store.cart);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        setLocation({
          latitude: null,
          longitude: null,
          error: "Geolocation is not supported by your browser",
        });
        reject("Geolocation is not supported by your browser");
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000, // 10 seconds timeout
        maximumAge: 0, // Prevents cached location data
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          };
          setLocation(newLocation);
          resolve(newLocation);
        },
        (error) => {
          setLocation({ latitude: null, longitude: null, error: error.message });
          reject(error.message);
        },
        options
      );
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const currentLocation = await getLocation(); // Wait for location to update
      console.log("Location Fetched:", currentLocation.latitude, currentLocation.longitude);

      const res = await axios.post(
        BASE_URL + "/student/markAttendance",
        {
          code: code,
          subject: subject,
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          student_id: user?.student_Id,
          role: user?.role,
          section: user?.section,
          year: user?.year,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      alert("Attendance marked successfully");
      navigate("/studhome");
    } catch (err) {
      console.log(err.message);
      alert("Could not Mark Attendance");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Mark Attendance</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="Code" className="sr-only">
              Auth Code
            </label>
            <input
              id="Code"
              name="Code"
              type="text"
              required
              onChange={(e) => setCode(e.target.value)}
              className="appearance-none block w-full pl-3 pr-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Auth Code"
            />
          </div>

          <div>
            <label htmlFor="subject" className="sr-only">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              onChange={(e) => setSubject(e.target.value)}
              className="appearance-none block w-full pl-3 pr-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Subject"
            />
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default MarkAttend;
