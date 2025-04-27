<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Requests\LogInRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;

class AuthController extends Controller
{
    public function login(LogInRequest $request)
    {
        $data = $request -> validated();


        
        if(!Auth::attempt($data)){
            return response([
            'message' => 'email or password not found',
            ]);
        }

        $user =  Auth::user();
        $token = $user -> createToken('main') -> plainTextToken;

        return response() -> json([
        'user' => $user,
        'token' => $token,
        
        ]);


    }

    public function register(RegisterRequest $request)
    {
    //Gets the validated data
    $data = $request -> validated();
    //Creates new data
 
        $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => $data['password'],
    ]);

    //*Generates a token everytime a user is created to grant access to logging in
    $token = $user -> createToken('main' ) -> plainTextToken;

    return response() -> json([
        'user' => $user  ,
        'token' => $token,
        
    ]);
    }

    public function logout(Request $request){
        
       $user = $request -> user();

       $user -> currentAccessToken() -> delete();

       return response('',204);
    }
}
