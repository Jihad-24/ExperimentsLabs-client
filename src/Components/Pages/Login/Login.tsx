import Lottie from 'lottie-react';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UseAuth from '../../../Hook/UseAuth.tsx';
import UseAxiosPublic from '../../../Hook/UseAxiosPublic.tsx';
import loginAnimation from './login.json';

const Login: FC = () => {
    const { loginUser, signInWithGoogle } = UseAuth();
    const [signError, setSignError] = useState();
    const [signSuccess, setSignSuccess] = useState();
    const registerNavi = useNavigate();
    const axiosPublic = UseAxiosPublic();
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        setSignError(' ');
        setSignSuccess(' ');

        if (password.length < 6) {
            setSignError(' Password should be at least 6 characters ');
            return;
        } else if (!/[A-Z]/.test(password)) {
            setSignError('you should use one uppercase character.');
            return;
        } else if (!/[!@#$%^&*]/.test(password)) setSignError('you should a special character');

        loginUser(email, password)
            .then((result) => {
                console.log(result);

                setSignSuccess('User Created successfully!');
                e.target.reset();

                Swal.fire({
                    icon: 'success',
                    title: 'Sign In Successful',
                    text: 'You have successfully signed in!'
                });
                registerNavi('/');
            })
            .catch((error) => {
                console.error(error);
                setSignError(error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Sign In Failed',
                    text: 'An error occurred during sign in. Please try again.'
                });
            });
    };

    const handleGoogle = () => {
        signInWithGoogle()
            .then((result) => {
                const userInfo = {
                    name: result.user.displayName,
                    email: result.user.email,
                    imageURL: result.user.photoURL
                };

                axiosPublic
                    .post(`/users`, userInfo)

                    .then((res) => {
                        console.log(res);
                        if (res) {
                            console.log('user added to the database');

                            Swal.fire({
                                icon: 'success',
                                title: 'Login Successful',
                                text: 'You have successfully logged in!'
                            });
                            registerNavi('/');
                        }
                    });
            })

            .catch((error) => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Sign In Failed',
                    text: 'An error occurred during sign in. Please try again.'
                });
            });
    };

    return (
        <div>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="max-w-4xl w-full mx-auto bg-white lg:p-8 p-2 border border-gray-200 rounded-lg shadow-lg flex overflow-hidden items-center">
                    <div className="lg:w-3/5 md:p-8 p-1">
                        <h1 className="text-2xl font-bold mb-2">ExperimentsLabs</h1>
                        <h2 className="text-xl mb-8">Login to your Account</h2>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">User Email</label>
                                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="User email" type="email" name="email" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">User Password</label>
                                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="User password" type="password" name="password" />
                            </div>
                            <button className="btn bg-[#0360D9] text-white w-full">Log in</button>

                            <div className="mt-4 gap-10">
                                <button onClick={handleGoogle} type="button" className="btn bg-[#0360D9] text-white w-full">
                                    <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                                        <path
                                            d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                                            fill="#EB4335"
                                        />
                                    </svg>
                                    Login with Google
                                </button>
                            </div>
                        </form>

                        {signError && <p className="mx-8 text-red-600">{signError}</p>}
                        {signSuccess && <p className="mx-8 text-green-600">{signSuccess}</p>}

                        <div className="mt-6 flex flex-col space-y-2">
                            <Link className="text-sm" href="#">
                                Don't have an account?<Link to="/register"> Register here</Link>
                            </Link>
                        </div>
                        <p className="mt-6 text-xs text-gray-600">
                            By logging into the Prominent application you are agreeing to the{' '}
                            <Link className="text-blue-600" href="#">
                                Terms &amp; Conditions
                            </Link>
                            .
                        </p>
                    </div>
                    <div className="w-2/5  p-8  items-center justify-center lg:block hidden">
                        <Lottie animationData={loginAnimation}></Lottie>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
