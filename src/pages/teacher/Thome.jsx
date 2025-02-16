import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Bell, 
  Settings, 
  LogOut,
  ClipboardCheck
} from 'lucide-react';
import { useSelector } from 'react-redux';
import store from '../../Utilities/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../Utilities/constant';


function Teachhome() {
  const [studentNum, setStudentNum] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  let navigate = useNavigate();

const user= useSelector((store)=>store.cart);
console.log(user);

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

if(user?.role==='Teacher'){
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <ClipboardCheck className="h-8 w-8 text-blue-600" />
            AttTrack
          </h1>
        </div>
        <nav className="mt-6">
          {[
            { icon: Calendar, text: 'Dashboard', active: true },
            { icon: Users, text: 'Get Attend' ,onClick: () => navigate('/getattend') },
            { icon: Bell, text: 'Notifications', badge: 0 },
            { icon: Settings, text: 'Settings' },
          ].map((item, index) => (
            <a
              key={index}
              onClick={item.text === 'Get Attend' ? item.onClick : undefined}
              className={`cursor-pointer flex items-center justify-between px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                item.active ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5" />
                {item.text}
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-6">
          <div className="border-t border-gray-100 pt-4 mt-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">T</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Name</p>
                <p className="text-sm text-gray-500">Teacher</p>
              </div>
            </div>
            <a
              className="cursor-pointer flex items-center gap-3 text-gray-700 hover:text-red-600 transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Welcome back, Name!</h2>
          <p className="text-gray-600">Date</p>
        </div>

        {/* Quick Attendance Section - Now Full Width */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-semibold mb-4">Quick Attendance</h3>
            <p className="text-blue-100 mb-6 text-lg">Take attendance for your current class </p>
            <div className="grid grid-cols-4 gap-6 mb-6">
              <div>
                <label className="block text-blue-100 text-sm mb-2">Academic Year</label>
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                >
                  {[1,2,3,4].map((year,idx) => (
                    <option className='bg-blue-600' value={idx} key={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-blue-100 text-sm mb-2">Branch</label>
                <select 
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                >
                  {['CSA', 'CSB','ITA','ITB'].map((section) => (
                    <option className='bg-blue-600' key={section} value={section}>{section}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-blue-100 text-sm mb-2">No. of Students</label>
                {/* <select 
                  value={studentNum}
                  onChange={(e) => setStudentNum(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={`Class ${i + 1}`}>Class {i + 1}</option>
                  ))}
                </select> */}
                <input
  type="number"
  value={studentNum}
  onChange={(e) => setStudentNum(e.target.value)}
  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:ring-2 focus:ring-white/30"
/>

              </div>
              <div className="flex items-end">
                <button onClick={()=>navigate('/gencode')} className="cursor-pointer w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors text-lg">
                  Gen code
                </button>
              </div>
            </div>
            {/* <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm text-blue-100">
                Currently selected: {studentNum} Section {selectedSection} | Academic Year {selectedYear}
              </p>
            </div> */}
          </div>
        </div>

        {/* Stats Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: UserCheck,
              title: "Present Today",
              count: "24",
              total: "27",
              color: "bg-green-100 text-green-600",
              trend: "+2 from yesterday"
            },
            {
              icon: UserX,
              title: "Absent Today",
              count: "3",
              total: "27",
              color: "bg-red-100 text-red-600",
              trend: "-1 from yesterday"
            },
            {
              icon: Clock,
              title: "Late Arrivals",
              count: "2",
              color: "bg-yellow-100 text-yellow-600",
              trend: "Same as yesterday"
            },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-600">{stat.title}</h3>
                  <div className="flex items-end gap-2">
                    <p className="text-2xl font-bold text-gray-800">{stat.count}</p>
                    {stat.total && (
                      <p className="text-gray-500 mb-1">/ {stat.total}</p>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{stat.trend}</p>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Today's Class Attendance</h3>
            <div className="flex items-center gap-3">
              <select className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700">
                <option>Class A</option>
                <option>Class B</option>
                <option>Class C</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600">Student Name</th>
                  <th className="text-left py-3 px-4 text-gray-600">Class</th>
                  <th className="text-left py-3 px-4 text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  
                ].map((student, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        {student.name}
                      </div>
                    </td>
                    <td className="py-3 px-4">{student.class}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        student.status === "Present"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );}
}

export default Teachhome;