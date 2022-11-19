import { Link, Image, Money } from "@shopify/hydrogen";
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
	const { priceV2: price, compareAtPriceV2: compareAtPrice } =
		product.variants?.nodes[0] || {};

	const isDiscounted = compareAtPrice?.amount > price?.amount;

	return (
		<Link to={`/products/${product.handle}`}>
			{isDiscounted && (
				<label className={styles.saleLabel}>Sale</label>
			)}
			<Image className={styles.productImage} data={product.variants.nodes[0].image} />
			<div className={styles.productInfo_container}>
				<h4>{product.title}</h4>
				<span className={styles.price_container}>
					{isDiscounted && (
						<Money
							className={styles.price}
							data={compareAtPrice}
						/>
					)}
					<Money data={price} />
				</span>
			</div>
		</Link>
	);
}