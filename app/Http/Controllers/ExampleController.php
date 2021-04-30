<?php

namespace App\Http\Controllers;

use Redis;

class ExampleController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function  testRedis(){
        $redis = new Redis();
        $redis->connect('127.0.0.1', 6379);
        $redis->echo('hola');

        echo $redis->ping();
    }

    //
}
