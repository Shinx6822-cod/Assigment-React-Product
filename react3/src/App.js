import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [employee, setEmployee] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState();

  const [nameEdit, setNameEdit] = useState("");
  const [ageEdit, setAgeEdit] = useState();
 
  const handleName = (event) => {
    console.log(event);
    console.log(event.target.value);
    setName(event.target.value);
  };
  const handleAge = (event) => {
    console.log(event);
    console.log(event.target.value);
    setAge(event.target.value);
  };
  const handleSubmit = () => {
    console.log(name, age);
    axios({
      method: "post",
      url: "http://localhost:7777/employee",
      data: {
        name: name,
        age: age,
      },
    })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleEdit = () => {
    window.confirm("Want to Edit?");
    axios({
      method: "put",
      url: "http://localhost:7777/employee/1ae0dd6b2dfb1b2d",
      data: {
        name: nameEdit,
        age: ageEdit,
      },
    })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleNameEdit = (event) => {
    console.log(event);
    console.log(event.target.value);
    setNameEdit(event.target.value);
  };
  const handleAgeEdit = (event) => {
    console.log(event);
    console.log(event.target.value);
    setAgeEdit(event.target.value);
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      // kalo klik ok
      axios({
        method: "post",
        url: `http://localhost:7777/employee/delete/${id}`,
      })
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    // Promise
    axios({
      method: "get",
      url: "http://localhost:7777/employee",
    })
      .then(function (response) {
        console.log(response);
        setEmployee(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
        alert("ada error, coba reload kembali");
      });
  }, []);

  return (<div className="App">
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label for="inputName" className="form-label">
            Name
          </label>
          <input value={name} onChange={handleName} type="name" className="form-control" id="inputName" />
        </div>
        <div className="col-md-6">
          <label for="inputAge" className="form-label">
            Age
          </label>
          <input value={age} onChange={handleAge} type="number" className="form-control" id="inputAge" />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>

      {employee.map((Item) => {
        console.log(Item);
        return (
          <div>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{Item.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">ID : {Item.id}</h6>
                <p className="card-text">
                  {Item.name} berumur {Item.age} tahun.
                </p>
                <a href="#" className="card-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Edit
                </a>
                <a href="#" className="card-link" onClick={() => handleDelete(Item.id)}>
                  Delete
                </a>
              </div>
            </div>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Modal title
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form className="row g-3" onSubmit={handleEdit}>
                      <div className="col-md-6">
                        <label for="inputName" className="form-label">
                          Name
                        </label>
                        <input value={nameEdit} onChange={handleNameEdit} type="name" className="form-control" id="inputName" />
                      </div>
                      <div className="col-md-6">
                        <label for="inputAge" className="form-label">
                          Age
                        </label>
                        <input value={ageEdit} onChange={handleAgeEdit} type="number" className="form-control" id="inputAge" />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;

