import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext';
import AuthService from '../Services/AuthService';
import '../styles/admin.css'

import Tabla from '../Components/admin/tabla'
import Nose2 from '../Components/admin/nose2'
import Nose1 from '../Components/admin/nose1'
import Entradas from '../Components/admin/entradas-2'

import b1 from '../images/boton1.svg'
import b2 from '../images/boton2.svg'
import b3 from '../images/boton3.svg'
import b4 from '../images/boton4.svg'
const Admin = props => {
  const { user } = useContext(AuthContext);

  const setAll = () =>{
    setTabla(false)
    setEntradas(false)
    setNose1(false)
    setNose2(false)
  }
  const showTabla = () =>{
    setAll()
    setTabla(true)
    console.log("tabla")
  }
  const showEntradas = () =>{
    setAll()
    setEntradas(true)
  }
  const showNose1 = () =>{
    setAll()
    setNose1(true)
  }
  const showNose2 = () =>{
    setAll()
    setNose2(true)
  }

  const [tabla,setTabla] = useState(true)
  const [entradas,setEntradas] = useState(false)
  const [nose1,setNose1] = useState(false)
  const [nose2,setNose2] = useState(false)

  return (
    <>
    <div className="botonera-admin" style ={{marginBottom:'80px'}}>
      <div id="b1" onClick={() => showTabla()}> <img src={b1} alt="boton1"/> </div>
      <div id="b2" onClick={() => showEntradas()}><img src={b2} alt="boton2"/></div>
      <div id="b3" onClick={() => showNose1()}><img src={b3} alt="boton3"/></div>
      <div id="b4" onClick={() => showNose2()}><img src={b4} alt="boton4"/></div>
    </div>
      
    {tabla ? (<Tabla/>) : (entradas ? (<Entradas user = {user}/>) : (nose1 ? (<Nose1/>) : (nose2 ? (<Nose2/>) : (null)) ))}
    </>
  )
}
export default Admin
