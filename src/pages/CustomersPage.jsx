// src/pages/CustomersPage.jsx
import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

import { useAuth } from "../contexts/AuthContextInstance";
import { useCustomers } from "../contexts/CustomerContextInstance";

import CustomerCard from "../components/CustomerCard";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import Spinner from "../components/Spinner";

function CustomersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { hasRole } = useAuth();
  const { filteredCustomers, loading, error, searchTerm, setSearchTerm } =
    useCustomers();

  // Constants for pagination configurations
  const ITEMS_PER_PAGE = 7;

  // Read the raw page from the URL. Default to page 1 if not present or invalid.
  const rawPage = searchParams.get("page");

  const currentPage = parseInt(rawPage || "1", 10);

  // Calculate total pages based on your filtered results
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE),
  );

  // Correct the URL if someone manually types an invalid page number
  useEffect(() => {
    // Skip checking while data is still loading from the API
    if (loading) return;

    let validatedPage = currentPage;

    // Fix NaN, zero, or negative numbers typed into the URL
    if (isNaN(currentPage) || currentPage < 1) {
      validatedPage = 1;
    }
    // Fix numbers that exceed our max page count
    else if (currentPage > totalPages) {
      validatedPage = totalPages;
    }

    // If the URL value is wrong or missing entirely (?page= is empty)
    if (validatedPage !== currentPage || !rawPage) {
      const currentParams = Object.fromEntries(searchParams.entries());
      setSearchParams(
        { ...currentParams, page: validatedPage.toString() },
        { replace: true }, // Use 'replace' so it doesn't clutter their back-button history
      );
    }
  }, [
    rawPage,
    currentPage,
    totalPages,
    loading,
    searchParams,
    setSearchParams,
  ]);

  // Slice the customers array to only display the current page chunk
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  // Helper function to change pages while maintaining other search params (like search term)
  const handlePageChange = (newPageNumber) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({
      ...currentParams,
      page: newPageNumber,
    });
  };

  // Whenever a user types a new search query, reset them back to page 1 safely
  const handleSearchChange = (newTerm) => {
    setSearchTerm(newTerm); // This updates URL search text via context
    // Explicitly overwrite or clear the page param to avoid empty view offsets
    if (newTerm) {
      setSearchParams({ search: newTerm, page: "1" });
    } else {
      setSearchParams({ page: "1" });
    }
  };

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
          <div>
            <div className="customers">
              {paginatedCustomers.map((customer) => (
                <CustomerCard
                  key={customer.id}
                  customer={customer}
                  onSelect={(id) => navigate(`/app/customers/${id}`)}
                  searchTerm={searchTerm}
                />
              ))}
            </div>

            <div
              className="pagination-bar"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: "6px 12px",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
              >
                Previous
              </button>

              <span className="pagination-indicator">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: "6px 12px",
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomersPage;
