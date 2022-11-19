import { gql, useShopQuery, useRouteParams, useServerAnalytics, ShopifyAnalyticsConstants, Seo } from "@shopify/hydrogen";
import { Suspense } from "react";

import { Layout } from "../../components/Layout.server";
import ProductCard from "../../components/ProductCard.server";
import styles from './collectionPage.module.css'


export default function Collection() {
  const { handle } = useRouteParams();

  const {
    data: { collection },
  } = useShopQuery({
    query: QUERY,
    variables: {
      handle,
    },
  });

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.collection,
      resourceId: collection.id,
    },
  });

  return (
    <Layout>
      <Suspense>
        <Seo type="collection" data={collection} />
      </Suspense>

      <section className="aboveFold">
        <h2> Discover the {collection.title} </h2>
        {collection.description && (<p className={styles.collectionDescription}> {collection.description}</p>)}
      </section>
      <section className={styles.productList}>
        {collection.products.nodes.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </Layout>
  );
}

const QUERY = gql`
  query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: 8) {
        nodes {
          id
          title
          publishedAt
          handle
          variants(first: 1) {
            nodes {
              id
              image {
                url
                altText
                width
                height
              }
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;