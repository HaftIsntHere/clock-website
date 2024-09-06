import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

function searchRedirect() {
    
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { search } = router.query;
      if (typeof search === "string") {
        router.replace(`/?search=${encodeURIComponent(search)}`);
      }
    }
  }, [router.isReady, router.query, router]);

  return null
}

export default searchRedirect;
