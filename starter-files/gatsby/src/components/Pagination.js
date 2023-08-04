import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const PaginationStyle = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  border: 1px solid var(--grey);
  text-align: center;

  & > * {
    padding: 1rem;
    border-right: 1px solid var(--grey);
    flex: 1;
    text-decoration: none;
    &[aria-current] {
      color: var(--red);
    }

    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

const Pagination = ({ base, pageSize, current, totalPage }) => {
  const pageCount = Math.ceil(totalPage / pageSize);
  const nextPage = current + 1;
  const prevPage = current - 1;
  const hasNextPage = nextPage <= pageCount;
  const hasPrevPage = prevPage >= 1;

  return (
    <PaginationStyle>
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        Prev
      </Link>
      {Array.from(Array(pageCount).keys()).map((i) => (
        <Link to={`${base}/${i + 1}`} key={i}>
          {i + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        Next
      </Link>
    </PaginationStyle>
  );
};

export default Pagination;
