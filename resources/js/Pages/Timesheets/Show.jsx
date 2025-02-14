import Navbar from "@/Layouts/Navbar";
import { Link } from "@inertiajs/react";

const Show = ({ timesheet, previous, next }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-950 to-purple-600 bg-clip-text text-transparent">
              Timesheet Details
            </h1>
            <Link 
              href="/timesheets" 
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-950 to-purple-600 text-white hover:from-blue-900 hover:to-purple-500 transition-all duration-200"
            >
              Go Back
            </Link>
          </div>

          {/* Details Container */}
          <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="space-y-4 text-gray-700">
              <p><strong className="text-blue-900">ID:</strong> {timesheet.id}</p>
              <p><strong className="text-blue-900">Date:</strong> {timesheet.date}</p>
              <p><strong className="text-blue-900">Hours Worked: </strong> 
                {new Date(timesheet.end_time).getHours() - new Date(timesheet.start_time).getHours()} hours
              </p>
              <p><strong className="text-blue-900">Description:</strong> {timesheet.summary}</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between gap-4">
            {previous ? (
              <Link 
                href={`/timesheets/${previous}`}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-950 to-purple-600 text-white hover:from-blue-900 hover:to-purple-500 transition-all duration-200"
              >
                ← Previous
              </Link>
            ) : <div className="flex-1"></div>}
            
            {next ? (
              <Link 
                href={`/timesheets/${next}`}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-950 to-purple-600 text-white hover:from-blue-900 hover:to-purple-500 transition-all duration-200"
              >
                Next →
              </Link>
            ) : <div className="flex-1"></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

Show.layout = (page) => <Navbar children={page} />;
export default Show;