import React, { useState } from "react";
import { ClipboardCheck, Calendar, CheckCircle2, XCircle } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../Utilities/constant";
import { useSelector } from "react-redux";

// data come from api

function Checkattend() {
  const [checkedAttend, setcheckedAttend] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("Select Subject");

  const user = useSelector((store) => store.cart);
  console.log(user);

  // const handlecheckAttend = async() => {
  //   try{
  //     console.log(selectedSubject+ " "+ user.student_Id);

  //     const res = await axios.get(
  //       `http://localhost:1000/student/checkAttendance`,
  //        {
  //         subject: selectedSubject,
  //         id: user.student_Id
  //        },{
  //         withCredentials: true
  //        }
  //     );
  //     console.log(res);
  //   setcheckedAttend(res?.data);

  //   }
  //   catch(e){
  //     console.log(e);
  //   }
  // }
  const handlecheckAttend = async () => {
    try {
      console.log(
        `Selected Subject: ${selectedSubject}, Student ID: ${user.student_Id}`
      );

      const res = await axios.get(
        `http://localhost:1000/student/checkAttendance`,
        {
          params: {
            subject: selectedSubject,
            id: user.student_Id,
          },
          withCredentials: true,
        }
      );

      console.log("API Response:", res.data);
      setcheckedAttend(res?.data);
    } catch (e) {
      console.error("API Error:", e.response?.data || e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <ClipboardCheck className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">AttTrack</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Subject Selection */}
          <div className="mb-8 ">
            <label
              htmlFor="subject"
              className=" block text-sm font-medium text-gray-700 mb-2"
            >
              Select Subject
            </label>
            <select
              id="subject"
              className="bg-gray-100 cursor-pointer mt-1 block w-auto pl-3 pr-10 py-2 text-base border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedSubject} // Ensure a default value
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option key={1} value="Select Subject">
                Select Subject
              </option>
              <option key={2} value="Discrete Structures">
                Discrete Structures
              </option>
            </select>
          </div>

          {/* Attendance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Card */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Attendance Overview
                </h3>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Classes</span>
                    <span className="font-semibold">{checkedAttend?.total?.count ? checkedAttend.total_classes :"No data" }</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Classes Attended</span>
                    <span className="font-semibold">{checkedAttend?.total?.count ? checkedAttend.total.count :"No data" }</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Classes Missed</span>
                    <span className="font-semibold">{checkedAttend.total  ? checkedAttend.total_classes-checkedAttend.total.count : "No Data" }</span>
                  </div>
                </div>
            </div>

            {/* PERCENTAGE FULL COPY  */}




            
          </div>
          <div className="pt-2">
            <button
              onClick={handlecheckAttend}
              className="bg-blue-600 rounded-2xl p-2 transition-all duration-200 text-white w-48 cursor-pointer hover:bg-blue-500"
            >
              Submit
            </button>
          </div>
        </div>
        <div>{/* {checkedAttend} */}</div>
      </main>
    </div>
  );
}

export default Checkattend;
