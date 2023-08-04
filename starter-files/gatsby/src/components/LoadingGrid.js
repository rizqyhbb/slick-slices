import React from 'react';
import { ItemStyles, ItemsGrid } from '../styles/Grids';

const LoadingGrid = ({ count }) => (
  <ItemsGrid>
    {Array.from(Array(count).keys()).map((idx) => (
      <ItemStyles key={idx}>
        <p>
          <span className="mark">Loading...</span>
        </p>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/48/BLANK_ICON.png"
          className="loading"
          alt="loading"
          width={500}
          height={400}
        />
      </ItemStyles>
    ))}
  </ItemsGrid>
);

export default LoadingGrid;
