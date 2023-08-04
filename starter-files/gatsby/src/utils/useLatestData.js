import React, { useEffect, useState } from 'react';

const gql = String.raw;

const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

const useLatestData = () => {
  // hot slices
  const [hotSlices, setHotSlices] = useState();

  // slicemasters
  const [slicemasters, setSlicemasters] = useState();

  // use sideeffect to fetch the data from the graphql endpoint
  useEffect(() => {
    // when the component load fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSetting(id: "downtown") {
              storeName
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO check if any errors
        setHotSlices(res.data.StoreSetting.hotSlices);
        setSlicemasters(res.data.StoreSetting.slicemaster);
      })
      .catch((err) => console.log(err));
  }, []);

  return { hotSlices, slicemasters };
};

export default useLatestData;
