import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css'

const CRUD = () => {

  const [name , setName]=useState('')
  const [age , setAge]=useState('')
  const [active , setIsActive]=useState(0)

  const [editId , setEditId]=useState('')
  const [editName , setEditName]=useState('')
  const [editAge , setEditAge]=useState('')
  const [editActive , setEditActive]=useState(0)

  // const empdata = [
  //   {
  //     id: 1,
  //     name: "naruto",
  //     age: 25,
  //     isActive: 1,
  //   },
  //   {
  //     id: 2,
  //     name: "luffy",
  //     age: 23,
  //     isActive: 1,
  //   },
  //   {
  //     id: 3,
  //     name: "zoro",
  //     age: 27,
  //     isActive: 1,
  //   },
  // ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState([]);

  const handleOnEdit = (id) => {
    handleShow();
    axios.get(`https://localhost:7137/api/Employee/${id}`)
    .then((result)=>{
      setEditName(result.data.name)
      setEditAge(result.data.age)
      setEditActive(result.data.active)
      setEditId(id)
    })
  };

  const handleOnDelete = (id) => {
    if (window.confirm("Are you sure to delete this employee") == true) {
      axios.delete(`https://localhost:7137/api/Employee/${id}`)
      .then((result)=>{
        if(result.status==200){
           alert("deleted")
        }
      })
    }
  };

  const handleUpdate = () => {
    const url=`https://localhost:7137/api/Employee/${editId}`
    const data={
      "id":editId,
      "name":editName,
      "age":editAge,
      "isActive":editActive
    }

    axios.put(url,data)
    .then((result)=>{
      handleClose()
      getData()
      clear()
      // toast.success('Employee has been added')
    })
  };

  const handleSave=()=>{
    const url="https://localhost:7137/api/Employee"
    const data={
      "name":name,
      "age":age,
      "isActive":active
    }

    axios.post(url,data).then((result)=>{
      getData()
      clear()
      // toast.success('Employee has been added')
    })
  }

  const clear=()=>{
    setName(''),
    setAge(''),
    setIsActive(0)
    setEditName(''),
    setEditAge(''),
    setEditActive(0),
    setEditId('')

  }

  const getData=()=>{
    axios.get("https://localhost:7137/api/Employee")
    .then((result)=>{
      setData(result.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const handleActiveChange=(e)=>{
    if(e.target.checked ){
      setIsActive(1) 
    }
    else{
      setIsActive(0)
    }
  }

  const handleEditActiveChange=(e)=>{
    if(e.target.checked ){
      setEditActive(1) 
    }
    else{
      setEditActive(0)
    }
  }

  useEffect(() => {
    //considering this as an api
    // setData(empdata);
    getData()
  }, []);

  return (
   <>
  <ToastContainer/>
<Container className="my-3">
      <Row>
        <Col><input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Enter Name" /></Col>
        <Col><input type="text" value={age} onChange={(e)=>setAge(e.target.value)} className="form-control" placeholder="Enter Age" /></Col>
        <Col>
        <input type="checkbox" checked={active===1?true:false} value={active} onChange={(e)=>handleActiveChange(e)}/>
        <label>isActive</label>
        </Col>
        <Col>
        <button className="btn btn-primary" onClick={()=>handleSave()}>Submit</button>
        </Col>
      </Row>
    </Container>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">isActive</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
  {data && data.length > 0 ? (
    data.map((curElem, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{curElem.name}</td>
        <td>{curElem.age}</td>
        <td>{curElem.isActive}</td>
        <td colSpan={2}>
          <button
            className="btn btn-primary"
            onClick={() => handleOnEdit(curElem.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger mx-4"
            onClick={() => handleOnDelete(curElem.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5">Loading...</td>
    </tr>
  )}
</tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
        <Col><input type="text" value={editName} onChange={(e)=>setEditName(e.target.value)} className="form-control" placeholder="Enter Name" /></Col>
        <Col><input type="text" value={editAge} onChange={(e)=>setEditAge(e.target.value)} className="form-control" placeholder="Enter Age" /></Col>
        <Col>
        <input type="checkbox" checked={editActive===1?true:false} value={editActive} onChange={(e)=>handleEditActiveChange(e)}/>
        <label>isActive</label>
        </Col>
       
        
      </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CRUD;
