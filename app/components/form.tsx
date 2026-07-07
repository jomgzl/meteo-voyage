"use client";

import { ICity } from "@/app/types/city";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./form.module.scss";

interface IProps {
  setCityUser: (name: ICity["name"]) => void;
}

export default function Form({ setCityUser }: IProps) {
  function handleSubmission(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setCityUser(e.target.city.value);
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
