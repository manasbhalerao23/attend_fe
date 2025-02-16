import React, { useEffect, useState } from "react";
import {
  Clock,
  BarChart3,
  CheckCircle2,
  XCircle,
  BookOpen,
  Bell,
  Settings,
  ClipboardCheck,
  LogOut,
} from "lucide-react";
import { useSelector } from "react-redux";
import store from "../../Utilities/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Utilities/constant";

function Studhome() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [recentAttendance, setRecentAttendance] = useState([]); // ✅ Use State
  let navigate = useNavigate();

  const user = useSelector((store) => store.cart);

  // Data from BE
  const studentInfo = {
    name: user?.name,
    id: user?.student_Id,
    course: "Computer Science",
    year: user?.year,
    attendance: 12,
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/user/signin/logout`,
        {},
        { withCredentials: true }
      );
      console.log(res.data);
return navigate("/login")
    } catch (err) {
      console.log(err);
    }
  };

  // API to fetch recent attendance
  const recentAPI = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/student/recentAttendance/${studentInfo.id}`,
        {
          withCredentials: true,
        }
      );

      console.log("API Response:", res);
      setRecentAttendance(res?.data?.message || []); 
    } catch (err) {
      console.error("Error fetching attendance:", err);
    }
  };

  useEffect(() => {
    recentAPI();
  }, []); 

  if (user?.role === "Student") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white text-white p-4 shadow-lg border-b border-gray-700">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <ClipboardCheck className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-blue-600">AttTrack</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="cursor-pointer p-2 hover:text-gray-800 rounded-full transition-colors"
                >
                  <Bell size={20} className="text-gray-600" />
                  <span className="hover:text-gray-800 absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    2
                  </span>
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">T</span>
                </div>

                <span className="font-medium text-black">
                  {studentInfo.name}
                </span>
                <div className="btn">
                <a
              className="cursor-pointer flex items-center gap-3 text-gray-700 hover:text-red-600 transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </a>
                </div>
              </div>
              <Settings className="text-gray-600 hover:text-gray-800 cursor-pointer" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto p-6">
          {/* Student Info Card */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white/10 p-6 rounded-xl shadow-lg border border-gray-500 col-span-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-blue-600">
                  Student Information
                </h2>
                <span className="text-sm text-gray-600">
                  ID: {studentInfo.id}
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate("/markattend")}
                    className="text-blue-600 bg-blue-200 cursor-pointer rounded-xl px-2 py-1"
                  >
                    Mark Attendance
                  </button>
                  <button
                    onClick={() => navigate("/checkattend")}
                    className=" text-blue-600 bg-blue-200 cursor-pointer rounded-xl px-2 py-1"
                  >
                    Check Attendance
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Course</p>
                  <p className="font-medium text-gray-600">B.Tech</p>
                </div>
                <div>
                  <p className="text-gray-600">Year</p>
                  <p className="font-medium text-gray-600">
                    {studentInfo.year}
                  </p>
                </div>
              </div>
            </div>

            {/* Attendance Overview */}
            <div className="bg-white/10 p-6 rounded-xl shadow-lg border border-gray-500">
              <div className="text-center">
                <BarChart3 className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                <h3 className="text-lg font-medium text-gray-600">
                  Attendance Rate
                </h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-blue-600">
                    {studentInfo.attendance}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Attendance */}
          <div className="bg-white/10 rounded-xl shadow-lg p-6 border border-gray-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-blue-600">
                Recent Attendance
              </h2>
              <Clock className="text-gray-600" size={20} />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-500">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Subject Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-500">
                  {recentAttendance.map((record, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-200 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <BookOpen className="h-5 w-5 text-gray-600 mr-2" />
                          <span className="text-sm">{record.subject_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <span className="text-sm">
                            {" "}
                            {new Date(record.created_at).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                          <span className="text-xs text-gray-600 block">
                            {new Date(record.created_at).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: true,
                              }
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {record.status === "P" ? (
                            <>
                              <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                              <span className="text-sm text-green-600">
                                Present
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-5 w-5 text-red-600 mr-2" />
                              <span className="text-sm text-red-600">
                                Absent
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Studhome;
