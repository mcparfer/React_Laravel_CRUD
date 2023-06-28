<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UnitController extends Controller
{
    public function index()
    {
        $units = Unit::all();
        return $units;
    }

    public function store(Request $request)
    {
        $unit = new Unit();
        $unit->name = $request->name;

        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $path = $logo->store('public/images');
            $unit->logo = Storage::url($path);
        }

        $unit->save();
        return $unit;
    }

    public function show($id)
    {
        $unit = Unit::find($id);
        return $unit;
    }

    public function update(Request $request, $id)
    {
        $unit = Unit::findOrFail($id);
        $unit->name = $request->name;

        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $path = $logo->store('public/images');
            $unit->logo = Storage::url($path);
        }

        $unit->save();
        return $unit;
    }

    public function destroy($id)
    {
        $unit = Unit::destroy($id);
        return $unit;
    }
}
