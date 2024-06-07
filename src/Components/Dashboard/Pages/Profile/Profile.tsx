import UseAuth from '../../../../Hook/UseAuth.tsx';

const Profile = () => {
    const { user } = UseAuth();

    return (
        <>
            <div  className="divide-y max-w-2xl mx-auto divide-gray-200 pb-28 items-center">
                <div className="py-4">
                    <h2 className="mb-2 lg:text-3xl text-lg my-5 text-center font-semibold">Profile Information</h2>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="relative mt-5 flex h-48 w-48 shrink-0 overflow-hidden rounded-full">
                                <img className="aspect-square h-full w-full" alt="" src={user?.photoURL ? user?.photoURL : 'https://i.ibb.co/QM9mfzB/avatar.png'} />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="py-4">
                    <h2 className="mb-2 text-lg font-semibold">Username</h2>
                    <div className="flex justify-between">
                        <span>{user?.displayName ? user?.displayName : 'User'}</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between">
                    <div className="py-4">
                        <h2 className="mb-2 text-lg font-semibold">Phone Number</h2>
                        <div className="flex justify-between">
                            <span> (123) 456-7890</span>
                        </div>
                    </div>

                    <div className="py-4">
                        <h2 className="mb-2 text-lg font-semibold">Email Address</h2>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span>{user?.email ? user?.email : 'example@info.com'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="py-4">
                    <h2 className="mb-2 text-lg font-semibold">Age</h2>
                    <div className="flex justify-between">
                        <span>{users?.age}</span>
                    </div>
                </div>
                <div className="py-4">
                    <h2 className="mb-2 text-lg font-semibold">Gender</h2>
                    <div className="flex justify-between">
                        <span>{users?.gender}</span>
                    </div>
                </div> */}
                <div className="py-4">
                    <h2 className="mb-2 text-lg font-semibold">Address</h2>
                    <div className="flex justify-between">
                        <span>123 Main St, City, State, 12345</span>
                    </div>
                </div>

                <div className="w-72 mx-auto flex items-center justify-center">
                    <button className="bg-blue-600 text-white p-2 rounded-lg">Update Profile</button>
                 
                </div>
            </div>
        </>
    );
};

export default Profile;
