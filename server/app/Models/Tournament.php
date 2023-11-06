<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    use HasFactory;
    protected $primaryKey = 'TournamentID'; // Ustawienie klucza głównego

    // Ustawienie fillable dla kolumn, które można uzupełnić masowo
    protected $fillable = ['user_id', 'TournamentName', 'GameID', 'Privacy', 'TournamentFormat', 'Status', 'Prizepool'];

    // Definicja relacji z modelem User
    public function user()
    {
        return $this->belongsTo('App\User', 'id');
        return $this->hasMany('App\Games', 'GameID');
        return $this->hasMany('App\Participant', 'TournamentID');
    }
}
