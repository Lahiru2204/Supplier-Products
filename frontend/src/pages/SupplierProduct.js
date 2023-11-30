import { useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/loading";





function SupplierProduct(){


    let {id} = useParams();

    const [loading,SetLoading] = useState(true)
    const [products, setProducts] = useState([])

    useEffect(() =>{

        axios.get(`http://127.0.0.1:8000/api/suppliers/${id}/product`).then(res =>{
            // console.log(res)
            setProducts(res.data.products);
            SetLoading(false);
    })
    .catch(function(error){

        if(error.response){
            
            if(error.response.status === 404){
                alert(error.response.data.Message)
                SetLoading(false);
            }
           
        }
    })
},[id])

if(loading){
    return(
        <Loading />
    )
}

if(Object.keys(products).length === 0){
    return(
        <div className="container">
            <h3>No Products from the Supplier</h3>
        </div>
    )
}


var productDetails ="";

productDetails = products.map((item, index)=>{

    return(
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            
            <td>
                <Link to="/" className="btn btn-success">Edit</Link>
            </td>
            <td>
                <button type="button"  className="btn btn-danger">Delete</button>
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
                            <h4>Products List
                                <Link to="/" className="btn btn-primary float-end">Add Product</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>price</th>                                        
                                        <th>Edit</th>
                                        <th>Delete</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {productDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SupplierProduct;