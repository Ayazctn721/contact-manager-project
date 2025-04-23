import { useState } from "react";
import { useGlobalStore } from "../../hooks/useGlobalStore";

function EditContactForm({ contact, onSubmit, onCancel }) {
  const { store, _ } = useGlobalStore();
  const contactRef = { ...contact, user_id: store.user.user_id };
  const [updatedContact, setUpdatedContact] = useState(contactRef);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated contact before submit:", updatedContact);
    onSubmit(updatedContact);
  };

  return (
    <form onSubmit={handleSubmit} className="container p-4 rounded ">
      <h4 className="text-danger text-center mb-4">Edit Contact</h4>
      <div className="mb-3 row">
        <label
          className="col-sm-3 col-form-label text-white"
          htmlFor="full_name"
        >
          Full Name:
        </label>
        <div className="col-sm-9">
          <input
            type="text"
            name="full_name"
            className="form-control "
            value={updatedContact.full_name}
            onChange={handleChange}
            placeholder="Enter full name"
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label
          className="col-sm-3 col-form-label text-white"
          htmlFor="phone_number"
        >
          Phone Number:
        </label>
        <div className="col-sm-9">
          <input
            type="text"
            name="phone_number"
            className="form-control "
            value={updatedContact.phone_number}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-3 col-form-label text-white" htmlFor="email">
          Email:
        </label>
        <div className="col-sm-9">
          <input
            type="email"
            name="email"
            className="form-control "
            value={updatedContact.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-3 col-form-label text-white" htmlFor="city">
          Adress:
        </label>
        <div className="col-sm-9">
          <input
            type="text"
            name="city"
            className="form-control "
            value={updatedContact.city}
            onChange={handleChange}
            placeholder="Enter city"
          />
        </div>
      </div>
      <div className="d-flex justify-content-end gap-2">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditContactForm;