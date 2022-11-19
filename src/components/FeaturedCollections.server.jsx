import { Link, Image, gql, useShopQuery, CacheLong } from "@shopify/hydrogen";
import styles from './FeaturedCollections.module.css'

export default function FeaturedCollections() {

	const {
		data: { collections },
	} = useShopQuery({
		query: QUERY,
		cache: CacheLong(),
	});

	return (
		<section>
			<h2 className={styles.title}>Featured Collections</h2>
			<div className={styles.collections_wrapper}>
				{collections.nodes.map((collection) => {
					return (
						<Link key={collection.id} to={`/collections/${collection.handle}`}>
							<Image className={styles.collection_image}
								alt={`Image of ${collection.title}`}
								data={collection.image}
							/>
							<h4>
								{collection.title}
							</h4>
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