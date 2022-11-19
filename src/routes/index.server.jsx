import { Suspense } from "react";
import FeaturedCollections from "../components/FeaturedCollections.server";
import { Layout } from "../components/Layout.server"
import styles from './index.module.css'

export default function Home() {
  return (
    <Layout className={styles.page_wrapper}>
      <section className={styles.aboveFold}>
        <h1>A quality desk tailored to your needs right at your fingertips.</h1>
      </section>
      <Suspense>
        <FeaturedCollections />
      </Suspense>
    </Layout>
  );
}
