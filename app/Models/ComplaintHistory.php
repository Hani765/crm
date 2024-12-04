<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComplaintHistory extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'complaint_histories';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'complaint_id',
        'complaint_data',
    ];



    /**
     * Define a relationship to the Complaint model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function complaint()
    {
        return $this->belongsTo(Complaint::class, 'complaint_id');
    }
}
