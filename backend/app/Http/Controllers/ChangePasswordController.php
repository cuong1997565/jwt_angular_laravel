<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ChangePasswordRequest;
use DB;
use App\User;
use Response;

class ChangePasswordController extends Controller
{
    public function resetPassword(ChangePasswordRequest $request)
    {
          return $this->getPasswordResetTableRow($request)->count() > 0 ? $this->changePassword($request) : $this->tokenNotFoundResponse();
    }

    private function getPasswordResetTableRow($request)
    {
        return DB::table('password_resets')->where(['email' => $request->email, 'token' => $request->resetToken]);
    }


    private function changePassword($request)
    {
            $user = User::whereEmail($request->email)->first();
            $user->update(['password' => $request->password]);
            $this->getPasswordResetTableRow($request)->delete();
            return response()->json(['data' => 'Password Successfully Changed'], 200);
    }

    private function tokenNotFoundResponse()
    {
        return response()->json(['error' => 'Token or Email is incorrect'],404);
    }
}
