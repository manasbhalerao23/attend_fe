import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../Utilities/constant";
function GenCode() {
  const [studentNum, setStudentNum] = useState();
  const [selectedSection, setSelectedSection] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [subject, setSubject] = useState();
  const [code,setCode]=useState();

  const handleGenCode = async () => {
    try {
      // console.log("Sending Data:", {
      //   year: selectedYear,
      //   sec: selectedSection,
      //   subject: subject,
      //   num: studentNum,
      // });
      if (selectedYear && selectedSection && subject && studentNum) {
        const res = await axios.post(
          `${BASE_URL}/teacher/generateCode`,
          {
            year: selectedYear,
            sec: selectedSection,
            subject: subject,
            num: studentNum,
          },
          {
            withCredentials: true,
          }
        );
        console.log(res);
        setCode(res?.data?.code)
      }else{
        alert("Please fill all fields");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      {/* <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            hii
          </h2>
        </div>

        <form className="mt-8 space-y-6" >
        <div>
              <label htmlFor="numofstd" className="sr-only">
                Number of students
              </label>
              <div className="relative">
                <input
                  id="numofstd"
                  name="numofstd"
                  type="numofstd"
                  autoComplete="numofstd"
                  required
                  onChange={(e) => setnumstud(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Number of students"
                />
              </div>
            </div>

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
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Submit
          </button>
        </form>
      </div> */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-semibold mb-4">
            Attendance Code Generator
          </h3>
          <p className="text-blue-100 mb-6 text-lg">
            Take attendance for your current class{" "}
          </p>
          <div className="grid grid-rows-4 gap-6 mb-6">
            <div>
              <label className="block text-blue-100 text-sm mb-2">
                Academic Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
              >
                <option className="bg-blue-600" value={""}>
                  Select Year
                </option>
                {[1, 2, 3, 4].map((year) => (
                  <option className="bg-blue-600" value={year} key={year}>
                    {year}
                  </option>
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
                <option className="bg-blue-600" value={""}>
                  Select Section
                </option>

                {["CSA", "CSB", "ITA", "ITB"].map((section) => (
                  <option className="bg-blue-600" key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-blue-100 text-sm mb-2">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Enter Subject..."
              />
            </div>
            <div>
              <label className="block text-blue-100 text-sm mb-2">
                No. of Students
              </label>
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
                placeholder="Enter No. of Students"

              />
            </div>

            <div className="flex items-end">
              <button
                onClick={handleGenCode}
                className="cursor-pointer w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors text-lg"
              >
                Gen code
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-44 w-64 bg-gray-400 rounded-2xl m-5">
        <div className="">
          <h2 className="text-3xl font-bold text-blue-600 mb-4 p-2">Generated Code</h2>
        </div>
        <div className="text-white font-bold text-2xl p-3 flex">{code}</div>
      </div>
    </div>
  );
}

export default GenCode;
