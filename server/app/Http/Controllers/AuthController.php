<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Matches;
use App\Models\Tournament;
use App\Models\Participant;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register', 'checkUsername', 'userstats']]);
    }

    public function users()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);

        $credentials = $request->only('name', 'email', 'password');
        $credentials['password'] = bcrypt($credentials['password']);
        try {
            User::create($credentials);
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'email' => 'Podany adres e-mail jest już zajęty.',
            ]);
        }

        return response()->json('success');
    }



    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

    public function checkUsername(Request $request)
    {
        $username = $request->input('username');

        $user = User::where('name', $username)->first();

        if ($user) {
            return response()->json(['exists' => true], 200);
        }

        return response()->json(['exists' => false], 200);
    }

    public function userstats($id)
    {
        $user = User::findOrFail($id);
        $user->tournaments_wins = 0; //TODO
        $user->tournaments_organized = Tournament::where('user_id', $id)->count();
        $user->tournaments_joined = Participant::where('UserID', $id)->count();
        $user->matches_played = Matches::where('participant1_id', $id)->orWhere('participant2_id', $id)->count();
        return json_encode($user, 200);
    }

    public function update(Request $request, $id)
{
    // Walidacja danych wejściowych
    $request->validate([
        'name' => 'required|max:255',
        'email' => 'required|email|unique:users,email,' . $id,
        'password' => 'required|min:6',
        'pictureprofile' => 'nullable|image|max:1999' // przykład walidacji dla obrazu
    ]);

    try {
        // Znajdź użytkownika po ID
        $user = User::findOrFail($id);

        // Aktualizuj dane
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password); // Haszowanie hasła przed zapisem

        // Sprawdź, czy obraz profilowy został przesłany
        if ($request->hasFile('pictureprofile')) {
            $filenameWithExt = $request->file('pictureprofile')->getClientOriginalName();
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('pictureprofile')->getClientOriginalExtension();
            $fileNameToStore = $filename.'_'.time().'.'.$extension;
            $path = $request->file('pictureprofile')->storeAs('public/profile_pictures', $fileNameToStore);
            
            // Jeśli użytkownik miał wcześniej obrazek profilowy, możesz go usunąć
            // Storage::delete('public/profile_pictures/'.$user->pictureprofile);

            $user->pictureprofile = $fileNameToStore;
        }

        $user->save();

        // Zwróć odpowiedź, że aktualizacja się powiodła
        return back()->with('success', 'User updated successfully.');
    } catch (\Exception $e) {
        // W przypadku błędu, zwróć odpowiedź z błędem
        return back()->with('error', 'Error updating user: ' . $e->getMessage());
    }
}

}