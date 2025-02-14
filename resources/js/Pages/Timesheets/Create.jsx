import Navbar from "@/Layouts/Navbar";
import { Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";

const Create = ({ employees }) => {
    const route = useRoute();
    const { data, setData, post, processing, errors } = useForm({
        employee_id: "",
        date: "",
        start_time: "",
        end_time: "",
        summary: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('timesheets.store'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Gradient Header */}
                <div className="bg-gradient-to-r from-blue-950 to-purple-600 p-6 rounded-t-2xl shadow-2xl">
                    <h1 className="text-3xl font-bold text-white text-center">Create Timesheet</h1>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-b-2xl shadow-2xl p-6">
                    <form onSubmit={handleSubmit}>
                        {/* Employee Select */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">Employee</label>
                            <select
                                value={data.employee_id}
                                onChange={(e) => setData("employee_id", e.target.value)}
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            >
                                <option value="">Select Employee</option>
                                {employees.map((employee) => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.name}
                                    </option>
                                ))}
                            </select>
                            {errors.employee_id && <p className="text-red-500 text-sm mt-1">{errors.employee_id}</p>}
                        </div>

                        {/* Date Input */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">Date</label>
                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) => setData("date", e.target.value)}
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                        </div>

                        {/* Start Time Input */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">Start Time</label>
                            <input
                                type="time"
                                value={data.start_time}
                                onChange={(e) => setData("start_time", e.target.value)}
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                            {errors.start_time && <p className="text-red-500 text-sm mt-1">{errors.start_time}</p>}
                        </div>

                        {/* End Time Input */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">End Time</label>
                            <input
                                type="time"
                                value={data.end_time}
                                onChange={(e) => setData("end_time", e.target.value)}
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                            {errors.end_time && <p className="text-red-500 text-sm mt-1">{errors.end_time}</p>}
                        </div>

                        {/* Summary Textarea */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">Summary</label>
                            <textarea
                                value={data.summary}
                                onChange={(e) => setData("summary", e.target.value)}
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                rows="4"
                            />
                            {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center space-x-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
                            >
                                {processing ? "Saving..." : "Save"}
                            </button>
                            <Link
                                href={route("timesheets.index")}
                                className="text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

Create.layout = (page) => <Navbar children={page} />;

export default Create;