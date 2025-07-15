import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      {/* Logo / Brand */}
      <Link to="/" className="text-2xl font-bold text-gray-800 font-josefin">
        Event.<span className="text-black">CO</span>
      </Link>

      {/* Buttons */}
      <div className="space-x-4">
        <Link to="/auth/register">
          <button className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700">
            Register Here
          </button>
        </Link>
        <Link to="/auth/login">
          <button className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700">
            Login Here
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
