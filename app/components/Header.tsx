import { FaSearch, FaUser, FaBell } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="bg-green-500 p-4 rounded-lg shadow-md flex items-center justify-between">
      {/* Notification Icon */}
      <div className="text-white font-semibold text-lg">
        <FaBell className="hover:text-gray-200 cursor-pointer" />
      </div>
      
      {/* Links */}
      <div className="hidden md:flex space-x-8 text-white font-medium">
        {/* Adicione seus links aqui */}
      </div>
      
      {/* Icons */}
      <div className="flex space-x-4 text-white">
        <FaSearch className="hover:text-gray-200 cursor-pointer" />
        <FaUser className="hover:text-gray-200 cursor-pointer" />
      </div>
    </nav>
  );
}