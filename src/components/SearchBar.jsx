// src/components/SearchBar.jsx (first attempt)
import { useCustomers } from "../contexts/CustomerContextInstance";

import styles from "./SearchBar.module.css";

function SearchBar() {
  const { searchTerm, setSearchTerm } = useCustomers();

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
