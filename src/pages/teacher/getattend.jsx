import { useEffect, useState } from "react";
import { BASE_URL } from "../../Utilities/constant";
import axios from "axios";
import { BookOpen, CheckCircle2, Clock, XCircle } from "lucide-react";
function GetAttend() {
  const [year, setyear] = useState("");
  const [sec, setsec] = useState("");
  const [sub, setsub] = useState("");
  const [recentAttendance, setRecentAttendance] = useState([]); // ✅ Use State

  useEffect(() => {}, [recentAttendance]);
  const handlegetAttendance = async (e) => {
    e.preventDefault();
    console.log(year, sec, sub);
    try {
      const res = await axios.post(
        `${BASE_URL}/teacher/getAttendance`,
        {
          year: year,
          sec: sec,
          subject: sub,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setRecentAttendance(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-blue-100 to-blue-700 grid grid-cols-[50vh_130vh] gap-10  items-start justify-center pt-10 ">
      <div className=" max-w-md w-full space-y-8 bg-indigo-300 p-8 rounded-xl shadow-lg ">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Get Attendance Record</h2>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="year" className="sr-only">
                Year
              </label>
              <div className="relative">
                <input
                  id="Year"
                  name="Year"
                  type="text"
                  onChange={(e) => setyear(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Year"
                />
              </div>
            </div>

            <div>
              <label htmlFor="section" className="sr-only">
                Section
              </label>
              <div className="relative">
                <input
                  id="section"
                  name="section"
                  type="section"
                  autoComplete="section"
                  required
                  onChange={(e) => setsec(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="section"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="sr-only">
                Subject
              </label>
              <div className="relative">
                <input
                  id="subject"
                  name="subject"
                  type="subject"
                  required
                  onChange={(e) => setsub(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="subject"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handlegetAttendance}
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
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
                <th className=" py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Sno.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Roll No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider ">
                  Attended Classes
                </th>
                <th className=" py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Total Classes
                </th>
                <th className=" py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-20 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500">
              {recentAttendance.map((record, index) => (
                <tr key={index} className="hover:bg-gray-200 transition-colors">
                  <td className="py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-gray-600 mr-2" />
                      <span className="text-sm">{index}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm">{record.roll_no}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                    <span className="text-sm">{record.student_name}</span>

                    </div>
                  </td>
                  <td className="py-4 whitespace-nowrap">
                    <div className="flex px-16">
                      <span className="text-sm">{record.attended_classes}</span>
                    </div>
                  </td>
                  <td className="py-4 whitespace-nowrap">
                    <div className="flex px-6">
                      <span className="text-sm">{record.total_classes}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm">{record.attendance_percentage
    ? parseFloat(Number(record.attendance_percentage).toFixed(2))
    : "N/A"}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 flex justify-center items-center rounded-full ${
                      record.attendance_percentage >= 75 ? 'bg-green-600' :
                      record.attendance_percentage >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${record.attendance_percentage}%` }}
                  ></div>
                </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GetAttend;
