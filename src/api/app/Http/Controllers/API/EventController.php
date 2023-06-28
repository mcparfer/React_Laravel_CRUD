<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Exception;

class EventController extends Controller
{
    /* Display a listing of the existing records. */
    public function index()
    {
        $unit_events = Event::leftJoin('unit_events', 'events.id', '=', 'unit_events.id_event')
            ->leftJoin('units', 'units.id', '=', 'unit_events.id_unit')
            ->select('events.id', 'events.name', 'events.date', 'events.description', 'events.total_tickets', 'events.left_tickets', 'events.price', 'events.image', 'unit_events.number_of_songs', 'units.name AS unit_name', 'units.logo')
            ->groupBy('events.id', 'unit_events.id_unit')
            ->get();

        $grouped_unit_events = $unit_events->groupBy('id')->map(function ($events) {

            $event = [
                'id' => $events[0]->id,
                'name' => $events[0]->name,
                'date' => $events[0]->date,
                'description' => $events[0]->description,
                'total_tickets' => $events[0]->total_tickets,
                'left_tickets' => $events[0]->left_tickets,
                'price' => $events[0]->price,
                'image' => $events[0]->image,
            ];

            $units = $events->map(function ($item) {
                return [
                    'unit_name' => $item->unit_name,
                    'number_of_songs' => $item->number_of_songs,
                    'logo' => $item->logo,
                ];
            })->filter(function ($unit) {
                return !is_null($unit['unit_name']);
            });

            if ($units->isNotEmpty()) {
                $event['units'] = $units;
            }

            return $event;

        })->values();

        return $grouped_unit_events;
    }


    /* Store a newly created record in db. */
    public function store(Request $request)
    {
        $event = new Event();

        $event->name = $request->name;
        $event->date = $request->date;
        $event->description = $request->description;
        $event->total_tickets = $request->total_tickets;
        $event->left_tickets = $request->total_tickets;
        $event->price = $request->price;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageName = uniqid() . "_" . $file->getClientOriginalName();
            $request->image->move(public_path('images'), $imageName);
            $event->image = strval($imageName);
        }

        $event->save();
    }

    /* Display the specified record by id. */
    public function show($id)
    {
        /* Find a record by its id and return it. */
        $event = Event::find($id);
        return $event;
    }

    /* Update the specified resource in storage. */
    public function update(Request $request, $id)
    {
        try {
            /* Find a record by its id.*/
            $event = Event::findOrFail($id);

            /* New instance's values are filled with Request's values. */
            $event->name = $request->name;
            $event->date = $request->date;
            $event->description = $request->description;
            $event->total_tickets = $request->total_tickets;
            $event->price = $request->price;

            if ($request->hasFile('image')) {
                // Eliminar la imagen anterior del servidor
                $oldImageName = $event->image;
                $oldImagePath = public_path('images/' . $oldImageName);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }

                // Guardar la nueva imagen en el servidor y actualizar el registro con el nombre de la nueva imagen
                $file = $request->file('image');
                $imageName = uniqid() . "_" . $file->getClientOriginalName();
                $file->move(public_path('images'), $imageName);
                $event->image = $imageName;
            } else {
                $event->image = $event->image;
            }

            /* Save updated record in db and return it. */
            $event->save();

            return $event;
        } catch (Exception $e) {
            echo $e;
        }
    }

    /* Remove the specified resource from storage. */
    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $oldImageName = $event->image;
        $oldImagePath = public_path('images/' . $oldImageName);
        if (file_exists($oldImagePath)) {
            unlink($oldImagePath);
        }

        /* Find a record by its id and destroy it. */
        $event = Event::destroy($id);

        /* Return the deleted event for aditional purposes (tracking? idk) */
        return $event;
    }
}
