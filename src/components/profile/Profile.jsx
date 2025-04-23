import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchContacts } from "../../utils/api";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import "./Profile.css";
import GlassCard from "../glassCard/GlassCard";
import { IoMdContact } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";


function Profile() {
  const { contactId } = useParams();
  const { store } = useGlobalStore();
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    const getContact = async () => {
      try {
        const contacts = await fetchContacts(store.user.user_id);
        const foundContact = contacts.find((c) => c.id === parseInt(contactId));
        setContact(foundContact);
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };
    getContact();
  }, [contactId, store.user.user_id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        navigate(-1); // Go back to the previous page
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate]);

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-light d-flex justify-content-center flex-column align-items-center mt-5 col-lg-10 mx-auto p-3">
      <h1 className="text-center my-4">Profile</h1>
      <GlassCard>
        <div ref={profileRef} className="profile-content">
          <div className="text-center">
            <IoMdContact className="placeholder-image-contact" />
          </div>
          <button
            className="close-button btn btn-lg btn-secondary top-0 end-0 position-absolute"
            onClick={() => navigate(-1)} // Close button to go back
          >
            <AiOutlineClose />
          </button>
          <form className="col-10 mx-auto">
            <div className="mb-3">
              <input
                className="form-control p-4 text-center "
                placeholder={contact.full_name}
                disabled
              />
            </div>

            <div className="mb-3">
              <input
                className="form-control p-4 text-center "
                placeholder={contact.email}
                disabled
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control p-4 text-center "
                placeholder={contact.phone_number}
                disabled
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control p-4 text-center "
                placeholder={contact.city}
                disabled
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-lg w-100 btn-primary mb-4"
              >
                {contact.email}
              </button>
            </div>
          </form>
        </div>
      </GlassCard>
    </div>
  );
}

export default Profile;