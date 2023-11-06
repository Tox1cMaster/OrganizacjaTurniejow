<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    use HasFactory;

    // Ustawienie fillable dla kolumn, które można uzupełnić masowo
    protected $fillable = ['TournamentID','UserID'];

    // Definicja relacji z modelem User
    public function user()
    {
        return $this->belongsTo(User::class, 'UserID', 'id');
    }
    public function tournament() {
        return $this->belongsTo(Tournament::class, 'TournamentID');
    }
}
