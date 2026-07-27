import { createContext, useContext, } from "react"
import { jwtDecode } from "jwt-decode"
import { useState } from "react"
import { useEffect } from "react"

const Authcontext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token){
            try {
                const decoded = jwtDecode(token)
                setUser(decoded)
            } catch (error) {
                console.log(error);
                localStorage.removeItem("token")
            }
        }
        setLoading(false)
    },[])

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <Authcontext.Provider value={{ user, setUser, logout, loading}}>
            {children}
        </Authcontext.Provider>
    )
}

export const useAuth = () => useContext(Authcontext)