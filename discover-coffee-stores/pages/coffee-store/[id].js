import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import coffeeStoresData from "../../data/coffee-stores.json";

// This code runs on the server
export function getStaticProps(staticProps) {
  const params = staticProps.params;
  return {
    props: {
      coffeeStore: coffeeStoresData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id; //dynamic id
      }),
    },
  };
}

// This code runs on the server
// Provide path
export function getStaticPaths() {
  const paths = coffeeStoresData.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
    // fallback => false
    // - connect to 404 page
    // fallback => true
    // 1. for first user, show loading state
    // 2. caching starts
    // 2. After that, show cached page for the second user.
  };
}

const CoffeeStore = (props) => {
  console.log(props);

  // router.query.id
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { address, name, neighbourhood } = props.coffeeStore;

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href="/" scroll={false} prefetch>
        <a>Back to home</a>
      </Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
    </div>
  );
};

export default CoffeeStore;
