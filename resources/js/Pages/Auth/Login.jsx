import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-950 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-10">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-950 to-purple-600 bg-clip-text text-transparent">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Please sign in to continue
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-sm text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="mt-8 space-y-6">
                        <div className="space-y-4">
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
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
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
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-1" />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-2">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="text-purple-600 focus:ring-purple-500 rounded"
                                    />
                                    <span className="text-sm text-gray-600">Remember me</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <PrimaryButton 
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-950 to-purple-600 hover:from-blue-900 hover:to-purple-500 transition-all duration-200"
                                disabled={processing}
                            >
                                Log in
                            </PrimaryButton>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex space-x-2">
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="font-medium text-purple-600 hover:text-purple-500"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                    <span className="text-gray-400">|</span>
                                    <Link
                                        href={route('register')}
                                        className="font-medium text-blue-900 hover:text-blue-800"
                                    >
                                        Don't have account? Register now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}