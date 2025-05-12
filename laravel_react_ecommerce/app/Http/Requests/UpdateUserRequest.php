<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
   //This caused errors in the email part where i didnt use string interpolation
   //  'email' => 'required|email|unique:users,email,'.$this -> id,
        return [
           'name' => 'required|max:255|string',
            'email' => 'required|email|unique:users,email,'.$this -> id,
            'password' => ['required',
                Password:: min(0) -> letters() 
            ]
        ];
    }
}
