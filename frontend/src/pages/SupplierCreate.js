import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Supplier from "./Supplier";
import axios from "axios";
import Loading from "../components/loading";




function SupplierCreate(){

    const navigate = useNavigate();
    const [loading,SetLoading] = useState(false)
    const [inputErrorList, setInputErrorList] = useState({})

    const [supplier, setSupplier] = useState({

        name: '',
        contact_person: '',
        phone: ''

    })

    const handleInput = (e) => {
        e.persist();
        setSupplier({...supplier, [e.target.name]: e.target.value});
    }


    const saveSupplier = (e) => {

        e.preventDefault();
        
        SetLoading(true);
        const data ={
            name: supplier.name,
            contact_person: supplier.contact_person,
            phone: supplier.phone,
        }

        axios.post('http://127.0.0.1:8000/api/suppliers', data)
            .then(res => {
                alert(res.data.Message);
                navigate('/suppliers')
                SetLoading(false);
            })
            .catch(function(error){

                if(error.response){
                    if(error.response.status === 422){
                        setInputErrorList(error.response.data.errors)
                        SetLoading(false);
                    }
                    if(error.response.status === 500){
                        alert(error.response.data)
                        SetLoading(false);
                    }
                }
            })


    }

    if(loading){
        return(
            <Loading />
        )
    }


    return(
    <div>
            <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Add Supplier
                                <Link to="/suppliers" className="btn btn-danger float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveSupplier}>
                                <div className="mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" value={supplier.name} onChange={handleInput} className="form-control" />
                                    <span className="text-danger">{inputErrorList.name}</span>
                                </div>
                                <div className="mb-3">
                                    <label>contact_person</label>
                                    <input type="text" name="contact_person" value={supplier.contact_person} onChange={handleInput} className="form-control" />
                                    <span className="text-danger">{inputErrorList.contact_person}</span>
                                </div>
                                <div className="mb-3">
                                    <label>Phone</label>
                                    <input type="text" name="phone" value={supplier.phone} onChange={handleInput} className="form-control" />
                                    <span className="text-danger">{inputErrorList.phone}</span>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary">Save Supplier</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default SupplierCreate;