import { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from 'firebase/auth'
import auth from '../firebase'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const handleSignup = ( email, password ) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const handleSignout = () => {
        return signOut(auth)
    }

    const handleLogIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const resetPasswordHandle = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const updateUserEmailHandle = (email) => {
        return updateEmail(auth.currentUser, email)
    }

    const updateUserPasswordHandle = (password) => {
        return updatePassword(auth.currentUser, password)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        } )
    
        return () => {
            unSubscribe()
        }
    }, [])
    

    return (
        <AuthContext.Provider value={{ currentUser, handleSignup, handleSignout, handleLogIn, resetPasswordHandle, updateUserEmailHandle, updateUserPasswordHandle }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}