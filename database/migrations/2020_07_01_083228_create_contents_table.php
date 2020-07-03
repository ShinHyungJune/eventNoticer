<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("table_id");
            $table->foreign("table_id")->references("id")->on("tables")->onDelete("cascade");
            $table->unsignedBigInteger("column_id");
            $table->foreign("column_id")->references("id")->on("columns")->onDelete("cascade");
            $table->unsignedBigInteger("row_id");
            $table->foreign("row_id")->references("id")->on("rows")->onDelete("cascade");
            $table->text("content")->nullable();
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
        Schema::dropIfExists('contents');
    }
}
