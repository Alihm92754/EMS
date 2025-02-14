import { Link } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import Navbar from "@/Layouts/Navbar";
import { IoArrowRedoSharp } from "react-icons/io5";

const Home = ({ timesheets }) => {
    const route = useRoute();

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Gradient Header */}
                <div className="bg-gradient-to-r from-blue-950 to-purple-600 p-6 rounded-t-2xl shadow-2xl">
                    <h1 className="text-3xl font-bold text-white text-center">Timesheets</h1>
                </div>

                {/* Action Buttons */}
                <div className="bg-white p-6 border-b border-gray-200">
                    <div className="flex flex-wrap gap-4">
                        <Link 
                            href={route('timesheets.create')} 
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-950 to-purple-600 text-white hover:from-blue-900 hover:to-purple-500 transition-all duration-200"
                        >
                            Create Timesheet
                        </Link>
                        <Link 
                            href={route('timesheets.calendar')} 
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-950 to-purple-600 text-white hover:from-blue-900 hover:to-purple-500 transition-all duration-200"
                        >
                            View Calendar
                        </Link>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-b-2xl shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
                                <tr>
                                    <th className="text-left text-gray-600 font-semibold px-6 py-4">#</th>
                                    <th className="text-left text-gray-600 font-semibold px-6 py-4">Employee</th>
                                    <th className="text-left text-gray-600 font-semibold px-6 py-4">Date</th>
                                    <th className="text-left text-gray-600 font-semibold px-6 py-4">Start Time</th>
                                    <th className="text-left text-gray-600 font-semibold px-6 py-4">End Time</th>
                                    <th className="text-left text-gray-600 font-semibold px-6 py-4">Summary</th>
                                    <th className="text-right text-gray-600 font-semibold px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {timesheets.data.length > 0 ? (
                                    timesheets.data.map((timesheet, index) => (
                                        <tr key={timesheet.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                                            <td className="px-6 py-4 text-gray-600">{timesheet.employee.name}</td>
                                            <td className="px-6 py-4 text-gray-600">{timesheet.date}</td>
                                            <td className="px-6 py-4 text-gray-600">{timesheet.start_time}</td>
                                            <td className="px-6 py-4 text-gray-600">{timesheet.end_time}</td>
                                            <td className="px-6 py-4 text-gray-600">{timesheet.summary}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end space-x-4">
                                                    <Link 
                                                        href={route("timesheets.show", timesheet.id)}
                                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                                    >
                                                        <IoArrowRedoSharp className="w-5 h-5" />
                                                    </Link>
                                                    <Link 
                                                        href={route("timesheets.edit", timesheet.id)}
                                                        className="text-purple-600 hover:text-purple-800 transition-colors"
                                                    >
                                                        <IoArrowRedoSharp className="w-5 h-5" />
                                                    </Link>
                                                    <Link 
                                                        as="button"
                                                        method="delete"
                                                        href={route("timesheets.destroy", timesheet.id)}
                                                        className="text-red-600 hover:text-red-800 transition-colors"
                                                    >
                                                        <IoArrowRedoSharp className="w-5 h-5" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-6 text-gray-600 bg-gray-50">
                                            No timesheets found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

Home.layout = (page) => <Navbar children={page} />;

export default Home;