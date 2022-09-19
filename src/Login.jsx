import React, {useState} from 'react'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
const [id, setId] = useState('');
const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  if(!id){
    return toast.error("Enter your id");
  }
  checkId(id);
}

const checkId = async(id) => {
  const response = await axios.get(`http://localhost:5000/users/${id}`);
  if(response.status === 200) {
    toast.success("Welcome");
    navigate(`/admin/${id}`);
    return;
  }
  else toast.error("ID doesn't exist!!");
}
  return (
    <>
    <h1>LOGIN</h1>
        <form method="post" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="id" className="form-label">ID:</label>
                <input type="text" value={id} onChange={(e)=>setId(e.target.value)} className="form-control" name="id" id="id" aria-describedby="idHelp"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
    </>
  )
}

export default Login