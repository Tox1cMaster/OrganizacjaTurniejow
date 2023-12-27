<?php

namespace App\Http\Controllers;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use App\Models\Rule;

class RulesController extends Controller
{
    public function getTournamentRules($tournamentId)
    {
        $rules = Rule::where('tournament_id', $tournamentId)->get();
        return response()->json(['rules' => $rules]);
    }

    public function addRuleToTournament(Request $request, $tournamentId)
    {
        $ruleData = $request->only('rule_order', 'rule_text');
        Rule::create([
            'tournament_id' => $tournamentId,
            'rule_order' => $ruleData['rule_order'],
            'rule_text' => $ruleData['rule_text'],
        ]);
    
        return response()->json(['message' => 'Rule added successfully to tournament']);
    }
    
/*
    public function updateTournamentRules(Request $request, $tournamentId)
    {
        $rules = $request->get('rules'); // Expecting an array
    
        foreach ($rules as $ruleData) {
            $rule = Rule::where('tournament_id', $tournamentId)
                        ->findOrFail($ruleData['id']);
    
            $rule->update([
                'rule_order' => $ruleData['rule_order'],
                'rule_text' => $ruleData['rule_text'],
            ]);
        }
    
        return response()->json(['message' => 'Tournament rules updated successfully']);
    }    
*/

    public function updateTournamentRule(Request $request, $tournamentId, $ruleId)
    {
        $ruleData = $request->only('rule_order', 'rule_text');

        $rule = Rule::where('tournament_id', $tournamentId)
                    ->where('id', $ruleId)
                    ->firstOrFail();

        $rule->update($ruleData);

        return response()->json(['message' => 'Tournament rule updated successfully']);
    }

    public function deleteRule($tournamentId, $ruleOrder){
        $rule = Rule::where('tournament_id', $tournamentId)
        ->where('rule_order', $ruleOrder)
        ->firstOrFail();
        $rule->delete();
        return response()->json(['message' => 'Rule deleted successfully']);
    }

}
