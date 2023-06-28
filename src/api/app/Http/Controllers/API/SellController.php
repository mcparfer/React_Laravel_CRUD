<?php

namespace App\Http\Controllers\API;

use App\Models\Sell;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SellController extends Controller
{

    public function index()
    {
        $selling = Sell::all();
        return $selling;
    }


    public function store(Request $request, $id)
    {
        {
            $sell = new Sell();
            $sell->id_event = $id;
            $sell->email = $request->email;
            $sell->phone = $request->phone;
            $sell->qty = $request->qty;    
            $sell->save();
            return $sell;
        }
    }

    public function show($id)
    {
        $sell = Sell::find($id);
        return $sell;
    }


    public function update(Request $request, $id)
    {
        $sell = Sell::findOrFail($id);
        $sell->id_event = $request->newIdEvent;
        $sell->email = $request->email;
        $sell->phone = $request->phone;
        $sell->qty = $request->qty;    
        $sell->save();
        return $sell;
    }

    public function destroy($id)
    {
        $sell = Sell::destroy($id);
        return $sell;
    }
}
