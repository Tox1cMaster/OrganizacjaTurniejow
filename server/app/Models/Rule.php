<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rule extends Model
{
    use HasFactory;
    protected $fillable = [
        'tournament_id',
        'rule_order',
        'rule_text',
    ];

    public function tournament()
    {
        return $this->belongsTo(Tournament::class, 'tournament_id', 'TournamentID');
    }
}
