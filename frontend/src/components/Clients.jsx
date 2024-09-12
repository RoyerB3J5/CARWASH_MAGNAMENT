import { useEffect, useState } from 'react'
import TableClients from './TableClients'
function Clients() {
  const currentDate = new Date()
  const formattedCurrentDate = currentDate.toLocaleDateString('en-CA')
  currentDate.setDate(currentDate.getDate()-7)
  const formattedStartDate = currentDate.toLocaleDateString('en-CA')
  
  const [date, setDate] = useState({
    start:formattedStartDate,
    end:formattedCurrentDate,
  })
  const [user,setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleDateChange = (e) =>{
    const {id, value} = e.target
    setDate((prevDate)=>({
      ...prevDate, [id]:value
    }))
  }
  const [price,setPrice] = useState(0)

  const callUsers = async () =>{
    setLoading(true)
    try {
      const startDate = new Date(`${date.start}T00:00:00`);
      const endDate = new Date(`${date.end}T23:59:59`);

      const adjustedDate = {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      };
      const res = await fetch('http://localhost:5555/users/date',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(adjustedDate)
        
      })
      const newData = await res.json()
      setUser(newData) 
      setLoading(false)

    }catch (error){
      console.log(error)
    }
  }
  useEffect(()=>{
    callUsers()
  },[])

  useEffect(() => {
    // Asegurarse de que user y user.data existen y tienen elementos
    if (user && user.data && user.data.length > 0) {
      // Calcular la suma total usando reduce
      const total = user.data.reduce((acc, curr) => acc + curr.price, 0);
      setPrice(total);
    } else {
      // Resetear price a 0 si no hay datos
      setPrice(0);
    }
  }, [user]); // Dependencia: user  


  return (
    <main className="flex h-auto py-12 px-8 pb-20 md:px-20 sm:py-14 sm:px-14 sm:ml-20 sm:pb-12 transition-all">
      <section className="flex bg-slate-200 rounded-md w-full h-auto py-9 px-6 sm:px-12 flex-col gap-3 sm:gap-6">
        <div className="flex  flex-col sm:flex-row justify-between gap-3">
          <h3 className="text-h4 font-semibold">Clientes:</h3>
          <div className="flex items-center gap-2 justify-center">
            <p>Ingresos totales:</p>
            <p className="self-center">S/. {price}</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
          <form action="" className="flex flex-col sm:flex-row justify-center items-center md:gap-12 sm:gap-8">
            <div className="flex flex-col justify-center p-4 gap-3">
              <label htmlFor="start" className=" self-center">Desde:</label>
              <input type='date'id='start' className="self-center p-2 rounded" value={date.start} onChange={handleDateChange} />
            </div>
            <div className="flex flex-col justify-center p-4 gap-3">
              <label htmlFor="end" className=" self-center">Hasta:</label>
              <input type="date" id="end" className="self-center p-2 rounded" onChange={handleDateChange} value={date.end}/>
            </div>
          </form>
          <div className="flex flex-row md:flex-col justify-around sm:justify-center items-center gap-2 sm:gap-5 md:gap-3 ">
            <p className='text-center'>Total de clientes:</p>
            <p className="text-center font-semibold">{user? user.length : 0}</p>
            <button className="bg-accent text-p px-5 py-1 rounded-lg font-semibold ml-4 md:mt-1" onClick={callUsers}>Aplicar</button>
          </div>
          
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
          </div>
        ):<TableClients user={user}/>}

      </section>
    </main>
  )
}

export default Clients