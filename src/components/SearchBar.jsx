import { BsSearch, BsX } from "react-icons/bs";

export default function SearchBar() {
  return (
    <div className="search-bar">
      <form action="">
        <label className="icon" htmlFor="searchField">
          <BsSearch />
        </label>
        <input type="text" name="searchQuery" id="searchField" />
        <button className="clear" title="clear field" type="reset">
          <BsX />
        </button>
        <button type="submit" className="search">search</button>
      </form>
    </div>
  )

}