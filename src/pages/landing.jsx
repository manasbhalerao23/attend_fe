import React from 'react';
import { 
  Users, 
  ClipboardCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Landing() {
    let navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ClipboardCheck className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">AttTrack</span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => {navigate('/login');}} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium border border-gray-300 hover:border-gray-400 focus:outline-2">Login / Signup</button>
          </div>
        </nav>
      </header>

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Modern Student Attendance
            <span className="block text-blue-600">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track, monitor, and manage student attendance effortlessly.
          </p>
        </div>

        {/* Features */}
        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Users className="h-8 w-8 text-blue-600" />}
                title="Real-time Tracking"
                description="Monitor attendance in real-time ."
              />
              {/* <FeatureCard 
                icon={<Bell className="h-8 w-8 text-blue-600" />}
                title="Automated Alerts"
                description="Send automated notifications to parents and administrators for absences."
              /> */}
              {/* <FeatureCard 
                icon={<PieChart className="h-8 w-8 text-blue-600" />}
                title="Analytics Dashboard"
                description="Comprehensive reports and insights on attendance patterns."
              /> */}
              <FeatureCard 
                icon={<ClipboardCheck className="h-8 w-8 text-blue-600" />}
                title="Custom Reports"
                description="Generate attendance reports with just a single click."
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ClipboardCheck className="h-8 w-8 text-blue-400" />
                <span className="font-bold text-xl">AttTrack</span>
              </div>
            </div>
            <div>
              <ul className="space-y-2 text-gray-400 flex gap-4">
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AttTrack</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Landing;