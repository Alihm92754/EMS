import Navbar from "@/Layouts/Navbar";
import { Head, Link, usePage } from "@inertiajs/react";
import { IoArrowRedoSharp } from "react-icons/io5";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import { useState, useEffect } from "react";

const Index = () => {
    const route = useRoute();
    const { employees } = usePage().props;
    const { flash } = usePage().props;

    const [flashMsg, setFlashMsg] = useState(flash.message);
    const [selectedDepartment, setSelectedDepartment] = useState("All");
    const [filteredEmployees, setFilteredEmployees] = useState(employees.data);
    const [searchTerm, setSearchTerm] = useState("");

    const departments = ["All", "Development", "Finance", "Marketing", "Designing"];

    useEffect(() => {
        let filtered = employees.data;

        // Department filter
        if (selectedDepartment !== "All") {
            filtered = filtered.filter(
                (employee) => employee.department === selectedDepartment
            );
        }

        // Search filter
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            filtered = filtered.filter((employee) =>
                Object.values(employee).some(
                    (value) =>
                        typeof value === "string" &&
                        value.toLowerCase().includes(lowerSearch)
                )
            );
        }

        setFilteredEmployees(filtered);
    }, [selectedDepartment, searchTerm, employees.data]);

    const filterByDepartment = (department) => {
        setSelectedDepartment(department);
    };

    setTimeout(() => {
        setFlashMsg(null);
    }, 3000);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-10 px-4 sm:px-6 lg:px-8">
            <Head title="Employees List" />
            {flashMsg && (
                <div className="fixed top-24 right-6 bg-green-500 p-3 rounded-lg shadow-lg text-sm text-white animate-fade-in-out">
                    {flashMsg}
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                {/* Gradient Header */}
                <div className="bg-gradient-to-r from-blue-950 to-purple-600 p-6 rounded-t-2xl shadow-2xl">
                    <h1 className="text-3xl font-bold text-white text-center">Employees List</h1>
                </div>

                {/* Filters Section */}
                <div className="bg-white p-6 border-b border-gray-200">
                    <div className="flex flex-wrap gap-4 justify-between items-center">
                        {/* Department Filters */}
                        <div className="flex flex-wrap gap-2">
                            {departments.map((department) => (
                                <button
                                    key={department}
                                    onClick={() => filterByDepartment(department)}
                                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                        selectedDepartment === department
                                            ? "bg-gradient-to-r from-blue-950 to-purple-600 text-white shadow-md"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                                >
                                    {department}
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-b-2xl shadow-2xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
                            <tr>
                                <th className="text-left text-gray-600 font-semibold px-6 py-4">Name</th>
                                <th className="text-left text-gray-600 font-semibold px-6 py-4">Email</th>
                                <th className="text-left text-gray-600 font-semibold px-6 py-4">Job Title</th>
                                <th className="text-left text-gray-600 font-semibold px-6 py-4">Department</th>
                                <th className="text-right text-gray-600 font-semibold px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredEmployees.map((employee) => (
                                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{employee.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{employee.email}</td>
                                    <td className="px-6 py-4 text-gray-600">{employee.job_title}</td>
                                    <td className="px-6 py-4 text-gray-600">{employee.department}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={route("employees.show", employee)}
                                            className="inline-flex items-center p-2 text-blue-600 hover:text-blue-800 transition-colors"
                                        >
                                            <IoArrowRedoSharp className="w-5 h-5" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-200">
                        <nav className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                Showing {employees.from} to {employees.to} of {employees.total} entries
                            </div>
                            <div className="flex space-x-2">
                                {employees.links.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.url}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                            link.active
                                                ? "bg-gradient-to-r from-blue-950 to-purple-600 text-white shadow-md"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        } ${link.url === null ? "opacity-50 cursor-not-allowed" : ""}`}
                                    />
                                ))}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

Index.layout = (page) => <Navbar children={page} />;

export default Index;