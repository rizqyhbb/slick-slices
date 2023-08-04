import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const SlicemasterGrid = styled.div`
  display: grid;
  padding: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const SingleSlicemaster = styled.div`
  a {
    text-decoration: none;
  }

  .gatsby-image-wrapper {
    height: 400px;
  }

  h2 {
    transform: rotate(-2deg);
    position: relative;
    text-align: center;
    z-index: 2;
    font-size: 4rem;
    margin-bottom: -2rem;
  }

  .description {
    background-color: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    position: relative;
    z-index: 2;
    transform: rotate(1deg);
    text-align: center;
  }
`;

export default function SlicemastersPage({ data, pageContext }) {
  const slicemasters = data.slicemasters.nodes;
  const { current, pageSize } = pageContext;
  return (
    <>
      <SEO title={`Slicemaster page - ${current || 1}`} />
      <Pagination
        base="/slicemasters"
        current={current}
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalPage={data.slicemasters.totalCount}
      />
      <SlicemasterGrid>
        {slicemasters.map((person) => (
          <SingleSlicemaster key={person.id}>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} alt={person.name} />
            <p className="description">{person.description}</p>
          </SingleSlicemaster>
        ))}
      </SlicemasterGrid>
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 4) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
