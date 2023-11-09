<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matches extends Model
{
    use HasFactory;

    protected $fillable = ['TournamentID','participant1_id','participant2_id','winner_id','round', 'match_order', 'prev_match_id', 'next_match_id'];

    public function tournament() {
        return $this->belongsTo(Tournament::class, 'TournamentID');
    }
    public function participant1() {
        return $this->belongsTo(User::class, 'participant1_id', 'id');
    }
    public function participant2() {
        return $this->belongsTo(User::class, 'participant2_id', 'id');
    }
    public function winner() {
        return $this->belongsTo(User::class, 'winner_id', 'id');
    }
}
