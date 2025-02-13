import Navbar from "@/Layouts/Navbar";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { BsPersonCircle } from "react-icons/bs";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import { useState } from "react";


const Show = ({ employee }) => {

    if (!employee) {
      return <div className="text-center text-gray-600">No employee data available.</div>;
    }

    const { delete: destroy } = useForm();
    const { flash } = usePage().props;
    const route = useRoute();

    const [flashMsg, setFlashMsg] = useState(flash.message);    
    setTimeout(() => {
        setFlashMsg(null);
    }, 3000);

    const handleDelete = (e) => {
      e.preventDefault();
      destroy(route('employees.destroy', employee));
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-10 px-4 sm:px-6 lg:px-8">
        <Head title="Display Employee" />
        { flashMsg && (
            <div className="absolute top-24 right-6 bg-green-500 p-2 rounded-md shadow-lg text-sm text-white">
                {flashMsg}
            </div> 
        )}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-950 to-purple-600 p-6 text-white">
            <div className="flex items-center space-x-6">
              <BsPersonCircle size={100} />
              <div>
                <h1 className="text-3xl font-bold">{employee.name}</h1>
                <p className="text-lg text-gray-300">{employee.job_title}</p>
                <p className="text-sm text-gray-300">{employee.department}</p>
              </div>
            </div>
          </div>
  
          {/* Employee Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <DetailItem label="Employee ID" value={employee.id} />
                <DetailItem label="Email" value={employee.email} />
                <DetailItem label="Phone" value={employee.phone} />
                <DetailItem label="Date of Birth" value={employee.dob} />
              </div>
  
              {/* Right Column */}
              <div className="space-y-4">
                <DetailItem label="Job Title" value={employee.job_title} />
                <DetailItem label="Department" value={employee.department} />
                <DetailItem label="Salary" value={`$${employee.salary}`} />
                <DetailItem label="Start Date" value={employee.start_date} />
                <DetailItem label="End Date" value={employee.endDate || "N/A"} />
              </div>
            </div>
  
            {/* Resume Section */}
            <div className="flex justify-between mt-8">
              <div>
                  <a
                    href={employee.resume || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    <span>View Resume</span>
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
              </div>
              <div className="flex flex-row space-x-8">
                  <Link href={route('employees.edit', employee)}>             
                      <button
                          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
                          >
                          <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                      </button>
                  </Link>
  
            {/* Delete Icon */}
              <form onSubmit={handleDelete}>
                  <button className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300">
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
              </form>
              </div>
            </div>
          </div>
  
          <div className="absolute bottom-4 right-4 flex space-x-4">
          </div>
  
        </div>
      </div>
    );
};

// Reusable DetailItem Component
const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-medium text-gray-800">{value}</p>
  </div>
);

Show.layout = page => <Navbar children={page} />

export default Show;