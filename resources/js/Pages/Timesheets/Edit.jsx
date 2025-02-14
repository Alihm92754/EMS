import Navbar from "@/Layouts/Navbar";
import { Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import InputLabel from "@/Components/InputLabel";

const Edit = ({ timesheet, employees }) => {
    const route = useRoute();

    const { data, setData, put, errors, processing } = useForm({
        employee_id: timesheet.employee_id,
        date: timesheet.date,
        start_time: timesheet.start_time ? timesheet.start_time.replace(' ', 'T').substring(0, 16) : '',
        end_time: timesheet.end_time ? timesheet.end_time.replace(' ', 'T').substring(0, 16) : '',
        summary: timesheet.summary || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('timesheets.update', { timesheet: timesheet.id }), data);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="mb-8 bg-gradient-to-r from-blue-950 to-purple-600 rounded-lg p-4 text-center">
                        <h2 className="text-3xl font-bold text-white">
                            Edit Timesheet
                        </h2>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Employee Dropdown */}
                        <div>
                            <label className="text-gray-700 font-medium mb-2">Employee</label> 
                            <select
                                value={data.employee_id}
                                onChange={(e) => setData("employee_id", e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200"
                            >
                                {employees.map((employee) => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.name}
                                    </option>
                                ))}
                            </select>
                            {errors.employee_id && <p className="text-red-500">{errors.employee_id}</p>}
                        </div>

                        {/* Date Field */}
                        <div>
                        <label className="text-gray-700 font-medium mb-2">Date</label> 
                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) => setData("date", e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200"
                            />
                             {errors.date && <p className="text-red-500">{errors.date}</p>}
                        </div>

                        {/* Start Time */}
                        <div>
                        <label className="text-gray-700 font-medium mb-2">Start Time</label> 
                            <input
                                type="datetime-local"
                                value={data.start_time}
                                onChange={(e) => setData("start_time", e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200"
                            />
                             {errors.start_time && <p className="text-red-500">{errors.start_time}</p>}
                        </div>

                        {/* End Time */}
                        <div>
                        <label className="text-gray-700 font-medium mb-2">End Time</label> 
                            <input
                                type="datetime-local"
                                value={data.end_time}
                                onChange={(e) => setData("end_time", e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200"
                            />
                            {errors.end_time && <p className="text-red-500">{errors.end_time}</p>}
                        </div>

                        {/* Summary */}
                        <div>
                        <label className="text-gray-700 font-medium mb-2">Summary</label> 
                            <textarea
                                value={data.summary}
                                onChange={(e) => setData("summary", e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200 min-h-[120px]"
                            />
                            {errors.summary && <p className="text-red-500">{errors.summary}</p>}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-950 to-purple-600 text-white hover:from-blue-900 hover:to-purple-500 transition-all duration-200 font-medium"
                            >
                                Update Timesheet
                            </button>
                            <Link 
                                href={route("timesheets.index")} 
                                className="w-full sm:w-auto px-6 py-3 text-center text-blue-900 hover:text-blue-800 transition-colors duration-200 font-medium"
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

Edit.layout = (page) => <Navbar children={page} />;

export default Edit;