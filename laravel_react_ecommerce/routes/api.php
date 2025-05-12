<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

//Logout should be a middleware


Route::middleware('auth:sanctum') -> group(function () {
    Route::get("/logout", [AuthController::class,'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    

   //handles user deletion
   //https://laravel.com/docs/12.x/controllers
   //When this command is defined laravel automatically creates the CRUD operation so we dont need to specify the function the would use in the controller
    Route::apiResource('/users',UserController::class);
   
});

Route::post('/register', [AuthController::class,'register']) -> name('register');   
Route::post('/login', [AuthController::class,'login']) -> name('login');



