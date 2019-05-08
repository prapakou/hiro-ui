import React, { useCallback, useState, ReactNode, useEffect } from "react";
import {
  Pagination,
  PaginationProps,
  Container,
  List,
  Grid,
  Segment
} from "semantic-ui-react";
import { MappedTypes } from "@hiro-graph/orm-mappings";

import { useGraphDispatch } from "../stores";

export interface LasyListProps {
  entity: MappedTypes;
  item: ReactNode;
  limit?: number;
  offset?: number;
}

export const LazyList: React.FC<LasyListProps> = ({
  entity,
  item,
  limit = 20
}) => {
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const { sendQuery } = useGraphDispatch();

  const onPageChange = useCallback(
    (_, { activePage }: PaginationProps) => {
      const p = activePage as number;
      setPage(p);
      setOffset((p - 1) * limit);
    },
    [limit]
  );

  useEffect(() => {
    const cancel = sendQuery({
      entity,
      method: "find",
      args: [
        {},
        {
          limit,
          offset
        }
      ]
    });

    return cancel;
  }, [sendQuery, limit, offset, entity]);

  return (
    <Segment>
      <List divided>
        <List.Item as={item} value="test" />
      </List>

      <Grid centered padded>
        <Pagination
          boundaryRange={0}
          defaultActivePage={page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={2}
          totalPages={page + 4}
          onPageChange={onPageChange}
        />
      </Grid>
    </Segment>
  );
};
