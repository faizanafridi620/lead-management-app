import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast'
import { loginUser } from '../services/authService'
import { useAuth } from "../context/AuthContext"
import { useState } from 'react'

function Login() {
    const { setUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)

            const {data} = await loginUser(formData)
            localStorage.setItem("token", data.token)
            // console.log(data);
            

            setUser(jwtDecode(data.token))
            toast.success("Login successful") 
            navigate("/dashboard")
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed")
            console.log(error);
            
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
         <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue to Lead Manager
          </p>
          </div>
        <form onSubmit={handleSubmit}
        className="w-96 space-y-5"
        >
            <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input type="email" 
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input type="password" 
            name="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
            </div>

            <button
            disabled={loading}
             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
            >
                {loading? "Logging in..." : "Login"}
            </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </div>
        </div>
    </div>
  )
}

export default Login