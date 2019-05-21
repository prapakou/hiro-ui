import React, { useCallback } from "react";

import { Grid, Header, Segment, Table, TableProps } from "../../src";

export const TableDemo = () => {
  const renderTable = useCallback(
    (props?: TableProps) => (
      <Table {...props}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell icon="user" content="Name" />
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell positive>John</Table.Cell>
            <Table.Cell>Approved</Table.Cell>
            <Table.Cell>None</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jamie</Table.Cell>
            <Table.Cell negative>Approved</Table.Cell>
            <Table.Cell>Requires call</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jill</Table.Cell>
            <Table.Cell>Denied</Table.Cell>
            <Table.Cell disabled>None</Table.Cell>
          </Table.Row>
          <Table.Row warning>
            <Table.Cell>Joe</Table.Cell>
            <Table.Cell>Denied</Table.Cell>
            <Table.Cell>None</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    ),
    []
  );

  return (
    <Segment basic padded>
      <Header dividing>Table</Header>
      <Grid columns="2" stackable>
        <Grid.Column>Default {renderTable()}</Grid.Column>
        <Grid.Column>Inverted {renderTable({ inverted: true })}</Grid.Column>
        <Grid.Column>Basic {renderTable({ basic: true })}</Grid.Column>
        <Grid.Column>Celled {renderTable({ celled: true })}</Grid.Column>
        <Grid.Column>Striped {renderTable({ striped: true })}</Grid.Column>
        <Grid.Column>Compact {renderTable({ compact: true })}</Grid.Column>
        <Grid.Column>Fixed {renderTable({ fixed: true })}</Grid.Column>
      </Grid>
    </Segment>
  );
};
