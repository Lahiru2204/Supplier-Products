import {Routes, Route} from 'react-router-dom'
import Home from "../pages/home";
import Test from '../pages/test';
import SupplierList from '../pages/Supplier';


function MyRouter() {
    
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/suppliers" element={<SupplierList />} />
        </Routes>


    );
}

export default MyRouter;