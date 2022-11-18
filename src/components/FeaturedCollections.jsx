import { Link, Image, gql, useShopQuery, CacheLong } from "@shopify/hydrogen";

export default function FeaturedCollections() {
	const {
		data: { collections },
	} = useShopQuery({
		query: QUERY,
		cache: CacheLong(),
	});

	return (
		<section className="featured-products--section">
			<h2>Featured Collections</h2>
			<div className="featured-products--wrapper">
				{collections.nodes.map((collection) => {
					return (
						<Link key={collection.id} className="featured-products--card" to={`/collections/${collection.handle}`}>
								<Image
									alt={`Image of ${collection.title}`}
									data={collection.image}
								/>
								<h3>
									{collection.title}
								</h3>
						</Link>
					);
				})}
			</div>
		</section>
	);
}

const QUERY = gql`
	query FeaturedCollections {
		collections(first: 3, sortKey: UPDATED_AT) {
			nodes {
				id
				title
				handle
				image {
          altText
          width
          height
          url
        }
			}
		}
	}
`;