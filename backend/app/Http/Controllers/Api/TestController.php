<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class TestController extends Controller
{
    public function test()
    {
        return response()->json([
            'success' => true,
            'message' => 'ElderExpert API is working!',
            'project' => 'ElderExpert'
        ]);
    }
}
