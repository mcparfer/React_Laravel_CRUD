<?php

namespace App\Http\Controllers\API;

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization');

use App\Http\Controllers\Controller;
use App\Models\UnitEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class UnitEventController extends Controller
{

    public function index()
    {
        $units_events = UnitEvent::all();
        return $units_events;
    }

    public function getEventUnits($id)
    {
        $event_units = DB::table('unit_events')
            ->where('id_event', $id)
            ->get();

        return $event_units;
    }

    public function checkUnitInEvent(Request $request) {

            $units = collect($request);

            $units->map(function ($unitData) {
                $id_unit = $unitData['id_unit'];
                $id_event = $unitData['id_event'];
                $will_sing = $unitData['number_of_songs'] > 0;
                print_r($unitData);

                $exists_already = DB::table('unit_events')
                    ->where('id_event', $id_event)
                    ->where('id_unit', $id_unit)
                    ->first();

                /* POST */
                if ($will_sing && !$exists_already) {
                    $unit_event = new UnitEvent();
                    $unit_event->id_event = $id_event;
                    $unit_event->id_unit = $id_unit;
                    $unit_event->number_of_songs = $unitData['number_of_songs'];

                    $unit_event->save();
                    print_r("a");
                }

                /* PUT */
                
                if ($will_sing && $exists_already) {
                    $unit_from_db = DB::table('unit_events')
                        ->where('id_event', $id_event)
                        ->where('id_unit', $id_unit)
                        ->update(['number_of_songs' => $unitData['number_of_songs']]);

                    
                    print_r("b");
                    return $unit_from_db;
                }

                
                /* DELETE */
                
                if (!$will_sing && $exists_already) {
                    $exists_already = DB::table('unit_events')
                        ->where('id_event', $id_event)
                        ->where('id_unit', $id_unit)
                        ->delete();
                    
                    
                    print_r("c");
                    return $exists_already;
                    
                }
            }
        );

    }
}
