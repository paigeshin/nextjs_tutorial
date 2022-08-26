import { useRouter } from "next/router";
import Link from "next/link";

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
  return {
    paths: [
      { params: { id: "0" } },
      { params: { id: "1" } },
      { params: { id: "300" } },
    ],
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
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Coffee Store Page {router.query.id}
      <Link href="/" scroll={false} prefetch>
        <a>Back to home</a>
      </Link>
      <Link href="/coffee-store/anything">
        <a>Go to page dynmaic</a>
      </Link>
      <p>{props.coffeeStore.address}</p>
      <p>{props.coffeeStore.name}</p>
    </div>
  );
};

export default CoffeeStore;
