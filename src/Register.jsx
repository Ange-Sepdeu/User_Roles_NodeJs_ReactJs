import React, { useState } from 'react'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const initUser = {
    name: "",
    email: "",
    pass: ""
}

const Register = () => {

    const [input, setInput] = useState(initUser);
    const navigate = useNavigate();
    const updateTable = async (input) => {
        const response = await axios.post(`http://localhost:5000/user`, input);
        if(response.status === 200) {
            toast.success(response.data);
            navigate('/login');
        }        
    }

    const handleInput = (e) => {
        let {name, value} = e.target;
        setInput({...input, [name]: value});
        console.log(input);
    }
    const handleSubmit = (e) => {
            e.preventDefault();
            if(!input.name || !input.email || !input.pass ) {
               return toast.error("Fill the empty fields !!");
            }
        updateTable(input);
    }
    return (
    <>
        <h1>REGISTER</h1>
        <form method="post" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
            <input type="text" value={input.name} onChange={handleInput} className="form-control" name="name" id="username"/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" value={input.email} onChange={handleInput} className="form-control" name="email" id="email" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input value={input.pass} onChange={handleInput} type="password" className="form-control" name="pass" id="password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
    </>
  )
}

export default Register