import { ProductOptionsProvider, MediaFile, ProductPrice, BuyNowButton, useProductOptions, Money } from "@shopify/hydrogen";
import styles from './ProductDetails.module.css'


export default function ProductDetails({ product }) {
	const { priceV2: price } = product.variants?.nodes[0] || {};

	return (
		<ProductOptionsProvider data={product}>
			<section className={styles.product_wrapper}>
				<ProductGallery className={styles.mediaWrapper} media={product.media.nodes} />
				<div className={styles.productDescription_wrapper}>
					<div className={styles.inline_wrapper}>
						<h4 className={styles.productDescription_title}>{product.title}</h4>
						<Money data={price} />
					</div>
					<p className={styles.productDescription_description} dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></p>
					<BuyBtn />
				</div>
			</section>
		</ProductOptionsProvider>
	)
}
function ProductGallery({ media }) {
	if (!media.length) {
		return null;
	}
	return (
		<div>
			{media.map((med, i) => {
				let extraProps = {};

				if (med.mediaContentType === "MODEL_3D") {
					extraProps = {
						interactionPromptThreshold: "0",
						ar: true,
						loading: "eager",
						disableZoom: true,
					};
				}

				const data = {
					...med,
					image: {
						...med.image,
						altText: med.alt || "Product image",
					},
				};

				return (
					<div className={styles.mediaContainer} key={med.id || med.image.id} >
						<MediaFile
							tabIndex="0"
							className={styles.media}
							data={data}
							options={{
								crop: "center",
							}}
							{...extraProps}
						/>
					</div>
				);
			})}
		</div>
	)
}

function BuyBtn({ product }) {
	const { selectedVariant } = useProductOptions();
	return (
		<BuyNowButton className={styles.buyBtn} variantId={selectedVariant.id}>
			<span>
				Buy it now
			</span>
		</BuyNowButton>
	)
}
