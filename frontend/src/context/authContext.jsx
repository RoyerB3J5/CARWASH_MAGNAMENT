import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../config/fireAuth'
import { signInWithEmailAndPassword,onAuthStateChanged,signOut } from 'firebase/auth'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [userCurrent, setUserCurrent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const unsuscribe = onAuthStateChanged(auth,user=> {
      if(user){
        setUserCurrent(user),
        localStorage.setItem('token',user.accessToken)
      } else {
        setUserCurrent(null)
        localStorage.removeItem('token')
      }
      setLoading(false)
    } 
    )
    return unsuscribe
  }, [])

  const login = (user,password) =>  {return signInWithEmailAndPassword(auth,user,password)}
  const logout = () => {return  signOut(auth)}
  if (loading) { // Si la autenticación aún se está cargando, mostrar un mensaje de carga
    return <div>Cargando...</div>
  }
  return (
    <AuthContext.Provider value={{userCurrent, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
