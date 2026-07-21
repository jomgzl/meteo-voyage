"use client";

import SearchIcon from "@mui/icons-material/Search";
import styles from "./form.module.scss";
import { useRouter, usePathname } from "next/navigation";

export default function Form() {
  const router = useRouter();
  const pathname = usePathname()

  function handleSubmission(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    router.replace(pathname + `?city=${e.target.city.value}`);
  }

  return (
    <div>
      <form onSubmit={handleSubmission}>
        <div
          className={`flex border-1 rounded-3xl pl-4 pr-14 pt-2 pb-2 gap-2 bg-white ${styles.inputStyle}`}
        >
          <SearchIcon sx={{ color: "#9aa4b0" }} />
          <input
            type="text"
            name="city"
            placeholder="Rechercher une ville..."
            className="placeholder:italic"
            required
          />
        </div>
      </form>
    </div>
  );
}


//  const router = useRouter();
//   const pathname = usePathname();
//   const urlWindows = window.location.href;
//   const url = new URL(urlWindows);
//   const queries = new URLSearchParams(url.search);
//   const cityParam = queries.has("city");

//   console.log("Pathname 1", queries);

//   function handleSubmission(e: React.SubmitEvent<HTMLFormElement>) {
//     e.preventDefault();
//     if (cityParam) {
//       queries.delete("city");
//       router.replace(pathname + queries + `?city=${e.target.city.value}`);
//     } else {
//       router.replace(pathname + queries + `?city=${e.target.city.value}`);
//     }
//   }
