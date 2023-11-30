<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class SupplierController extends Controller
{
    public function index(){

        $suppliers = Supplier::all();

        if($suppliers->count() > 0){
            
            return response()->json([
                'status' => 200,
                'suppliers' => $suppliers
            ], 200);
        }else{
            return response()->json([
                'status' => 404,
                'Message' => 'No Records Found'
            ], 404);
        }

    }


    public function store(Request $request){

        $validator = Validator::make($request->all(),[
            'name'=> 'required|string|max:191',
            'contact_person'=> 'required|string|max:191',
            'phone'=> 'required|digits:10',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }else{

            $supplier = Supplier::create([
                'name'=> $request->name,
                'contact_person'=> $request->contact_person,
                'phone'=> $request->phone,
            ]);

            if($supplier){
                return response()->json([
                    'status' => 200,
                    'Message' => "Supplier Added Successfully"
                ], 200);
            }else{
                return response()->json([
                    'status' => 500,
                    'Message' => "Something Went Wrong"
                ], 500);
            }

        }

    }

    public function show($id){

        $supplier = Supplier::find($id);
        if($supplier){
            return response()->json([
                'status' => 200,
                'supplier' => $supplier
            ], 200);

        }else{
            return response()->json([
                'status' => 404,
                'Message' => "No Such Supplier Found! "
            ], 404);

        }

    }


    public function edit($id){

        $supplier = Supplier::find($id);
        if($supplier){
            return response()->json([
                'status' => 200,
                'supplier' => $supplier
            ], 200);

        }else{
            return response()->json([
                'status' => 404,
                'Message' => "No Such Supplier Found! "
            ], 404);

        }

    }

    public function update(Request $request, int $id){

        $validator = Validator::make($request->all(),[
            'name'=> 'required|string|max:191',
            'contact_person'=> 'required|string|max:191',
            'phone'=> 'required|digits:10',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }else{

            $supplier = Supplier::find($id);

            

            if($supplier){

                $supplier->update([
                    'name'=> $request->name,
                    'contact_person'=> $request->contact_person,
                    'phone'=> $request->phone,
                ]);

                return response()->json([
                    'status' => 200,
                    'Message' => "Supplier Updated Successfully"
                ], 200);
            }else{
                return response()->json([
                    'status' => 500,
                    'Message' => "No Such Supplier Found"
                ], 500);
            }

        }


    }

    public function destroy($id){

        $supplier = Supplier::find($id);
        if ($supplier) {

            $supplier->delete(); 
            return response()->json([
                'status' => 200,
                'Message' => "Supplier Deleted Successfully"
            ], 200);           
            
        } else {
            return response()->json([
                'status' => 500,
                'Message' => "No Such Supplier Found"
            ], 500);
            
        }
        

    }


    //products

    public function showproduct($id){

        $supplier = Supplier::find($id);

        if($supplier){

            $products = $supplier->products;

            if($products->count()>0){
                return response()->json([
                    'status' => 200,
                    'products' => $products
                ], 200);
            }else{
                return response()->json([
                    'status' => 404,
                    'Message' => "No Products From this Supplier "
                ], 404);
            }

        }else{
            return response()->json([
                'status' => 404,
                'Message' => "No Such Supplier Found! "
            ], 404);

        }

    }


    public function addproduct(Request $request,int $id){

        $validator = Validator::make($request->all(),[
            'name'=> 'required|string|max:191',
            'price'=> 'required|numeric',
        
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }else{

            $supplier = Supplier::find($id);

            if($supplier){

                $product = new Product([

                    'name' => $request->name,
                    'price' =>$request->price,
                ]);
            
                // Associate the product with the supplier
                $supplier->products()->save($product);

                if($product){
                    return response()->json([
                        'status' => 200,
                        'Message' => "Product Added Successfully"
                    ], 200);
                }else{
                    return response()->json([
                        'status' => 500,
                        'Message' => "Failed"
                    ], 500);
                }

            }else{

                return response()->json([
                    'status' => 500,
                    'Message' => "Something Went Wrong"
                ], 500);

            }

            

        }

    }


}
