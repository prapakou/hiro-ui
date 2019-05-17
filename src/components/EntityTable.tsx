import React, { useCallback, useState, ReactNode, useEffect } from "react";
import {
  Pagination,
  PaginationProps,
  Grid,
  Segment,
  Loader,
  Table,
  TableProps
} from "semantic-ui-react";
import { MappedTypes } from "@hiro-graph/orm-mappings";

import { useGraphQuery } from "../stores";

type EntityTableProps = TableProps & {
  entity: MappedTypes;
  item?: ReactNode;
};

const renderPlaceholder = (index: number) => {
  return (
    <Table.Row key={`loader-${index}`}>
      <Table.Cell width="16">
        <Loader active size="small" inline="centered" />
      </Table.Cell>
    </Table.Row>
  );
};

export const EntityTable: React.FC<EntityTableProps> = props => {
  const { entity, limit = 20, renderBodyRow, ...tableProps } = props;

  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);

  const { send: findCount, response: count } = useGraphQuery({
    entity,
    method: "findCount"
  });
  const { send: find, response = [], loading } = useGraphQuery(
    {
      entity,
      method: "find",
      args: [
        {},
        {
          limit,
          offset
        }
      ]
    },
    [entity, limit, offset]
  );

  const onPageChange = useCallback(
    (_, { activePage }: PaginationProps) => {
      const p = activePage as number;
      setPage(p);
      setOffset((p - 1) * limit);
    },
    [limit]
  );

  useEffect(() => {
    const cancel = findCount();

    return cancel;
  }, [entity]);

  useEffect(() => {
    const cancel = find();

    return cancel;
  }, [page, entity]);

  return (
    <Segment padded>
      <Table
        {...tableProps}
        tableData={response.length ? response : new Array(limit)}
        renderBodyRow={(data, index) => {
          if (loading && !response.length) {
            return renderPlaceholder(index);
          }

          if (renderBodyRow) {
            return renderBodyRow(data, index);
          }

          return null;
        }}
      />

      <Grid centered padded>
        <Pagination
          disabled={!count}
          defaultActivePage={page}
          totalPages={count ? Math.ceil(count / limit) : 1}
          onPageChange={onPageChange}
        />
      </Grid>
    </Segment>
  );
};
