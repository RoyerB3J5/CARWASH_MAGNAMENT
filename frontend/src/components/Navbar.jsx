import { FaHome } from "react-icons/fa";
import { HiUsers, HiOutlineCog6Tooth } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext"

function Navbar() {
  const navigate = useNavigate()
  const {logout} = useAuth()
  const goUsers = ()=> {
    navigate('/users')
  }
  const goHome = () =>{
    navigate('/dashboard')
  }
  const goConfig = () =>{
    navigate('/configure')
  }
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirige al usuario a la página de inicio de sesión después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  return (
    <section className=" fixed bottom-0 w-full sm:w-auto sm:top-0 l-0 sm:h-full bg-primary z-20 px-6 py-5 sm:px-7 sm:py-10 text-2xl text-white font-bold flex sm:flex-col items-center justify-between sm:items-start">
      <div className="flex flex-row items-center sm:flex-col gap-y-6 gap-x-6">
        <FaHome className="hover:cursor-pointer" title="Inicio" onClick = {goHome}/>
        <HiUsers className="hover:cursor-pointer" title="Clientes" onClick={goUsers}/>
        <HiOutlineCog6Tooth className="hover:cursor-pointer" title="Clientes" onClick={goConfig}/>
        
      </div>
      <CiLogout className="hover:cursor-pointer" title ="Salir" onClick={handleLogout}/>

    </section>
  )
}

export default Navbar