import React,{useState ,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const FormEditUser = () => {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confPassword,setConfPassword] = useState("")
  const [role,setRole] = useState("")
  const [msg,setMsg] = useState("")
  const navigate = useNavigate();
  const{id} = useParams();

   useEffect(()=>{
    const getUserById = async () =>{
      try {
         const response = await axios.get(`http://localhost:5000/users/${id}`);
         setName(response.data.name);
         setEmail(response.data.email);
         setRole(response.data.role);
      } catch (error) {
        if(error.response){
          setMsg(error.response.data.msg)
        }
      }
    }
    getUserById();
   },[id])

   const updateUser = async(e) => {
       e.preventDefault();
       try {
          await axios.patch(`http://localhost:5000/users/${id}`,{
            name:name,
            email:email,
            password:password,
            confPassword:confPassword,
            role:role
          })
          navigate("/users")
       } catch (error) {
        if(error.response){
          setMsg(error.response.data.msg)
        }
       }
   }
 
  return (
    <div>
      <h1 className='title'>Users</h1>
      <h2 className='subtitle'>Update User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">

          <form onSubmit={updateUser}>
            <p className='has-text-centered'>{msg}</p>
            {/* Name */}
          <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input type="text" className='input' value={name}  onChange={(e)=> setName(e.target.value)} placeholder='Name'/>
                </div>
              </div>

              {/* Email */}
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input type="text" className='input' value={email}  onChange={(e)=> setEmail(e.target.value)}  placeholder='Email'/>
                </div>
              </div>

              {/* password */}
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input type="password" className='input' value={password}  onChange={(e)=> setPassword(e.target.value)}  placeholder='******'/>
                </div>
              </div>

              {/* ConfPassword */}
              <div className="field">
                <label className="label">ConfPassword</label>
                <div className="control">
                  <input type="password" className='input' value={confPassword}  onChange={(e)=> setConfPassword(e.target.value)}  placeholder='******'/>
                </div>
              </div>

              {/* Role */}
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                    <div className="select is-fullwidth">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select role</option>
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                    </div>
                </div>
              </div>

              {/* button */}
              <div className="field mt-5">
                <div className="control">
                <button type="submit" className='button is-success'>update</button>
                </div>
              </div>
         </form>

          </div>
        </div>
      </div>
    </div>
  )
}
export default FormEditUser
 