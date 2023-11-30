import { useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import Supplier from "./Supplier";
import axios from "axios";
import Loading from "../components/loading";




function SupplierEdit(){

    let {id} = useParams();

    
    const [loading,SetLoading] = useState(true)
    const [inputErrorList, setInputErrorList] = useState({})

    const [supplier, setSupplier] = useState({})

    useEffect(() =>{

        axios.get(`http://127.0.0.1:8000/api/suppliers/${id}/edit`).then(res =>{
                // console.log(res)
                setSupplier(res.data.supplier);
                SetLoading(false);
        })
        .catch(function(error){

            if(error.response){
                
                if(error.response.status === 404){
                    alert(error.response.data.Message)
                    SetLoading(false);
                }
                if(error.response.status === 500){
                    alert(error.response.data)
                    SetLoading(false);
                }
            }
        })

    },[id])

    const handleInput = (e) => {
        e.persist();
        setSupplier({...supplier, [e.target.name]: e.target.value});
    }


    const updateSupplier = (e) => {

        e.preventDefault();
        
        SetLoading(true);
        const data ={
            name: supplier.name,
            contact_person: supplier.contact_person,
            phone: supplier.phone,
        }

        axios.put(`http://127.0.0.1:8000/api/suppliers/${id}/edit`, data)
            .then(res => {
                alert(res.data.Message);
                
                SetLoading(false);
            })
            .catch(function(error){

                if(error.response){
                    if(error.response.status === 422){
                        setInputErrorList(error.response.data.errors)
                        SetLoading(false);
                    }
                    if(error.response.status === 404){
                        alert(error.response.data.Message)
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

    if(Object.keys(supplier).length === 0){
        return(
            <div className="container">
                <h3>No Such Supplier Found</h3>
            </div>
        )
    }


    return(
    <div>
            <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Edit Supplier
                                <Link to="/suppliers" className="btn btn-danger float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={updateSupplier}>
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
                                    <button type="submit" className="btn btn-primary">Update Supplier</button>
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

export default SupplierEdit;