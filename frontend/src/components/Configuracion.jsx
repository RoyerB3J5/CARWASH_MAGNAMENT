import  { useEffect, useState } from 'react'
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Configuracion() {
  const [services, setServices] = useState()
  const [callApi,setCallApi] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(()=>{
    
    const fetchServices = async ()=>{
      setLoading(true)
      try{
        const res = await fetch('http://localhost:5555/services/')
        const newData = await res.json()
        setServices(newData)
        setLoading(false)
      }catch {
        console.log('Error al obtener los datos')
      }
    }
    fetchServices()
  },[callApi])

  const deleteVehicle = async (vehicleType) =>{
    try{
      const res = await fetch(`http://localhost:5555/services/${vehicleType}`,{
        method:'DELETE'
      })
      if(!res.ok) throw new Error('Respuesta de la API no fue exitosa')
  
    } catch(error){
      console.error('Error al eliminar el vehiculo')
    }

    setTimeout(()=>setCallApi(!callApi),500)
  }

  return (
    <main className="flex-1 flex flex-col h-auto py-12 px-5 pb-10 md:px-20 sm:py-14 sm:px-14 sm:ml-20 sm:pb-12 transition-all w-full gap-6 overflow-y-auto">
      <h2 className=" text-center font-semibold text-2xl">Configuración de vehículos</h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
          </div>
        ):null}
        {services && services.map((service)=>{ return (
          <section className=" relative flex bg-slate-200 rounded-md w-full h-auto py-9 px-6 sm:px-16 flex-col gap-6 mb-8" key={service._id}> 
            <div className=" flex flex-col sm:flex-row justify-between items-center gap-3">
              <h3 className="text-h4 font-normal"> {service.vehicleType}</h3>
              <div className=' flex gap-4 justify-center items-center'>
                <button className="bg-accent p-2 rounded-md" onClick={()=>navigate(`/configure/${service.vehicleType}`)}>Agregar lavado</button>
                <FaTrash className=' text-red-800 h-5 hover:cursor-pointer' onClick={()=>deleteVehicle(service.vehicleType)}/>
              </div>
              
            </div>
            <div className=" overflow-x-auto w-full ">
              <table className="w-[800px] md:w-full table-fixed">
                <thead className="bg-gray-400 text-white">
                  <tr>
                    <th className="border border-black py-3 w-1/4">N</th>
                    <th className="border border-black py-3 w-1/4">Lavado</th>
                    <th className="border border-black py-3 w-1/4"> Precio (S/.)</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {service.service.map((stype,index)=>{return(
                    <tr key={stype._id}>
                      <th className="border border-black py-3 whitespace-normal break-words uppercase">{index+1}</th>
                      <th className="border border-black py-3 whitespace-normal break-words uppercase">{stype.nameService}</th>
                      <th className="border border-black py-3 whitespace-normal break-words uppercase">{stype.price}</th>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          </section>
        )})}
      <button className=' bg-primary p-2 rounded-md text-white font-medium' onClick={()=>navigate('/configure/new')}>+ Nuevo Vehiculo</button>
      <br />

    </main>
  )
}

export default Configuracion