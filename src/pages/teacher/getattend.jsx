  import { useState } from "react";
  import { BASE_URL } from "../../Utilities/constant";
  import axios from "axios";
  function GetAttend() {
    const [year, setyear] = useState("");
    const [sec, setsec] = useState("");
    const [sub, setsub] = useState("");

    const handlegetAttendance = async (e) => {
      e.preventDefault(); 
      console.log(year,sec,sub);
      try{
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

    }catch(err){
      console.log(err);
    }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">hii</h2>
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
      </div>
    );
  }

  export default GetAttend;
