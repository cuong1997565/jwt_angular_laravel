<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;
use DB;
use Carbon\Carbon;

class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request)
    {   
        if(!$this->validateEmail($request->email))
        {
            return $this->failedResponse();
        }

        $this->send($request->email);
    }

    public function send($email)
    {
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));

    }

    public function createToken($email)
    {
        $olodToken = DB::table('password_resets')->where('email', $email)->first();
        if($olodToken)
        {
            return $olodToken;
        }
        $token = str_random(60);
        $this->saveToken($token, $email);
    }

    public function saveToken($token, $email)
    {
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);

    }

    public function validateEmail($email)
    {
            return !!User::where('email', $email)->first();
    }

    public function failedResponse(){
        return response()->json([
            'error' => 'Email does\'t found on our database'
        ],404);
    }
}
