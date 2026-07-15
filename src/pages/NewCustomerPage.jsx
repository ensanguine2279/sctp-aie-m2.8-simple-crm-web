// src/pages/NewCustomerPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router";

import { useCustomers } from "../contexts/CustomerContextInstance";

import CustomerForm from "../components/CustomerForm";

const ALL_TAGS = ["VIP", "Lead", "Referral"];

function NewCustomerPage() {
  const { addCustomer, submitting } = useCustomers();
  const navigate = useNavigate();

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    status: "active",
    tags: [],
  };

  const handleSubmit = async (formData) => {
    const newCustomer = await addCustomer({
      ...formData,
      //company: "",
      //notes: "",
      createdAt: new Date().toISOString().slice(0, 10),
    });
    navigate(`/app/customers/${newCustomer.id}`);
  };

  return (
    <div>
      <Link to="/app/customers" className="back-link">
        ← Back to Customers
      </Link>
      <h1>Add New Customer</h1>

      <CustomerForm
        initialValues={defaultValues}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/app/customers")}
        submitLabel="Add"
      />
    </div>
  );
}

export default NewCustomerPage;
