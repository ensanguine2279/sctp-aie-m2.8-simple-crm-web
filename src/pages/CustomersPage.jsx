// src/pages/CustomersPage.jsx
import { Link, useNavigate } from "react-router";

import { useAuth } from "../contexts/AuthContextInstance";
import { useCustomers } from "../contexts/CustomerContextInstance";

import CustomerCard from "../components/CustomerCard";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import Spinner from "../components/Spinner";

function CustomersPage() {
  const { filteredCustomers, loading, error, searchTerm } = useCustomers();

  const { hasRole } = useAuth();

  const navigate = useNavigate();

  if (loading) return <Spinner />;
  if (error) return <p className="status-message error">Error: {error}</p>;

  return (
    <div>
      <div className="page-header">
        <h1>Customers</h1>
        {hasRole("admin") && (
          <Link to="/app/customers/new" className="btn-primary-link">
            Add Customer
          </Link>
        )}
      </div>

      <StatusFilter />

      <SearchBar />

      <div className="customer-list">
        <h2>Customers ({filteredCustomers.length})</h2>
        {filteredCustomers.length === 0 ? (
          <p className="empty-state">
            {searchTerm
              ? "No customers match your search."
              : "No customers yet."}
          </p>
        ) : (
          <div className="customers">
            {filteredCustomers.map((customer) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                onSelect={(id) => navigate(`/app/customers/${id}`)}
                searchTerm={searchTerm}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomersPage;
