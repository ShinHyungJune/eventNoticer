<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParticipantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('participants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("event_id")->nullable();
            $table->foreign("event_id")->references("id")->on("events")->onDelete("cascade");
            $table->unsignedBigInteger("gift_id")->nullable();
            $table->foreign("gift_id")->references("id")->on("gifts")->onDelete("cascade");
            $table->string("phone")->nullable();
            $table->string("name")->nullable();
            $table->string("nickname")->nullable();
            $table->enum("platform", [\App\Enums\PlatformType::getValues()])->default(\App\Enums\PlatformType::UNKNOWN);
            $table->text("url")->nullable();
            $table->text("thumbnail")->nullable();
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
        Schema::dropIfExists('participants');
    }
}
