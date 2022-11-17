import { useShopQuery, CacheLong, gql, useUrl, Link, Seo } from "@shopify/hydrogen";


export function Layout({ children }) {
	const { pathname } = useUrl();
	const isHome = pathname === "/";

	const {
		data: { shop },
	} = useShopQuery({
		query: SHOP_QUERY,
		cache: CacheLong(),
		preload: true,
	});

	return (
		<>
			<Seo
				type="defaultSeo"
				data={{
					title: shop.name,
					description: shop.description,
				}}
			/>
			<div className="layoutWrapper">
				<header>
					<Link className="logoName" to="/">{shop.name}</Link>
					<a href="#mainContent">See Products</a>
				</header>

				<main role="main" id="mainContent">
					{children}
				</main>
			</div>
		</>
	);
}

const SHOP_QUERY = gql`
  query ShopInfo {
    shop {
      name
      description
    }
  }
`;
