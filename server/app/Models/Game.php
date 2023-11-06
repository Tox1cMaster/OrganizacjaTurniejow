<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;
    protected $primaryKey = 'GameID'; // Ustawienie klucza głównego

    // Ustawienie fillable dla kolumn, które można uzupełnić masowo
    protected $fillable = ['GameName'];

    // Definicja relacji z modelem User
    public function user()
    {
        return $this->belongsTo('App\Tournaments', 'GameID');
    }
}
