import Navbar from "@/Layouts/Navbar";
import { Head, Link, usePage } from "@inertiajs/react";
import { IoArrowRedoSharp } from "react-icons/io5";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import { useState } from "react";


const Index = () => {

    const route = useRoute();
    const { employees } = usePage().props;
    const { flash } = usePage().props;

    const [flashMsg, setFlashMsg] = useState(flash.message);

    setTimeout(() => {
        setFlashMsg(null);
    }, 3000);

  return (
    <div className="p-6">
        <Head title="Home" />
        { flashMsg && (
            <div className="absolute top-24 right-6 bg-rose-500 p-2 rounded-md shadow-lg text-sm text-white">
                {flashMsg}
            </div> 
        )}
        <h1 className="text-2xl font-bold mb-4">Employees List</h1>
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg mt-6">
            <thead>
                <tr className="bg-gradient-to-r from-blue-950 to-purple-600">
                    <th className="text-white border border-gray-300 px-6 py-3">Name</th>
                    <th className="text-white border border-gray-300 px-6 py-3">Email</th>
                    <th className="text-white border border-gray-300 px-6 py-3">Job Title</th>
                </tr>
            </thead>
            <tbody>
                {employees.data.map((employee) => (
                    <tr key={employee.id}>
                        <td className="flex justify-between border border-gray-300 px-4 py-2">
                            {employee.name}
                            <Link href={route('employees.show', employee)}>
                                <IoArrowRedoSharp className="cursor-pointer" />
                            </Link>
                        </td>
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