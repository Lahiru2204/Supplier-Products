import {Routes, Route} from 'react-router-dom'
import Home from "../pages/home";
import Test from '../pages/test';
import SupplierList from '../pages/Supplier';
import SupplierCreate from '../pages/SupplierCreate.js';
import SupplierEdit from '../pages/SupplierEdit.js';
import SupplierProduct from '../pages/SupplierProduct.js';



function MyRouter() {
    
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/suppliers/create" element={<SupplierCreate />} />
            <Route path="/suppliers" element={<SupplierList />} />
            <Route path="/suppliers/:id/edit" element={<SupplierEdit />} />
            <Route path="/suppliers/:id/product" element={<SupplierProduct/>}/>
            
        </Routes>


    );
}

export default MyRouter;