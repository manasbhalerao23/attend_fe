import { useState } from "react"

function MarkAttend() {
    const [code,setcode] = useState('');
    const [subid,setsubid] = useState('');

    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            hii
          </h2>
        </div>

        <form className="mt-8 space-y-6" >
        <div>
              <label htmlFor="Code" className="sr-only">
                Auth Code
              </label>
              <div className="relative">
                <input
                  id="Code"
                  name="Code"
                  type="Code"
                  autoComplete="Code"
                  required
                  onChange={(e) => setcode(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Auth Code"
                />
              </div>
            </div>

          <div className="space-y-4">

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
                  placeholder="Subject"
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
      </div>
    </div>
    );
}

export default MarkAttend;