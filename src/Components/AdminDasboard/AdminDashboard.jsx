import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataContext } from "../../DataProvider";
import Modal from "../Modal/Modal";

export default function AdminDashBoard() {
  const { usersData, setUsersData } = useContext(dataContext);
  const [isLoading, setIsLoading] = useState(false);

  const [openModel,setOpenModel] = useState(false);

    const [editFlag,setEditFlag] = useState(false);
    const [currentUser,setCurrentUser] = useState({});

  const navigate = useNavigate();

  const handleAddUser = ()=>{
    setOpenModel(true);
    setEditFlag(false);
  }

  const handleEdit = (user) => {
    setOpenModel(true);
    setEditFlag(true);
    setCurrentUser(user);
  };
  const handleDelete = (id) => {
    console.log("Delete Called!!");
    const idx = usersData.findIndex((item)=>item.id === id);
    usersData.splice(idx,1);
    console.log(usersData);
    setUsersData([...usersData]);
  };

  const handleAddOrUpdate = ()=>{
    const last_id = usersData[usersData.length-1].id;
    const obj = {
        id:last_id+1,
        name:currentUser.name,
        email:currentUser.email,
        role:currentUser.role,
        password:'abc123',
    }
    if(!editFlag){
        setUsersData([...usersData,obj]);
    }else{
        const user_idx = usersData.findIndex((item)=>item.id===currentUser.id);
        console.log(user_idx);
        console.log(usersData[user_idx]);
        usersData[user_idx].name = currentUser.name;
        usersData[user_idx].email = currentUser.email;
        usersData[user_idx].role = currentUser.role;
        setUsersData([...usersData]);
        setEditFlag(false);
        setCurrentUser({});
    }
    setOpenModel(false);
  }

  return (
    <div>
      <div
        className="d_flex"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <h1>Admin Dashboard</h1>
        <button onClick={() => navigate("/")} style={{ padding: "5px" }}>
          Logout
        </button>
      </div>
      <div>
        <button onClick={handleAddUser}>AddUser</button>
      </div>
      <div
        className="d_flex"
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <table border="1">
            <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {isLoading ? (
            <div>Loading.....</div>
          ) : usersData.length !== 0 ? (
            usersData.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button onClick={()=>handleEdit(item)}>Edit</button>
                    <button onClick={()=>handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <div>No Users Found!!!</div>
          )}
          </tbody>
        </table>
      </div>
      <Modal open={openModel} setOpenModel={setOpenModel}>
        <div style={{
                display:'flex',
                justifyContent:'center',
                flexDirection:'column',
                backgroundColor:'white',
                padding:'20px',
            }} onClick={(e)=>e.stopPropagation()}>
                <div>
                    <div><p>Name:</p>
            <input type="text" value={currentUser.name} onChange={(e)=>setCurrentUser({...currentUser,name:e.target.value})} />
            </div>
            <div><p>email</p>
            <input type="email" value={currentUser.email} onChange={(e)=>setCurrentUser({...currentUser,email:e.target.value})} />
            </div>
            <div><p>Role</p>
            <input type="text" value={currentUser.role} onChange={(e)=>setCurrentUser({...currentUser,role:e.target.value})} />
            </div>
            
            <button style={{marginTop:'20px'}} onClick={handleAddOrUpdate}>Add/Update</button>
 
                </div>
                
            </div>
      </Modal>
    </div>
  );
}
