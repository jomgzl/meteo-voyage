import { useSearchParams } from "next/navigation";

export default function useParamCity() {
  const searchParams = useSearchParams();
  const city = searchParams?.get("city");

  return city;
}
