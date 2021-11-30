import { getSession } from "next-auth/client";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <div className='bg-gray-200'>
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      {/* ---- Header part of the build ---- */}
      <Header />
      {/* ---- The main part of the build---- */}
      <main className='max-w-screen-2xl mx-auto'>
        {/* banner */}
        <Banner />
        {/* products */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

//server side render of the products
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const products = await fetch("http://fakestoreapi.com/products").then((res) =>
    res.json(),
  );

  return {
    props: {
      products: products,
      session,
    },
  };
}
