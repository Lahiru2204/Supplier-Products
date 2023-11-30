<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SupplierController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Supplier Routes

Route::get('suppliers',[SupplierController::class, 'index']);
Route::post('suppliers',[SupplierController::class, 'store']);
Route::get('suppliers/{id}',[SupplierController::class, 'show']);
Route::get('suppliers/{id}/edit',[SupplierController::class, 'edit']);
Route::put('suppliers/{id}/edit',[SupplierController::class, 'update']);
Route::delete('suppliers/{id}/delete',[SupplierController::class, 'destroy']);

Route::get('suppliers/{id}/product',[SupplierController::class, 'showproduct']);
Route::post('suppliers/{id}/product',[SupplierController::class, 'addproduct']);

//Product Routes

Route::get('products/{id}/edit',[ProductController::class, 'edit']);
Route::put('products/{id}/edit',[ProductController::class, 'update']);
