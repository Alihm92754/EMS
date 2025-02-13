import Navbar from "@/Layouts/Navbar";
import { Head, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";


const Edit = ({ employee }) => {

    const route = useRoute();

    const { data, setData, put, errors, processing } = useForm({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        dob: employee.dob,
        job_title: employee.job_title,
        department: employee.department,
        salary: employee.salary,
        start_date: employee.start_date,
        end_date: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('employees.update', employee));
    };

  return (
        <div className="p-6 mt-10 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
        <Head title="Edit Employee" />
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit An Employee</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none"
                    placeholder="Enter employee name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
    
            {/* Email Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none"
                    placeholder="Enter employee email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
    
            {/* Phone Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone:</label>
                <input
                    type="text"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none"
                    placeholder="Enter employee phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">BirthDay:</label>
                <input
                    type="date"
                    value={data.dob}
                    onChange={(e) => setData("dob", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none"
                    placeholder="Enter  your Birtday"
                />
                {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
            </div>
    
            {/* Job Title Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title:</label>
                <input
                    type="text"
                    value={data.job_title}
                    onChange={(e) => setData("job_title", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none"
                    placeholder="Enter employee job title"
                />
                {errors.job_title && <p className="text-red-500 text-sm mt-1">{errors.job_title}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department:</label>
                <input
                    type="text"
                    value={data.department}
                    onChange={(e) => setData("department", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none"
                    placeholder="Enter employee department"
                />
                {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
            </div>
    
            {/* Salary Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary:</label>
                <input
                    type="number"
                    value={data.salary}
                    onChange={(e) => setData("salary", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none"
                    placeholder="Enter employee salary"
                />
                {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date:</label>
                <input
                    type="date"
                    value={data.start_date}
                    onChange={(e) => setData("start_date", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none"
                    placeholder="Enter your start date"
                />
                {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date:</label>
                <input
                    type="date"
                    value={data.end_date}
                    onChange={(e) => setData("start_date", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none"
                    placeholder="Enter your start date"
                />
                {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>}
            </div>
    
            {/* Submit Button */}
            <div className="text-center">
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full sm:w-auto px-6 py-2 bg-blue-950 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </span>
                    ) : (
                        "Update"
                    )}
                </button>
            </div>
        </form>
    </div>
  );
}

Edit.layout = page => <Navbar children={page} />

export default Edit;