<?php
namespace App\Http\Controllers;
use App\Events\NewMessageEvent;
use Illuminate\Http\Request;

class MessageController extends Controller
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
    public function sendMessage(Request $request){
        event(new NewMessageEvent($request->channel, $request->message));
    }
    //
}
