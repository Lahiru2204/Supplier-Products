import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import Loading from "../components/loading";




function Supplier(){

    const [loading, setLoading] = useState(true);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() =>{

        axios.get('http://127.0.0.1:8000/api/suppliers').then(res =>{
                // console.log(res)
                setSuppliers(res.data.suppliers);
                setLoading(false);
        });

    },[])

    const deleteSupplier = (e, id) => {

        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting...";

        axios.delete(`http://127.0.0.1:8000/api/suppliers/${id}/delete`)
            .then(res => {
                alert(res.data.Message);
                thisClicked.closest("tr").remove();
                
            })
            .catch(function(error){

                if(error.response){
                   
                    if(error.response.status === 404){
                        alert(error.response.data.Message)
                        thisClicked.innerText = "Delete";
                    }
                    if(error.response.status === 500){
                        alert(error.response.data)
                    }
                }
            })



    }

    if(loading){
        return(
           <Loading />
        )
    }

    var supplierDetails ="";

    supplierDetails = suppliers.map((item, index)=>{

        return(
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.contact_person}</td>
                <td>{item.phone}</td>
                <td>
                    <Link to={`/suppliers/${item.id}/edit`} className="btn btn-success">Edit</Link>
                </td>
                <td>
                    <button type="button" onClick={(e) => deleteSupplier(e, item.id)} className="btn btn-danger">Delete</button>
                </td>
                <td>
                <Link to="/" className="btn btn-success">View</Link>
                </td>
            </tr>
        )
    });
    

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Supplier List
                                <Link to="/suppliers/create" className="btn btn-primary float-end">Add Supplier</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Contact Person</th>
                                        <th>Phone</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                        <th>Products</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {supplierDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Supplier;