import { useUrl, Link, Image } from "@shopify/hydrogen"
import styles from './Navbar.module.css'

export default function Navbar() {
	return (
		<nav className={styles.nav_container}>
			<Link className={styles.navLink} to="/">
				<Image className={styles.logo} src="/img/Logo.svg" width={60} height={60} alt="my logo" />
			</Link>
			<a className={styles.navLinks} href="#mainContent">See Products → </a>
		</nav>
	)
}