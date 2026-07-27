import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

function Navbar() {
    const {user, logout} = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        toast.success("Logout successful")
        navigate("/login")
    }

    

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <div>
             <h1 className="text-2xl font-bold text-blue-600">
      Lead Manager
    </h1>
    <p className="text-sm text-gray-500">
      Dashboard
    </p>
        </div>
        <div className="flex items-center gap-6">
                <div className="text-right">
      <p className="text-sm text-gray-500">
        Welcome,
      </p>

      <h3 className="font-semibold text-gray-800">
        {user?.name}
      </h3>
    </div>

    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium capitalize">
      {user?.role}
    </span>
        <button onClick={handleLogout}
        className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition"
        >
            Logout
        </button>

            </div>
    </nav>
  )
}

export default Navbar