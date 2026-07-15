// src/components/StatusFilter.jsx
import { useCustomers } from "../contexts/CustomerContextInstance";

import styles from "./StatusFilter.module.css";

function StatusFilter() {
  const statuses = ["all", "active", "inactive"];

  const { statusFilter, setStatusFilter } = useCustomers();

  return (
    <div className={styles.filterContainer}>
      <span className={styles.label}>Status:</span>

      {statuses.map((status) => {
        const isActive = statusFilter === status;

        return (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`${styles.filterButton} ${isActive ? styles.activeButton : ""}`}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
}

export default StatusFilter;
