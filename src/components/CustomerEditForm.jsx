// src/components/CustomerEditForm.jsx
import { useState } from "react";

import { useCustomers } from "../contexts/CustomerContextInstance";

import PropTypes from "prop-types";

import CustomerForm from "./CustomerForm";

import styles from "./CustomerEditForm.module.css";

function CustomerEditForm({ customer, onDone }) {
  const { updateCustomer } = useCustomers();

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (updatedFields) => {
    setSaving(true);
    try {
      await updateCustomer(customer.id, updatedFields);
      onDone(updatedFields);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className={styles.name}>Edit customer</h2>
      <CustomerForm
        initialValues={customer}
        onSubmit={handleSubmit}
        onCancel={() => onDone(null)}
        submitLabel="Save"
        saving={saving}
      />
    </div>
  );
}

CustomerEditForm.propTypes = {
  customer: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
    company: PropTypes.string,
    notes: PropTypes.string,
    status: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onDone: PropTypes.func.isRequired,
};

export default CustomerEditForm;
