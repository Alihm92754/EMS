import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-950 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-10">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-950 to-purple-600 bg-clip-text text-transparent">
                            Create Your Account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Get started with your account
                        </p>
                    </div>

                    <form onSubmit={submit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <InputLabel 
                                    htmlFor="name" 
                                    value="Name" 
                                    className="text-gray-700 font-medium"
                                />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel 
                                    htmlFor="email" 
                                    value="Email" 
                                    className="text-gray-700 font-medium"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200"
                                    autoComplete="email"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel 
                                    htmlFor="password" 
                                    value="Password" 
                                    className="text-gray-700 font-medium"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                    className="text-gray-700 font-medium"
                                />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-1" />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <PrimaryButton 
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-950 to-purple-600 hover:from-blue-900 hover:to-purple-500 transition-all duration-200"
                                disabled={processing}
                            >
                                Register
                            </PrimaryButton>

                            <div className="text-center text-sm">
                                <Link
                                    href={route('login')}
                                    className="font-medium text-blue-900 hover:text-blue-800"
                                >
                                    Already registered? Login here
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}