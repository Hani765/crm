<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    use HasFactory;  // Add this line
    protected $fillable = [
        'user_id',
        'brand_id',
        'branch_id',
        'complain_num',
        'contact_name',
        'company_complaint_no',
        'contact_email', // Corrected to match your store function
        'phone_no',
        'whatsapp_no',  // Corrected to match your store function
        'country',
        'address',
        'city',
        'product',
        'sender',
        'model',
        'serial_number_ind',
        'serial_number_oud',
        'mq_nmb',
        'p_date', // Purchase or start date
        'description',
        'amount',
        'technician',
        'status',
        'complaint_type',
        'provided_services',
        'extra',
        'images', // Assuming this stores an array or JSON of image paths
    ];
    public function brand()
    {
        return $this->belongsTo(Brands::class, 'brand_id', 'unique_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'unique_id');
    }
    protected $casts = [
        'p_date' => 'date',
        'e_date' => 'date',
        'images' => 'array', // Assuming you're storing image paths as JSON
    ];
}
