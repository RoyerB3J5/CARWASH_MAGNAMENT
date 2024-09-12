import { useEffect, useState } from "react";
function Principal() {
  const [data, setData] = useState({
    name:"",
    lastname:"",
    phone:"",
    vehicle:"",
    wash:"",
    plate:"",
    price:0,
    finished:false,  
  })
  const [dataServices, setDataServices] = useState(null)
  const [dialogVisible, setDialogVisible] = useState(false)
  const [carWash, setCarWash] = useState(false)
  const [usersFalse, setUsersFalse] = useState({})
  const [services, setServices] = useState(null)

  useEffect(()=>{
    const callData = async () =>{
      if (!data.vehicle) return;
      try{
        const response = await fetch(`http://localhost:5555/services/${data.vehicle}`)
        if (!response.ok) throw new Error('Respuesta de la API no fue exitosa');
        const newData = await response.json()
        setDataServices(newData)
      }catch (error){
        console.log(error)
      }
    }
    if (data.vehicle){
      callData()
    }    
  },[data.vehicle])


  function handleChangeData(e){
    const {id,value} = e.target 
    
    setData({
      ...data,
      [id]:value
    })
    if (id === "wash" && dataServices) {
      const selectedService = dataServices.service.find(service => service.nameService === value);
      if (selectedService) {
        setData(prevData => ({
          ...prevData,
          price: selectedService.price 
        }));
      }
    }
  }

  async function handleSubmit(e){
    e.preventDefault()
    if(data.name === "" || data.lastname === "" || data.phone === null || data.vehicle === "" || data.wash === "" || data.plate === "") return alert("Por favor llene todos los campos")
    try{
      const res = await fetch(`http://localhost:5555/users/`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
          'Content-Type':'application/json'
        }
      })
      if (!res.ok) throw new Error('Respuesta de la API no fue exitosa');
      setDialogVisible(true)
      setTimeout(()=> setDialogVisible(false),800)
      setCarWash(!carWash)
    }catch(error){
      console.log("Error al enviar los datos",error)
    }

    setData({
      name:"",
      lastname:"",
      phone:"",
      vehicle:"",
      wash:"",
      plate:"",
      price:0,
      finished:false,  
    })
  }

  useEffect(()=>{
    const callData = async ()=>{
      try{
        const res = await fetch(`http://localhost:5555/users/unfinished`)
        const newData = await res.json()
        setUsersFalse(newData.data)
      }catch{
        console.log("Error al obtener los datos")
      }
    }
    callData()
  },[carWash])

  const sendMessage = async (to,name)=>{
    try{
      const res = await fetch(`http://localhost:5555/send-message`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({to:to,name:name})
      })
      
      if(!res.ok) throw new Error('Respuesta de la API no fue exitosa');
    } catch{
      console.error("Error al enviar el mensaje")
    }
  }
  const handleUsers = async (id) =>{
    
    try{
      const res = await fetch(`http://localhost:5555/users/${id}`,{
        method:"PATCH",
        body:JSON.stringify({finished:true}),
        headers:{
          'Content-Type':'application/json'
        }
      })
      if(!res.ok) throw new Error('Respuesta de la API no fue exitosa');
      
    }catch(error){
      console.error("Error en la actualizacion de datos")
    }

    setCarWash(!carWash)
  } 

  useEffect(()=>{
    const callData = async ()=>{
      try{
        const res = await fetch(`http://localhost:5555/services`)
        const newData = await res.json()
        setServices(newData)
      }catch{
        console.log("Error al obtener los datos")
      }
    }
    callData()
 
  },[])

  return (
    <div className=" flex-1 flex flex-col gap-6 h-auto py-12 px-8 pb-20 md:px-20 sm:py-14 sm:px-14 sm:ml-20 sm:pb-12 overflow-y-auto transition-all">
      <section className=" relative flex bg-slate-200 rounded-md w-full h-auto py-9 px-12 flex-col gap-6">
        {dialogVisible && (
          <div className="absolute bg-white rounded-lg border-4 border-primary px-8 py-6 z-20 shadow-2xl top-0 right-0 transition-all ">
            <p>El carro ha sido ingresado correctamente...</p>
          </div>
        )}
        <h3 className="text-h4 font-normal">Ingresar Carro:</h3>
        <form action="" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <input type="text" placeholder="Nombre" className="p-2 rounded-md uppercase" id="name" onChange={handleChangeData} value={data.name}/>
          <input type="text" placeholder="Apellido" className="p-2 rounded-md uppercase" id="lastname" onChange={handleChangeData} value={data.lastname}/>
          <input type="tel" placeholder="Celular" className="p-2 rounded-md bg-white " id="phone" onChange={handleChangeData} value={data.phone}/>
          <input type="text" placeholder="Placa del carro" className="p-2 rounded-md uppercase" id="plate" onChange={handleChangeData} value={data.plate}/>
          <select name="vehicle" id="vehicle" className="p-2 rounded-md" onChange={handleChangeData} value={data.vehicle}>
            <option value=" ">
              Tipo de vehículo
            </option>
            {services && services.map((service)=>{
              return <option value={service.vehicleType} key={service._id}>{service.vehicleType}</option>
            })}
          </select>
          <select name="wash" id="wash" className="p-2 rounded-md" onChange={handleChangeData} value={data.wash}>
            <option value=" ">
              Tipo de lavado
            </option>
            { dataServices && dataServices.service && dataServices.service.map((service)=>{
              return <option value = {service.nameService} key={service._id}>{service.nameService}</option>
            })}
          </select>
        </form>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <p>Precio:</p>
            <p>S/ {data.price}</p>
          </div>
          <button className="py-2 px-4 bg-accent rounded-lg text-p font-semibold" onClick={handleSubmit}>Guardar</button>
        </div>
      </section>
      <section className="flex bg-slate-200 rounded-md w-full h-auto py-9 px-12 flex-col gap-6">
        <h3 className="text-h4 font-normal">Carros en lavado...</h3>
        <div className=" overflow-x-auto w-full ">
          <table className="w-[800px] md:w-full table-fixed">
            <thead className="bg-gray-400">
              <tr>
                <th className="border border-black py-3 w-1/4">Nombre</th>
                <th className="border border-black py-3 w-1/4">Placa</th>
                <th className="border border-black py-3 w-1/4">Vehículo</th>
                <th className="border border-black py-3 w-1/4">Tipo de lavado</th>
                <th className="border border-black py-3 w-1/4">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {usersFalse.length > 0 ? usersFalse.map((user)=>{
                return ( 
                <tr key={user._id}>
                  <td className="border border-black px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis uppercase">{user.name}</td>
                  <td className="border border-black px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis uppercase">{user.plate}</td>
                  <td className="border border-black px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis">{user.vehicle}</td>
                  <td className="border border-black py-3 whitespace-nowrap overflow-hidden text-ellipsis">{user.wash}</td>
                  <td className="border border-black py-3">
                    <button className="bg-accent text-p px-2 py-1 rounded-lg font-semibold" onClick={()=>handleUsers(user._id,user.phone,user.name)}>Terminado</button>
                  </td>
                </tr>)
              }) : <tr>
                <td colSpan="5" className="border border-black py-3">No hay carros en lavado</td>
                </tr>}
          
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Principal;
