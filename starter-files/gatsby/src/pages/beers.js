import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';

const BeerGridStyle = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyle = styled.div`
  border: 1px solid var(--grey);
  padding: 1rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`;

export default function BeersPage({ data }) {
  const beers = data.beers.nodes;
  return (
    <>
      <SEO title={`We have ${beers.length} beers!`} />
      <BeerGridStyle>
        {beers.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <SingleBeerStyle key={beer}>
              <img src={beer.image} alt={beer.name} />
              <h2>{beer.name}</h2>
              <p>price: ${beer.price}</p>
              <p title={`rating ${rating} out of 5 stars`}>
                {`⭐`.repeat(rating)}
                <span style={{ filter: 'grayscale(100%)' }}>
                  {`⭐`.repeat(5 - rating)}
                </span>
                <span>({beer.rating.reviews})</span>
              </p>
            </SingleBeerStyle>
          );
        })}
      </BeerGridStyle>
    </>
  );
}

export const query = graphql`
  query BeerQuery {
    beers: allBeer {
      nodes {
        name
        image
        price
        rating {
          average
          reviews
        }
      }
    }
  }
`;
