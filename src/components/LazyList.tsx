import React, { useCallback, useState, ReactNode, useEffect } from "react";
import {
  Pagination,
  PaginationProps,
  List,
  Grid,
  Segment,
  Loader,
  Header,
  ListItemProps
} from "semantic-ui-react";
import { MappedTypes } from "@hiro-graph/orm-mappings";
import { GraphVertex } from "@hiro-graph/orm";

import { useGraphQuery } from "../stores";

export interface LasyListProps {
  entity: MappedTypes;
  item?: ReactNode;
  limit?: number;
  offset?: number;
  children?: (props: ListItemProps & { "data-value": any }) => ReactNode;
}

const renderPlaceholder = (limit: number) => {
  const output: JSX.Element[] = [];

  for (let i = 0; i < limit; i += 1) {
    const key = `list-placeholder-${i}`;
    output.push(
      <List.Item key={key}>
        <Loader active size="small" inline="centered" />
      </List.Item>
    );
  }

  return output;
};

export const LazyList: React.FC<LasyListProps> = ({
  entity,
  item,
  limit = 20,
  children
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

  const renderChildren = useCallback(
    (r: GraphVertex) => children && children({ "data-value": r, key: r._id }),
    [item, children]
  );

  let content: ReactNode = null;

  if (loading && !response.length) {
    content = renderPlaceholder(limit);
  } else if (!loading && !response.length) {
    content = <Header content="No results" textAlign="center" block />;
  } else if (children && typeof children === "function") {
    content = response.map(renderChildren);
  } else {
    content = response.map(renderItem);
  }

  return (
    <Segment padded>
      <List divided>{content}</List>

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
