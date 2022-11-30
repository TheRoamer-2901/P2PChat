import { useState, createContext } from "react";


export const AuthContext = createContext()

export default function AuthProvider({children}) {
    const [auth, setAuth] = useState(undefined)
    function authenticateUser(user) {
        setAuth({user})
    }
    return (
        <AuthContext.Provider value={{authUser: auth, authenticateUser}}>
            {children}
        </AuthContext.Provider>
    )
}