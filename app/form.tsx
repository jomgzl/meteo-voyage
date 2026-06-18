'use client'

export default function Search() {
  function search(formData :any) {
    const city = formData.get("city");
    console.log(city);
  }

  return (
    <form action={search}>
      <input name="city" />
      <button type="submit">Rechercher</button>
    </form>
  );
}
