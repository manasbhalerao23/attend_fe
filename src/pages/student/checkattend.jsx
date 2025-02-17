import React, { useState } from 'react';
import { ClipboardCheck, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../../Utilities/constant';

// data come from api


function Checkattend() {
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [checkedAttend, setcheckedAttend] = useState([]);

  const attendancePercentage = Math.round((selectedSubject.attended / selectedSubject.totalClasses) * 100);
  const getAttendanceColor = (percentage) => {
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handlecheckAttend = async() => {
    const user = useSelector((store) => store.cart);
    try{
      const res = await axios.get(
        `${BASE_URL}/student/checkAttendence`,
         {
          subject: selectedSubject,
          id: user.id
         }
      );
    }
    catch(e){
      console.log(e);
    }
    setcheckedAttend(res);
  }


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
            <label htmlFor="subject" className=" block text-sm font-medium text-gray-700 mb-2">
              Select Subject
            </label>
            <select
              id="subject"
              className="bg-gray-100 cursor-pointer mt-1 block w-auto pl-3 pr-10 py-2 text-base border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedSubject.id}
              onChange={(e) => setSelectedSubject(e)}
            >
              
               <option key={1} value={2}>
                  DBMS
                </option>
              
            </select>
          </div>
          



          {/* Attendance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Card */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Attendance Overview</h3>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Classes</span>
                  <span className="font-semibold">{selectedSubject.totalClasses}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Classes Attended</span>
                  <span className="font-semibold">{selectedSubject.attended}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Classes Missed</span>
                  <span className="font-semibold">{selectedSubject.totalClasses - selectedSubject.attended}</span>
                </div>
              </div>
            </div>

            {/* Percentage Card */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Attendance Percentage</h3>
                {attendancePercentage >= 75 ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="text-center">
                <div className={`text-5xl font-bold ${getAttendanceColor(attendancePercentage)}`}>
                  {attendancePercentage}%
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {attendancePercentage >= 75 ? (
                    'Good standing'
                  ) : attendancePercentage >= 60 ? (
                    'Need improvement'
                  ) : (
                    'Critical - Immediate attention required'
                  )}
                </div>
              </div>
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      attendancePercentage >= 75 ? 'bg-green-600' :
                      attendancePercentage >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${attendancePercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className='pt-2'>
            <button onClick={handlecheckAttend} className='bg-blue-600 rounded-2xl p-2 transition-all duration-200 text-white w-48 cursor-pointer hover:bg-blue-500' >
                  Submit
            </button>
          </div>
        </div>
        <div>
            {checkedAttend}
          </div>
      </main>
    </div>
  );
}

export default Checkattend;