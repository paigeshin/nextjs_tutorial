import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const CoffeeStore = () => {
  const router = useRouter();
  return (
    <div>
      Coffee Store Page {router.query.id}
      <Link href="/" scroll={false} prefetch>
        <a>Back to home</a>
      </Link>
      <Link href="/coffee-store/anything">
        <a>Go to page dynmaic</a>
      </Link>
    </div>
  );
};

export default CoffeeStore;
