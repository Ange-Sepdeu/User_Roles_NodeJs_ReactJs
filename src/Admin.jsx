import React from 'react'
import { useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import './admin.css'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import axios from 'axios'


const Admin = () => {
 const [user, setUser] = useState([]); 
 const [admin, setAdmin] = useState(''); 
 const [adminId, setAdminId] = useState('');
 let {id} = useParams();
 useEffect(() => {
    getUsers();
  }, []);

    const getUsers = async() => {
    const response = await axios.get("http://localhost:5000/users");
    if(response.status===200){
      const response2 = await axios.get(`http://localhost:5000/users/${id}`);
      if(response2.data === "Admin") {
        const response3 = await axios.get(`http://localhost:5000/other/${id}`);
        const response4 = await axios.get(`http://localhost:5000/user/${id}`);
        setAdmin(response4.data.name)
        setAdminId(response4.data.id)
        setUser(response3.data);
      }      
    }
  }

  const deleteUser = async(id) => {
      if(
        window.confirm("Are you sure you want to delete this user")
      ){
    const response = await axios.delete(`http://localhost:5000/user/${id}`);
    if(response.status===200){
      toast.success(response.data);
      getUsers()
    }
  }
  }
  return (
    <>
    <h2 ><center>Admin Dashboard</center></h2>
    <div style={{marginLeft: '25%', alignContent: 'center'}}>
    <span><b>ACTIVE ADMIN: </b></span><input type='text' style={{border: 'none'}} value={admin} id='admin' name='admin' disabled />
    </div>
    <table className="admin-table">
        <thead>
        <tr>
          <th style={{textAlign: "center"}}>No.</th>
          <th style={{textAlign: "center"}}>NAME</th>
          <th style={{textAlign: "center"}}>EMAIL</th>
          <th style={{textAlign: "center"}}>ID</th>
          <th style={{textAlign: "center"}}>PASSWORD</th>
          <th style={{textAlign: "center"}}>STATUS</th>
          <th style={{textAlign: "center"}}>ACTION</th>
        </tr>
        </thead>
        <tbody>
          {user && user.map((item, index) => {
            return(
              <tr key={index}>
                  <th scope='row'>{index+1}</th>
                  <td >{item.name}</td>
                  <td >{item.email}</td>
                  <td >{item.id}</td>
                  <td >{item.pass}</td>
                  <td >{item.status}</td>
                  <td>
                   <Link to={`/edit/${adminId}/${item.id}`} style={{color: "black", cursor: "pointer"}}>
                    <Tooltip title="Edit"> 
                    <EditIcon /> 
                    </Tooltip> 
                    </Link>
                    <Tooltip title='Delete'>
                    <DeleteIcon style={{cursor: "pointer"}} onClick={()=>deleteUser(item.id)}  />
                    </Tooltip>
                  </td>
              </tr>
            )
          })}
        </tbody>
    </table>
    </>
  )
}

export default Admin