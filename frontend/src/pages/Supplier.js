import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import Loading from "../components/loading";




function Supplier(){

    const [loading, setLoading] = useState(true);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() =>{

        axios.get('http://127.0.0.1:8000/api/suppliers').then(res =>{
                console.log(res)
                setSuppliers(res.data.suppliers);
                setLoading(false);
        });

    },[])

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
                    <Link to="/" className="btn btn-success">Edit</Link>
                </td>
                <td>
                    <button className="btn btn-danger">Delete</button>
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
                                <Link to="/" className="btn btn-primary float-end">Add Supplier</Link>
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