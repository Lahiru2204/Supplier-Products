<?php

namespace App\Http\Controllers;
use App\Models\Supplier;

use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function showForm() {
        return view('supplier.form');
    }


    public function submitForm(Request $request) {
        
    
        $supplier = Supplier::create($request->only(['name', 'contact_person', 'mobile_numbers']));
    
        foreach ($request->products as $productData) {
            $supplier->products()->create($productData);
        }
    
        return redirect()->route('supplier.list');
    }



    public function store(Request $request) {
        
    
        $supplier = Supplier::create($request->only(['name', 'contact_person', 'mobile_numbers']));
    
        foreach ($request->products as $productData) {
            $supplier->products()->create($productData);
        }
    
        return response()->json(['message' => 'Supplier added successfully']);
    }


    public function index() {
        $suppliers = Supplier::paginate(10);
        return response()->json($suppliers);
    }

}
