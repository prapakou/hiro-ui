import React, { useCallback, useState, ReactNode, useEffect } from "react";
import {
  Pagination,
  PaginationProps,
  List,
  Grid,
  Segment,
  Placeholder
} from "semantic-ui-react";
import { MappedTypes } from "@hiro-graph/orm-mappings";
import { GraphVertex } from "@hiro-graph/orm";

import { useGraphQuery } from "../stores";

export interface LasyListProps {
  entity: MappedTypes;
  item: ReactNode;
  limit?: number;
  offset?: number;
}

const renderPlaceholder = (limit: number) => {
  const output: JSX.Element[] = [];

  for (let i = 0; i < limit; i += 1) {
    output.push(
      <Placeholder key={`list-placeholder-${i}`}>
        <Placeholder.Header image>
          <Placeholder.Line />
        </Placeholder.Header>
      </Placeholder>
    );
  }

  return output;
};

export const LazyList: React.FC<LasyListProps> = ({
  entity,
  item,
  limit = 20
}) => {
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

  const renderItem = useCallback(
    (r: GraphVertex) => <List.Item as={item} value={r as any} key={r._id} />,
    [item]
  );

  return (
    <Segment>
      <List divided>
        {loading && !response.length
          ? renderPlaceholder(limit)
          : response.map(renderItem)}
      </List>

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
