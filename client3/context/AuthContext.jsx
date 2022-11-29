import { useState, createContext } from "react";


export const AuthContext = createContext()

export default function AuthProvider({children}) {
    const [auth, setAuth] = useState(false)
    function authenticateUser() {
        setAuth(true)
    }
    return (
        <AuthContext.Provider value={{auth, authenticateUser}}>
            {children}
        </AuthContext.Provider>
    )
}