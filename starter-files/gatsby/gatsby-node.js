import path from 'path';
import _fetch from 'isomorphic-fetch';

async function turnPizzaIntoPages({ graphql, actions }) {
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingIntoPage({ graphql, actions }) {
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);

  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
      },
    });
  });
}

async function turnSlicemastersintoPage({ graphql, actions }) {
  const slicemasterTemplate = path.resolve('./src/pages/slicemasters.js');
  const slicemasterSinglePageTemplate = path.resolve(
    './src/templates/Slicemaster.js'
  );
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          slug {
            current
          }
          id
        }
      }
    }
  `);
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const totalPage = Math.ceil(data.slicemasters.totalCount / pageSize);

  Array.from(Array(totalPage).keys()).forEach((i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: slicemasterTemplate,
      context: {
        skip: i * pageSize,
        current: i + 1,
        pageSize,
      },
    });
  });

  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      path: `/slicemaster/${slicemaster.slug.current}`,
      component: slicemasterSinglePageTemplate,
      context: {
        slug: slicemaster.slug.current,
      },
    });
  });
}

async function fetchTurnBeerIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();

  beers.forEach((beer) => {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };

    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  });
}

async function fetchTurnProductIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1. fetch list of product
  const res = await fetch('https://dummyjson.com/products?limit=5');
  const { products } = await res.json();

  // 2. loop over each one
  products.forEach((product) => {
    // 1. create node for each products
    const nodeMeta = {
      id: createNodeId(`product-${product.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'Product',
        mediaType: 'application/json',
        contentDigest: createContentDigest(product),
      },
    };
    // 3. create node for product
    actions.createNode({
      ...product,
      ...nodeMeta,
    });
  });
}

export async function sourceNodes(params) {
  // fetch a lsit of product and source to gatsby api
  await Promise.all([
    fetchTurnProductIntoNodes(params),
    fetchTurnBeerIntoNodes(params),
  ]);
}

export async function createPages(params) {
  await Promise.all([
    turnPizzaIntoPages(params),
    turnToppingIntoPage(params),
    turnSlicemastersintoPage(params),
  ]);
}
