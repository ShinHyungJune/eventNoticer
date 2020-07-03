<?php

namespace App\Imports;

use App\Table;
use Maatwebsite\Excel\Concerns\ToModel;

class TableImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */

    private $rows = 0;

    protected $table;

    protected $columns = [];

    public function model(array $row)
    {
        if($this->rows === 0){
            $this->table = Table::create(["title" => "test", "body" => "test"]);

            foreach($row as $head){
                $this->heads[] = $head;

                $this->table->columns()->create([
                    "name" => $head,
                ]);
            }

            $this->columns = $this->table->columns;

            ++$this->rows;

            return null;
        }

        ++$this->rows;

        $createdRow = $this->table->rows()->create();

        $index = 0;

        foreach($row as $content){

            $this->table->contents()->create([
                "column_id" => $this->columns[$index]->id,
                "row_id" => $createdRow->id,
                "content" => $content
            ]);

            ++$index;
        }
    }

    public function getRowCount(): int
    {
        return $this->rows;
    }
}
