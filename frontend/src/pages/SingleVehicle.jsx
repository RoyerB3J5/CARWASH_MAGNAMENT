import { useParams } from 'react-router-dom'
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import NewVehicleForm from '../components/NewVehicleForm';

function SingleVehicle() {
  const {vehicleType} = useParams()
  const [service, setService] = useState(null)
  const navigate = useNavigate()
  
  useEffect(()=>{
    const fetchVehicleService = async ()=>{
      try{
        const res = await fetch(`http://localhost:5555/services/${vehicleType}`)
        const data = await res.json()
        setService(data)

      } catch {
        console.log('Error al obtener los datos')
      }
    }

    fetchVehicleService()
  },[vehicleType])

  const updateService = async () =>{
    const serviceUpdate = service.service.map(({_id, ...rest}) => rest) 
    try{
      const res = await fetch(`http://localhost:5555/services/${vehicleType}`,{
        method:"PUT",
        body:JSON.stringify({service:serviceUpdate}),
        headers:{
          'Content-Type':'application/json'
        }
      })
      if (!res.ok) throw new Error('Respuesta de la API no fue exitosa');
      const updatedData = await res.json();
      setService(updatedData);
    } catch (error){
      console.log("Error al enviar los datos",error)
  }}
  return (
    <main className="flex w-auto overflow-x-hidden overflow-y-auto">
      <section className=" relative flex flex-col h-auto py-12 px-8 pb-20 md:px-20 sm:py-14 sm:px-14 sm:ml-20 sm:pb-12 transition-all w-full gap-6">
        <FaArrowCircleLeft className=' absolute z-10 text-primary text-xl hover:cursor-pointer' onClick={()=>navigate('/configure')}/>
        {service && 
          (
          <> 
            <h2 className=' text-center text-xl font-semibold'>Servicios de {service.vehicleType}</h2>
            <div className=' flex justify-around items-center '>
              <p>Nombre</p>
              <p>Precio (S/.)</p>
            </div>
            <NewVehicleForm service={service} setService={setService} updateService={updateService}/>
          </>)
        }
      </section>
    </main>
  )
}

export default SingleVehicle