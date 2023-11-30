<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function edit($id){

        $product = Product::find($id);
        if($product){
            return response()->json([
                'status' => 200,
                'supplier' => $product
            ], 200);

        }else{
            return response()->json([
                'status' => 404,
                'Message' => "No Such Product Found! "
            ], 404);

        }

    }


    public function update(Request $request, int $id){

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

            $product = Product::find($id);

            

            if($product){

                $product->update([
                    'name'=> $request->name,
                    'price'=> $request->price,
                    
                ]);

                return response()->json([
                    'status' => 200,
                    'Message' => "Product Updated Successfully"
                ], 200);
            }else{
                return response()->json([
                    'status' => 500,
                    'Message' => "No Such Product Found"
                ], 500);
            }

        }


    }

}
