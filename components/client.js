import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';

export default function Client(){

  //Hook para cargar clientes
const [data, setData] = useState([]);
const [isLoading, setLoading] = useState(false)
const [showModal, setShowModal] = useState(false)
const [showModalEdit, setShowModalEdit] = useState(false)
const [showModalDell, setShowModalDell] = useState(false)


  //Hook para abrir y cerrar Modal
const [modalInsertar, setModalInsertar] = useState(false)
const [modalEditar, setModalEditar] = useState(false)
const [modalEliminar, setModalEliminar] = useState(false)


const abrirCerrarModalInsertar=()=>{
  setModalInsertar(!modalInsertar);
}

const abrirCerrarModalEditar=()=>{
  setModalEditar(!modalEditar);
}

const abrirCerrarModalEliminar=()=>{
  setModalEliminar(!modalEliminar);
}

const seleccionarCliente=(client,caso)=>{

  setClientSelecc(client);
  (caso ==='Editar') &&  setShowModalEdit(true)
   
}

const seleccionarClienteEditar=(client,caso)=>{
  setClientSelecc(client);
  (caso ==='Eliminar') &&  setModalEliminar(true)
   
}

//Hook para atrapar lo que escribe el usuario
const [seleccClient, setClientSelecc] =useState({
  nombre: '',
  apellido: '',
  carne: ''
});

//Evento para capturar lo que el usuario escibe
const handleChange=e=>{
  setClientSelecc(seleccClient=>({
            ...seleccClient,
            [e.target.name] : e.target.value,
        }));  
        console.log(e.target.value);
}

//Conectar al server para traer los clientes
useEffect(()=>{
  setLoading(true)
const peticionGet=async()=>{
  await axios.get('/users')
  .then((response) => {
    setData(response.data);
    setLoading(false)
  });
}
 peticionGet()
}, [])

if (isLoading) return <p>Loading...</p>
if (!data) return <p>No profile data</p>


//Adicionar datos de un cliente a la BD 
const peticionesPost=async()=>{
  await axios.post('/users',seleccClient)
 .then((response) => {
   console.log(response);
   console.log(response.data);
   //peticionGet(); 
   abrirCerrarModalInsertar();
   
 });
}

//Modificar un elemento
const peticionesPatch=async()=>{
  await axios.patch(`/users/${seleccClient._id}`,seleccClient)
 .then((response) => {
  console.log(response);
  console.log(response.data);
//peticionGet();
  //abrirCerrarModalEditar();   
 });
}

//Eliminar datos de un cliente de la BD 
const peticionesDell=async()=>{  
   await axios.delete(`/users/${seleccClient._id}`)
    .then(response=> {
      console.log(response);  
      console.log(response.data);
    //peticionGet();
    //abrirCerrarModalEliminar();
    });    
}

  //Insertar datos dentro de la ventana
  const bodyInsertar=(
    <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
            <input  label="Nombre" onChange ={handleChange}  name="nombre" type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
        </div>
        <div>
            <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos</label>
            <input  label="Apellidos" onChange ={handleChange}  name="apellido" type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
        </div>

        <div>
            <label for="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Carne</label>
            <input  label="Carne" onChange ={handleChange}  name="carne" type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
        </div>

        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
        </span>

       <div>
             <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={peticionesPost}                    
                  >
                    Save Changes
                  </button>
                </div>
             </div>
          </div> 
 )

 //Editar datos dentro de la ventana
 const bodyEditar=(
  <div className="grid gap-6 mb-6 md:grid-cols-2">
      <div>
          <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
          <input  label="Nombre" onChange ={handleChange}  name="nombre" value={seleccClient && seleccClient.nombre} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
      </div>
      <div>
          <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos</label>
          <input  label="Apellidos" onChange ={handleChange}  name="apellido" value={seleccClient && seleccClient.apellido} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
      </div>

      <div>
          <label for="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Carne</label>
          <input  label="Carne" onChange ={handleChange}  name="carne" value={seleccClient && seleccClient.carne} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
      </div>

      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
      </span>

     <div>
           <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModalEdit(false)}
                >
                  Close
                </button>
                <button onClick={peticionesPatch}
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button">
                  Save Changes
                </button>
              </div>
           </div>
        </div> 
)


const bodyDell=(
  <div >      
   <p class="mb-3 font-light text-gray-500 dark:text-gray-400"><u class="underline"/>Está seguro que deseas eliminar a {seleccClient && seleccClient.nombre} </p>
   <button type="button" onClick={peticionesDell} class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"> Si </button>
   <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModalDell(false)}
                >
                  Close
    </button>    

  </div>      
)

   return (
   <div>
    <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Insertar
      </button>
    <div className="flex ...">      
    <div className="contents">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="py-3 px-6">
                      Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Last name 
                  </th>
                  <th scope="col" className="py-3 px-6">
                      number
                  </th>                  
              </tr>
          </thead>
          <tbody>
              {data.map(raw=> (
                <tr key={raw._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td width='40%' className="py-4 px-6">{raw.nombre}</td>
                <td width='20%' className="py-4 px-6">{raw.apellido}</td>
                <td width='20%' className="py-4 px-6">{raw.carne}</td>
                <td className="py-4 px-6">
                <a onClick={()=>seleccionarCliente(raw,'Editar',setShowModalEdit(true))} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                <a onClick={()=>seleccionarCliente(raw,'Eliminar',setShowModalDell(true))} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Eliminar</a>
                </td>                
            </tr>                                        
              ))}                  
          </tbody>
      </table>
  </div>  
  </div>

  {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Insertar Cientes
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {bodyInsertar}               
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

    {showModalEdit ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Editar Cientes
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalEdit(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {bodyEditar}               
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>        
      ) : null}

{showModalDell ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Dell
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalEdit(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {bodyDell}               
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>        
      ) : null}
</div>
  )
}

