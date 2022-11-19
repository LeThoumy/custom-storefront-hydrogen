import { useShopQuery, CacheLong, gql, useUrl, Link, Seo } from "@shopify/hydrogen";
import { Suspense } from "react";
import Navbar from "./Navbar.server";



export function Layout({ children }) {
	const { pathname } = useUrl();
	/* const isHome = pathname === "/"; */

	const {
		data: { shop },
	} = useShopQuery({
		query: SHOP_QUERY,
		cache: CacheLong(),
		preload: true,
	});

	return (
		<>
			<Suspense>
				<Seo
					type="defaultSeo"
					data={{
						title: shop.name,
						description: shop.description,
					}}
				/>
			</Suspense>
			<div>
				<Navbar />
				<main role="main" id="mainContent">
					<Suspense>{children}</Suspense>
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
