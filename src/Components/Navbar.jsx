import { Link } from 'react-router-dom';

export function Navbar() {
   

    return (
        <div className="flex justify-between items-center h-[90px] w-full bg-blue-300 p-4 shadow-md ">
            <div>
                <img src="/public/image-removebg-preview (2).png" alt="Logo" className="h-[70px]" />
            </div>

            <div className="flex">
                <Link to="/" className="text-[20px] font-semibold mx-2 ml-10 text-white">
                    Home
                </Link>
                <Link to="/analyze" className="text-[20px] font-semibold mx-2 ml-10 text-white">
                    Analyze
                </Link>
                <Link to='/register'  className="text-[20px] font-semibold mx-2 ml-10 text-white">
                    Register
                </Link>
                <Link to='/login'  className="text-[20px] font-semibold mx-2 ml-10 text-white">
                    Login
                </Link>
            </div>

            <div className="ml-auto">
                <input type="text" placeholder="Search..." className="px-4 py-2 rounded-md border" />
            </div>

            
        </div>
    );
}
