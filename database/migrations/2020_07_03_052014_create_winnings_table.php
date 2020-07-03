<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWinningsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('winnings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("event_id");
            $table->foreign("event_id")->references("id")->on("events")->onDelete("cascade");
            $table->unsignedBigInteger("gift_id");
            $table->foreign("gift_id")->references("id")->on("gifts")->onDelete("cascade");
            $table->unsignedBigInteger("row_id");
            $table->foreign("row_id")->references("id")->on("rows")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('winnings');
    }
}
