import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from "react"
import NewVehicleForm from "./NewVehicleForm";
function NewVe() {
  const navigate = useNavigate()
  const [service, setService] = useState({
    vehicleType: '',
    service: []
  })
  const updateService = async () => {
    try {
      const response = await fetch('http://localhost:5555/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(service)
      })

      if (response.ok) {
        navigate('/configure')
      }
    } catch (error) {
      console.log(error.message)
  }}

  const handleChange = (e) =>{
    const { id, value } = e.target;
    setService({ ...service, [id]: value });
  }

  return (
    <section className=" relative flex flex-col h-auto py-12 px-8 pb-20 md:px-20 sm:py-14 sm:px-14 sm:ml-20 sm:pb-12 transition-all w-full gap-6">
      <FaArrowCircleLeft className=' absolute z-10 text-primary text-xl hover:cursor-pointer' onClick={()=>navigate('/configure')}/>
      <h2 className=' text-center text-xl font-semibold'>Nuevo vehículo</h2>
      <div className=" bg-slate-200 p-4 w-full rounded-md flex justify-around items-center gap-4">
        <label htmlFor="vehicleType">Vehículo</label>
        <input type="text" id = "vehicleType" className=' p-1 rounded w-full' onChange={(e)=>handleChange(e)} value={service.vehicleType}/>
      </div>
      <NewVehicleForm service={service} setService={setService} updateService={updateService}/>
    </section>
  )
}

export default NewVe