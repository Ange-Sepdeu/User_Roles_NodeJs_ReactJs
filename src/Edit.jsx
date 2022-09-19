import React from 'react'
import { useState,useEffect } from 'react';
import './Edit.css'
import {useNavigate,useParams} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
 
const initUser = {
    name: "",
    email: "",
    pass: "",
    status: ""
}
const Edit = () => {
    const [state, setState] = useState(initUser);
    const {id, adminId} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if(id){
        getSingleUser(id)
    }
    }, [id]);

    const getSingleUser = async (id) => {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        if(response.status === 200) {
            setState({...response.data});
        }
    }

    const updateUser = async (data, id) => {
        const response = await axios.put(`http://localhost:5000/user/${id}`, data);
        if(response.status === 200) {
            toast.success(response.data);
        }
    }
    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setState({...state, [name]:value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!state.status) {
           return toast.error('Please fill out the empty field !!');
        }
        updateUser(state, id);
        navigate(`/admin/${adminId}`);
    }
  return (
    <>
    <h2><center>Edit Status of User </center></h2>
    <form style={{
        padding: 15,
        margin: "auto",
        alignContent: "center",
        maxWidth: 800,
    }}  
    onSubmit={handleSubmit}
    >
    
    <br/>
    <br />
    <label htmlFor='name'>Name </label>
        <input 
        type='text' 
        id='name' 
        name='name'
        value={state.name}
        placeholder='Enter name...' 
        onChange={handleInputChange} 
        disabled
        />
<br/>
    <br />
<label htmlFor='email'>Email </label>
        <input 
        type='email' 
        id='email' 
        name='email'
        value={state.email} 
        placeholder='Enter Email...' 
        onChange={handleInputChange} 
        disabled
        />
        <br/>
    <br />
        <label htmlFor='password'>Password </label>
        <input 
        type='password' 
        id='pass' 
        name='pass'
        value={state.pass} 
        placeholder='Enter password...' 
        onChange={handleInputChange} 
        disabled
        />
        <br/>
    <br />
    <label htmlFor='status'>STATUS </label>
    <input id='status' name='status' value={state.status} type='text' onChange={handleInputChange} placeholder='Add Status...' />
    <br/>
    <br />
    <input type='submit' value='Update' />
    </form>
    </>
  )
}

export default Edit