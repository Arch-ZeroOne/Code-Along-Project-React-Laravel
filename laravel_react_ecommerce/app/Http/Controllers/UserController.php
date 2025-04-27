<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //Transforms the resource into a json reponse
         return UserResource::collection(
            User::query() -> orderBy('id','desc') -> get()

         );
    }

  

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request -> validated();
        //bycyrpt - hashes the given value
        $data['password'] = bcrypt($data['password']);
        $user =  User::create($data); 
        //201 - means the resource has been created
        //Transforms the response into JSON by the UserResource class instance
        return response(new UserResource($user),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response(new UserResource($user));
    }

   

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request -> validated();

        //*Returns false if the data doesnt have a password
        if(isset($data['password'])){
            $data['password'] = bcrypt($data['password']);

        }
        $user -> update($data);
        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user -> delete();

        return response('',204);
    }
}
