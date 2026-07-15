// src/pages/EditCustomerPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";

import { useCustomers } from "../contexts/CustomerContextInstance";

import CustomerForm from "../components/CustomerForm";

import { API_BASE } from "../App";

import Spinner from "../components/Spinner";
import styles from "./EditCustomerPage.module.css";

function EditCustomerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { updateCustomer } = useCustomers();

  const [customer, setCustomer] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/customers/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCustomer(data);
      } catch (err) {
        console.error("Error loading customer details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  const handleSubmit = async (updatedFields) => {
    try {
      await updateCustomer({ ...customer, ...updatedFields });
      navigate(`/app/customers/${id}`);
    } catch (error) {
      console.error("Failed to update customer details:", error);
    }
  };

  if (loading) {
    return (
      <div className={styles.panel}>
        <Spinner size={8} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.panel}>
        <p>Error: {error}</p>
        <Link to="/app/customers">Back to Customers</Link>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <Link to={`/app/customers/${id}`} className={styles.backLink}>
        ← Back to Customer
      </Link>
      <h2 className={styles.name}>Edit customer</h2>
      <div className="form-panel">
        <CustomerForm
          initialValues={customer}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/app/customers/${customer.id}`)}
          submitLabel="Save"
        />
      </div>
    </div>
  );
}

export default EditCustomerPage;
