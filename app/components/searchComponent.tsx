"use client";

import { usePathname, useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const search = searchParams?.get("city");

  console.log("Search Param:", searchParams);
  console.log("Search", search);
  console.log("Pathname is:", pathName);

  return <>Search : {search}</>;
}


// Use router.push to update the url with a new city
// Use router.replace to avoid refreshing the page
// Create a new URL with new URLSearchParam()