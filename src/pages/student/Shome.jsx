import React, { useState } from 'react';
import { 
  Clock,
  BarChart3,
  CheckCircle2,
  XCircle,
  BookOpen,
  Bell,
  Settings,
  ClipboardCheck
} from 'lucide-react';
import { useSelector } from 'react-redux';
import store from '../../Utilities/store';

function Studhome() {
  const [showNotifications, setShowNotifications] = useState(false);
const user= useSelector((store)=>store.cart);
console.log(user);

  //data from BE
  const studentInfo = {
    name: "Name",
    id: "123",
    course: "Computer Science",
    semester: "4th Semester",
    attendance: 12
  };

  const recentAttendance = [
    { subject: "Database Systems", date: "2024-03-15", status: "Present", time: "09:00 AM" }
  ];

//   const notifications = [
//     { message: "Attendance marked for Database Systems", time: "2 hours ago" },
//     { message: "Low attendance warning in Data Structures", time: "1 day ago" },
//   ];
if(user?.role==='Student'){
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
                <Bell size={20} className='text-gray-600'/>
                <span className="hover:text-gray-800 absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </button>
              {/* notifications open logic */}

              {/* {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-3">Notifications</h3>
                    {notifications.map((notification, index) => (
                      <div key={index} className="mb-3 last:mb-0 p-3 bg-gray-700 rounded-lg">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
            </div>
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">T</span>
                </div>
              <span className="font-medium">{studentInfo.name}</span>
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
              <h2 className="text-xl font-semibold text-blue-600">Student Information</h2>
              <span className="text-sm text-gray-600">ID: {studentInfo.id}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Course</p>
                <p className="font-medium text-gray-600">{studentInfo.course}</p>
              </div>
              <div>
                <p className="text-gray-600">Semester</p>
                <p className="font-medium text-gray-600">{studentInfo.semester}</p>
              </div>
            </div>
          </div>
          
          {/* Attendance Overview */}
          <div className="bg-white/10 p-6 rounded-xl shadow-lg border border-gray-500">
            <div className="text-center">
              <BarChart3 className="mx-auto h-8 w-8 text-blue-600 mb-2" />
              <h3 className="text-lg font-medium text-gray-600">Attendance Rate</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold text-blue-600">{studentInfo.attendance}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Attendance */}
        <div className="bg-white/10 rounded-xl shadow-lg p-6 border border-gray-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-blue-600">Recent Attendance</h2>
            <Clock className="text-gray-600" size={20} />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-500">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Subject
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
                  <tr key={index} className="hover:bg-gray-200 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 text-gray-600 mr-2" />
                        <span className="text-sm">{record.subject}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span className="text-sm">{record.date}</span>
                        <span className="text-xs text-gray-600 block">{record.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {record.status === "Present" ? (
                          <>
                            <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                            <span className="text-sm text-green-600">Present</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5 text-red-600 mr-2" />
                            <span className="text-sm text-red-600">Absent</span>
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

        {/* Calendar View */}

        {/* <div className="mt-6 bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Monthly Overview</h2>
            <Calendar className="text-gray-400" size={20} />
          </div>
          <p className="text-gray-400 text-center py-8">
            Calendar view will be implemented here
          </p>
        </div> */}
      </main>
    </div>
  );
}
}

export default Studhome;