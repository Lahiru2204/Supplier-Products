<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = ['supplier_id', 'name', 'price'];

    //relationship

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

}
