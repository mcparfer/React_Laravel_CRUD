<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unit_events', function (Blueprint $table) {
            $table->unsignedBigInteger('id_event');
            $table->unsignedBigInteger('id_unit');
            $table->primary(['id_event', 'id_unit']);
            $table->foreign('id_event')->references('id')->on('events');
            $table->foreign('id_unit')->references('id')->on('units');
            $table->integer('number_of_songs');
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('unit_events');
    }
};
