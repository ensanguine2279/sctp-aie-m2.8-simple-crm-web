// src/components/CustomerForm.jsx
import { use, useState } from "react";

import PropTypes from "prop-types";

import styles from "./CustomerEditForm.module.css"; // Using your shared styling file

const ALL_TAGS = ["VIP", "Lead", "Referral"];

const defaultFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  notes: "",
  status: "active",
  tags: [],
};

function CustomerForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Save",
}) {
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form state using provided initial values or defaults
  const [formData, setFormData] = useState({
    ...defaultFormValues,
    ...initialValues,
    // Safely verify phone and notes fallback to empty strings if missing
    phone: initialValues?.phone || "",
    company: initialValues?.company || "",
    notes: initialValues?.notes || "",
    tags: initialValues?.tags || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      // Handle or log errors locally if needed, or let them bubble up
      console.error("Form submission error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.section}>
        <div className={styles.editField}>
          <label className={styles.sectionLabel} htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className={styles.input}
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.editField}>
          <label className={styles.sectionLabel} htmlFor="lastName">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className={styles.input}
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.editField}>
          <label className={styles.sectionLabel} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.editField}>
          <label className={styles.sectionLabel} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            className={styles.input}
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className={styles.editField}>
          <label className={styles.sectionLabel} htmlFor="company">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className={styles.input}
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        <div className={styles.editField}>
          <label className={styles.sectionLabel} htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            className={styles.input}
            value={formData.notes}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className={styles.editField}>
          <label className={styles.sectionLabel} htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            className={styles.input}
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className={styles.editField}>
          <label className={styles.sectionLabel}>Tags</label>
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "4px",
            }}
          >
            {ALL_TAGS.map((tag) => {
              const isTagSelected = formData.tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  style={{
                    padding: "4px 12px",
                    border: "1px solid",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                    background: isTagSelected ? "var(--primary-100)" : "white",
                    borderColor: isTagSelected
                      ? "var(--primary-500)"
                      : "var(--border-default)",
                    color: isTagSelected
                      ? "var(--primary-700)"
                      : "var(--text-body)",
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.editActions}>
        <button type="submit" className={styles.saveButton} disabled={isSaving}>
          {isSaving ? "Saving..." : submitLabel}
        </button>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

CustomerForm.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    company: PropTypes.string,
    notes: PropTypes.string,
    status: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
};

export default CustomerForm;
