import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { dataContext } from "../../DataProvider";

export default function Login(){

    const {usersData} = useContext(dataContext);

    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');

    const [errMsg,setErrMsg] = useState('');

    const navigate = useNavigate();

    const handleLogin = ()=>{
        setErrMsg('');
        const user = usersData.find((item)=>item.username === userName && item.password === password);
        // if(userName === 'admin' && password === 'admin'){
        //     navigate('/admin');
        // }else{
        //     navigate('/user');
        // }
        if(user){
            if(user.role === 'admin'){
                navigate('/admin');
            }else{
                navigate('/user',{state:{user}});
            }
        }else{
            setErrMsg('User NOt Found!! may be Credentials are Invalid!!');
        }
    }

    return (
        <div className='d_flex' style={{
      justifyContent:'center',
      alignItems:'center',
      height:'100vh',
    }} >
        <div className="d_flex" style={{
            border:'1px solid black',
            flexDirection:'column',
            padding:'10px',
            justifyContent:'center',
        }}>
            <div><p>UserName</p>
            <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} />
            </div>
            <div><p>Password</p>
            <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>

            {errMsg && <div style={{color:'red'}}>{errMsg}</div>}
            
            <button style={{marginTop:'20px'}} onClick={handleLogin}>Login</button>
        </div>
        </div>
    )
}