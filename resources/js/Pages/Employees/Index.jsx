import Navbar from "@/Layouts/Navbar";
import { Head, Link, usePage } from "@inertiajs/react"


const Index = () => {

    const { employees } = usePage().props;

  return (
    <div className="p-6">
        <Head title="Employees" />
        <h1 className="text-2xl font-bold mb-4">Employees List</h1>
        <Link href={route("employees.create")} className="bg-green-500 text-white px-4 py-2">
        Add Employee
        </Link>
        <table className="w-full border-collapse border border-gray-300 mt-3">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">Job Title</th>
                </tr>
            </thead>
            <tbody>
                {employees.data.map((employee) => (
                    <tr key={employee.id}>
                        <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{employee.email}</td>
                        <td className="border border-gray-300 px-4 py-2">{employee.job_title}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="flex justify-end py-10 px-4">
            <nav className="flex space-x-2">
                {employees.links.map(link => (
                    <Link 
                        key={link.label} 
                        href={link.url} 
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`px-4 py-2 rounded-md transition-all duration-300 ${link.active ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} ${link.label.includes('Previous') || link.label.includes('Next') ? 'font-semibold' : ''} ${link.url === null ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
                    />
                ))}
            </nav>
        </div>
    </div>
  );
}

Index.layout = page => <Navbar children={page} />

export default Index;