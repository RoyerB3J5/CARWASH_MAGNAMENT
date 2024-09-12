import { useState,useMemo } from "react";
function TableClients({user}){
  const [currentPage, setCurrentPage] = useState(1)
  const itemPerPage = 4
  const currentItems = useMemo(()=>{
    const indexOfLastItem = currentPage*itemPerPage
    const indexOfFirstItem = indexOfLastItem - itemPerPage
    return user ? user.data.slice(indexOfFirstItem,indexOfLastItem):[];
  },[user,currentPage])
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  

  return (
    <>
      <div className="overflow-x-auto w-full">
            <table className="w-[800px] md:w-full table-fixed">
              <thead className="bg-gray-400">
                <tr>
                  <th className="border border-black py-3 ">Nombre</th>
                  <th className="border border-black py-3 ">Vehículo</th>
                  <th className="border border-black py-3 ">Placa</th>
                  <th className="border border-black py-3 ">Lavado</th>
                  <th className="border border-black py-3 ">Pago(S/.)</th>
                  <th className="border border-black py-3 ">Fecha</th>
                </tr>
              </thead>
              
              <tbody className="text-center">
                {currentItems.length ? currentItems.map((u) => {
                  // Formatear la fecha a DD-MM-YYYY
                  const formattedDate = new Date(u.createdAt).toLocaleDateString('es', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  });

                  return (
                    <tr key={u._id}>
                      <td className="border border-black px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis uppercase">{u.name}</td>
                      <td className="border border-black px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis uppercase">{u.vehicle}</td>
                      <td className="border border-black py-3 whitespace-nowrap overflow-hidden text-ellipsis uppercase">{u.plate}</td>
                      <td className="border border-black py-3 whitespace-nowrap overflow-hidden text-ellipsis uppercase">{u.wash}</td>
                      <td className="border border-black py-3 whitespace-nowrap overflow-hidden text-ellipsis">{u.price}</td>
                      <td className="border border-black py-3 whitespace-nowrap overflow-hidden text-ellipsis">{formattedDate}</td>
                    </tr>
                  )
                }) : (
                  <tr>
                    <td colSpan="6" className="border border-black px-4 py-3 text-center">No existe ningun cliente en este rango de fecha</td>
                  </tr>
                )}
              </tbody>
            </table>
            
          </div>
          <div className="flex justify-center mt-4">
          {user && (
            <ul className="flex gap-4 justify-center items-center cursor-pointer ">
              {Array.from({length: Math.ceil(user.length / itemPerPage)}, (_,index)=>(
                <li key={index} className={` text-primary font-bold p-2
                ${currentPage === index + 1 ? ' border-b-2 border-primary text-black' : ''}`}>
                  <button onClick={()=> paginate(index+1)} > 
                    {index+1}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

    </>
  )
}

export default TableClients