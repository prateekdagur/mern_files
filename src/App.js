import React, {useState, useEffect} from "react";
import "./App.css";
import Axios from "axios";

function App() {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [profile_image, setProfile_image] = useState('');
const [newName, setNewName] = useState('')
//const [message, setMessage] = useState('')

const [userList, setUserList] = useState([]);

useEffect(() =>{
  Axios.get("http://localhost:5000/get").then((response) => {
   setUserList(response.data);
  });
}, []);

// const onChangeFile = (e) => {
//   setFile(e.target.files[0]);
// }

const submit = () => {

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("profile_image", profile_image);


// Axios.post("http://localhost:5000/create_profile", {
//    name: name,
//    email: email,
// });

Axios.post("http://localhost:5000/create_profile", formData)
.then((res) => (res.data)).catch((err)=> {
  console.log(err);
})

setUserList([
  ...userList, {name: name, email: email, profile_image: profile_image}
])
}

const updateUser = (email) => {
  Axios.put("http://localhost:5000/update", {
    email: email,
    name: newName
 });
   setNewName("")
  }

  const DeleteUser = (emails) => {
    Axios.delete(`http://localhost:5000/delete/${emails}`, {
    });
    }
  
  return (
    <div className="App">
      <h1>Create Profile</h1>

      <label>Name:</label>
      <input type = "text" onChange={(event)=> {setName(event.target.value)}}/>
      <label>Email:</label>
      <input type = "text" onChange={(event)=> {setEmail(event.target.value)}}/>
      <label>Choose file:</label>
      <input type = "file" filename = "profile_image" onChange={(event)=> {
        console.log(event.target.files[0])
        setProfile_image(event.target.files)}}/>
      <button onClick={submit} encType="multipart/form-data">submit entry</button>

      <h1>User Data</h1>
      {userList.map((val, key) => {
       return <div className="card"> <h2> Name: {val.name}</h2> <h2> Email: {val.email}</h2> <h2> Profile_image: {val.profile_image}</h2> 

       <input type = "text" placeholder = "new user name..." onChange={(event)=> {setNewName(event.target.value)}}/>
       <button onClick={()=>updateUser(val.email)}>Update User</button>
       <button onClick={()=>DeleteUser(val.email)}>Delete User</button>
      
       </div>
      })}

    </div>
  );
}

export default App;