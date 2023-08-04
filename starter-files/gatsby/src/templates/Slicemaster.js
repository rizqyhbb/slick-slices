import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

const SingleSlicemasterPage = ({ data }) => {
  const { slicemaster } = data;
  console.log(slicemaster);
  return (
    <>
      <SEO
        title={slicemaster.name}
        image={slicemaster.image?.asset?.fluid?.src}
      />
      <div>
        <p>{slicemaster.name}</p>
        <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
        <p>{slicemaster.description}</p>
      </div>
    </>
  );
};

export default SingleSlicemasterPage;

export const query = graphql`
  query($slug: String) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      id
      name
      description
      image {
        asset {
          fluid(maxWidth: 200) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
