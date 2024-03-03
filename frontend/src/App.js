import React, { useEffect, useState } from "react";
import AddProfile from "./AddProfile";


function App() {
  const [page_tab, setTabs] = useState(0)
  const [bookList,setStudentList] = useState([])

  const [editID,setEditID] = useState(null)

  const [form,setForm] = useState(
    {
        name:"",
        house:"",
        bloodline:""
    }
)     

useEffect(()=>{
    //console.log(form)
},[form])
 
function updateProfile(key,e){
    const value = e.target.value;
    setForm({
        ...form,
        [key]: value
    })
}

function displayStudentList(){
        
  return(<table border={1}>
      <tr>
          <th>Student Name</th>
          <th>House</th>
          <th>BloodLine</th>
          <th>Actions</th>
      </tr>
      {
          bookList.map(element =>{
              return (
                  <tr>
                      <td>{element.name}</td>
                      <td>{element.house}</td>
                      <td>{element.bloodline}</td>
                      <td>
                          <button onClick={()=>{
                              setEditID(element._id)
                              setForm(element)
                              setTabs(1)
                          }}>
                              Update
                          </button>
                          <button className="bg-red" onClick={()=>{
                              deleteBook(element._id)                         
                          }}>
                              Delete
                          </button>
                      </td>
                  </tr>
              )
              
              
          })
      }
  
  </table>)
}

async function fetchData(){

  const url = "http://localhost:5000/api/profiles";
  const requestOption = {
      method: "GET",
      headers:{
          "Content-Type": "application/json"
      },           
      async: false 
  }


 fetch(url, requestOption)
  .then((response) => response.json())
  .then((result) => 
  {
      console.log(result);
      setStudentList(result.payload)
  }       
  )
  .catch((error) => console.error(error));
     
}

async function addBooks(){
  const url = "http://localhost:5000/api/profiles"


  const reqBody = {
      authorization:{

      },
      payload:{
          ...form
      }
  }

  const requestOption = {
      method: "POST",
      headers:{
          "Content-Type":"application/json"
      },
      body: JSON.stringify(reqBody)
  }

  fetch(url, requestOption)
  .then((response) => response.json())
  .then((result) => 
  {
      setForm({
          name:"",
          house:"",
          bloodline:""
      })
      fetchData()
      console.log(result);         
  }       
  )
  .catch((error) => console.error(error));
}

function editBooks(){
  const url = `http://localhost:5100/api/editBooks/${editID}`


  const reqBody = {
      authorization:{

      },
      payload:{
          ...form
      }
  }

  const requestOption = {
      method: "POST",
      headers:{
          "Content-Type":"application/json"
      },
      body: JSON.stringify(reqBody)
  }

  fetch(url, requestOption)
  .then((response) => response.json())
  .then((result) => 
  {
      setForm({
          name:"",
          house:"",
          bloodline:""
      })
      fetchData()
      console.log(result);         
  }       
  )
  .catch((error) => console.error(error));
}

function deleteBook(id){
  const url = `http://localhost:5100/api/profiles/${id}`

  const requestOption = {
      method: "POST",
      headers:{
          "Content-Type":"application/json"
      },          
  }

  fetch(url, requestOption)
  .then((response) => response.json())
  .then((result) => 
  {
      setForm({
          name:"",
          house:"",
          bloodline:""
      })
      fetchData()       
  }       
  )
  .catch((error) => console.error(error));
}

  return (
    <div className="App">
      <h1>Hogwarts Student Profile</h1>
      <br></br>
        <br></br>
        <button onClick={()=>{setTabs(0)}}>
            Book List
        </button>
        
        <button className="ml-2" onClick={()=>{setTabs(1);setEditID(null)}}>
            Add Book
        </button>
        
        <br></br>
        {
            page_tab == 0
            ?
            displayStudentList():
            null
        }
        {
             page_tab == 1?
                <AddProfile form= {form} updateForm ={updateProfile} addToList = {addBooks} editID={editID} editBooks= {editBooks} />
                :
                null

        }
    </div>
  );
}

export default App;
