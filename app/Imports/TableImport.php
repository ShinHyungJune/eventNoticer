<?php

namespace App\Imports;

use App\Event;
use App\Table;
use App\User;
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

    protected $event;

    protected $user;

    protected $columns = [];

    public function __construct(User $user, Event $event)
    {
        $this->user = $user;

        $this->event = $event;
    }

    public function model(array $row)
    {
        if($this->rows === 0){
            $this->table = $this->event->table()->create();

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

        foreach($row as $body){

            $this->table->contents()->create([
                "column_id" => $this->columns[$index]->id,
                "row_id" => $createdRow->id,
                "body" => $body
            ]);

            ++$index;
        }
    }

    public function getRowCount(): int
    {
        return $this->rows;
    }
}
