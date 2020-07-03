<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\TableResource;
use App\Imports\TableImport;
use App\Table;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class TableController extends ApiController
{
    public function index()
    {
        return TableResource::make(Table::first());
    }

    public function import(Request $request)
    {
        Excel::import(new TableImport, $request->file("file"), "public");
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            "columns" => "array|min:1",
            "rows" => "array|min:1",
        ]);

        $table = Table::find($id);

        if(!$table)
            return "not found";

        $table->columns()->whereNotIn("id", $request->columns)->delete();

        $table->rows()->whereNotIn("id", $request->rows)->delete();
    }
}
