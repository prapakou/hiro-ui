import React, { useCallback, useMemo, useState } from "react";
import { sortBy } from "lodash-es";

import {
  Header,
  Table,
  Label,
  Progress,
  Button,
  Pagination,
  Grid,
  Divider
} from "../../src";

type TableRowProps = [string, Date | undefined, number, string, boolean];

const TableRow = ({ cells }: { cells: TableRowProps }) => {
  const [name, modifedOn, progress, useCase, isStarted] = cells;

  return (
    <Table.Row>
      <Table.Cell content={name} />
      <Table.Cell
        content={
          modifedOn ? modifedOn.toLocaleDateString() : <Label content="None" />
        }
      />
      <Table.Cell
        content={
          progress === -1 ? (
            <Label content="New" />
          ) : (
            <Progress percent={progress} />
          )
        }
      />
      <Table.Cell content={useCase} />

      <Table.Cell>
        <Button content={isStarted ? "Continue teaching" : "Start teaching"} />
      </Table.Cell>
    </Table.Row>
  );
};

export const TableDemo = () => {
  const headers = useMemo(
    () => ["Issue Name", "Modified", "Progress", "Use case", "Actions"],
    []
  );

  const [currentColumn, setCurrentColumn] = useState(1);
  const [direction, setDirection] = useState<"ascending" | "descending">(
    "descending"
  );

  const handleSort = useCallback(
    (column: number) => () => {
      if (column === currentColumn) {
        setDirection(direction === "ascending" ? "descending" : "ascending");

        return;
      }

      setCurrentColumn(column);
      setDirection("descending");
    },
    [direction, currentColumn]
  );

  const rows = useMemo(() => {
    const res = sortBy(
      [
        [
          "Issue name 010",
          null,
          -1,
          "Travel Expanse Automation [Excel]",
          false
        ],
        ["Issue name 142", new Date("05.24.2019"), 0, "Lemonade Factory", true],
        [
          "Issue name 062",
          new Date("05.22.2019"),
          30,
          "Netsuite Automation",
          true
        ],
        [
          "Issue name 011",
          new Date("05.17.2019"),
          60,
          "Netsuite Automation",
          true
        ],
        [
          "Issue name 008",
          new Date("05.11.2019"),
          0,
          "Travel Expanse Automation [Excel]",
          true
        ],
        [
          "Issue name 094",
          new Date("05.06.2019"),
          90,
          "Lemonade Factory",
          true
        ],
        ["Issue name 106", new Date("05.02.2019"), 30, "Lemonade Factory", true]
      ],
      currentColumn
    ) as TableRowProps[];

    if (direction === "descending") {
      return res.reverse();
    }

    return res;
  }, [currentColumn, direction]);

  return (
    <>
      <Header as="h1">Table</Header>
      <Table sortable>
        <Table.Header>
          {headers.map((h, i) => (
            <Table.HeaderCell
              content={h}
              key={h}
              onClick={handleSort(i)}
              sorted={currentColumn === i ? direction : null}
            />
          ))}
        </Table.Header>
        <Table.Body>
          {rows.map(cells => (
            <TableRow cells={cells} key={cells[0]} />
          ))}
        </Table.Body>

        <Header as="h1">Pagination</Header>
        <Pagination totalPages={10} activePage={2} />
        <Divider hidden />
        <Grid centered padded>
          <Pagination totalPages={10} activePage={2} />
        </Grid>
      </Table>
    </>
  );
};
