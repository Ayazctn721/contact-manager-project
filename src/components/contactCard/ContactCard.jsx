import { useState } from "react";
import { useNavigate } from "react-router";
import GlassCard from "../glassCard/GlassCard";
import "./ContactCard.css";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { BsFillBookmarkDashFill } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { CgRemoveR } from "react-icons/cg";
import { IoMdContact } from "react-icons/io";
import {
  addToFavorites,
  fetchContacts,
  deleteFromFavorites,
  deleteContact,
  editContact,
} from "../../utils/api";
import { useGlobalStore } from "../../hooks/useGlobalStore.js";
import EditContactForm from "../editContactForm/EditContactForm"; // Import the new component

function ContactCard({
  base64_image,
  city,
  email,
  full_name,
  id,
  is_favorite,
  phone_number,
}) {
  const { store, dispatch } = useGlobalStore();
  const [isFav, setIsFav] = useState(is_favorite);
  const [isEditing, setIsEditing] = useState(false); // New state variable
  const navigate = useNavigate();

  const handleDelete = async () => {
    console.log("Deleting contact with id: ", id);
    try {
      await deleteContact(store.user.user_id, id);
      const getContactsResponse = await fetchContacts(store.user.user_id);
      console.log("Fetched Contacts: ", getContactsResponse);
      dispatch({ type: "SET_CONTACTS", payload: getContactsResponse });
    } catch (e) {
      console.error("Error deleting contact:", e);
    }
  };

  const handleEdit = () => {
    setIsEditing(true); // Toggle the edit form visibility
  };

  const handleEditSubmit = async (updatedContact) => {
    console.log("Editing contact with id: ", id);
    try {
      await editContact(store.user.user_id, id, updatedContact);
      const getContactsResponse = await fetchContacts(store.user.user_id);
      console.log("Fetched Contacts: ", getContactsResponse);
      dispatch({ type: "SET_CONTACTS", payload: getContactsResponse });
      setIsEditing(false); // Close the edit form
    } catch (e) {
      console.error("Error editing contact:", e);
    }
  };

  const handleFavorite = async () => {
    setIsFav((prev) => !prev);

    try {
      if (isFav) {
        await deleteFromFavorites(store.user.user_id, id);
      } else {
        await addToFavorites(store.user.user_id, id);
      }

      const getContactsResponse = await fetchContacts(store.user.user_id);
      console.log("Fetched Contacts: ", getContactsResponse);
      dispatch({ type: "SET_CONTACTS", payload: getContactsResponse });
    } catch (e) {
      console.log(e);
    }
  };

  const handleProfileClick = () => {
    navigate(`/profile/${id}`);
  };

  return (
    <GlassCard type="glass-contact-card">
      {isEditing && (
        <EditContactForm
          contact={{ base64_image, city, email, full_name, id, phone_number }}
          onSubmit={handleEditSubmit}
          onCancel={() => setIsEditing(false)}
        />
      )}
      {/* Conditionally render the contact details only if not editing */}
      {!isEditing && (
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start align-items-center">
            <button
              onClick={handleFavorite}
              className="btn border border-0 m-0 p-0"
            >
              {isFav ? (
                <BsFillBookmarkCheckFill className="fs-5 text-primary opacity-75" />
              ) : (
                <BsFillBookmarkDashFill className="fs-5 text-light opacity-25" />
              )}
            </button>
            <div
              className="image-container"
              onClick={handleProfileClick}
              style={{ cursor: "pointer" }}
            >
              {base64_image ? (
                <img
                  className="profile-image ms-4 "
                  src={base64_image}
                  alt="Profile image"
                />
              ) : (
                <IoMdContact className="placeholder-image ms-4" />
              )}
            </div>
            <div className="text-light ms-5">
              <div
                className="fs-6 fw-bold cust-border "
                onClick={handleProfileClick}
                style={{ cursor: "pointer" }}
              >
                {full_name}
              </div>
              <div className="card-info-secondary">{phone_number}</div>
              <div className="card-info-secondary">{email}</div>
              <div className="card-info-secondary">{city}</div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <button className="btn border-0 btn-sm m-0 p-0 text-warning">
              <CiEdit onClick={handleEdit} className="fs-1 opacity-50" />
            </button>

            <button className="btn border-0 btn-sm m-0 p-0 text-danger">
              <CgRemoveR onClick={handleDelete} className="fs-1 opacity-50" />
            </button>
          </div>
        </div>
      )}
    </GlassCard>
  );
}

export default ContactCard;