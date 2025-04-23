import GlassCard from "../../components/glassCard/GlassCard";
import { IoMdContact } from "react-icons/io";
import "./AddContact.css";
import { useState } from "react";
import { createNewContact } from "../../utils/api";
import { useNavigate } from "react-router";
import { useGlobalStore } from "../../hooks/useGlobalStore";

function AddContact() {
  const [inputContact, setInputContact] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    city: "",
  });

  // TODO
  // Check picture inputs in react - you will need an input:file - <img src={input}> - createObjectUrl
  // Check how to compress the image react-image-compression
  // Convert this to a base 64 data format image - "base64:imgdata"
  // You can even compress more the string itself - gzip and other can be a solution.

  const [error, setError] = useState(false);
  const { store, dispatch } = useGlobalStore();
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting the form with this contact: ", inputContact);
    const contact = {
      user_id: store.user.user_id,
      full_name: inputContact.full_name,
      email: inputContact.email,
      phone_number: inputContact.phone_number,
      city: inputContact.city,
    };

    try {
      const newContactResponse = await createNewContact(contact);
      console.log("New Contact Response: ", contact);

      // optimistic state change
      // fetch and the response will fire a new SET_CONTACTS action

      dispatch({
        type: "SET_CONTACTS",
        payload: [...store.contacts, contact],
      });

      setInputContact({
        full_name: "",
        email: "",
        phone_number: "",
        city: "",
      });

      navigate("/addcontact");
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <div className="text-light d-flex justify-content-center flex-column align-items-center mt-5 col-lg-10 mx-auto p-3">
      <h1 className="text-center my-4">Add Contact</h1>
      <GlassCard>
        <div className="text-center">
          <IoMdContact className="placeholder-image-contact" />
        </div>
        <form onSubmit={handleOnSubmit} className="col-10 mx-auto">
          <div className="mb-3">
            <input
              type="text"
              className="form-control p-4 text-white"
              id="fillname"
              aria-describedby="full name"
              placeholder="Full Name"
              value={inputContact.full_name}
              onChange={(e) =>
                setInputContact({
                  ...inputContact,
                  full_name: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control p-4 text-white"
              id="email"
              placeholder="Email"
              value={inputContact.email}
              onChange={(e) =>
                setInputContact({ ...inputContact, email: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="phone"
              className="form-control p-4 text-white"
              id="phone"
              placeholder="Phone"
              value={inputContact.phone_number}
              onChange={(e) =>
                setInputContact({
                  ...inputContact,
                  phone_number: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control p-4 text-white"
              id="address"
              placeholder="Address"
              value={inputContact.city}
              onChange={(e) =>
                setInputContact({ ...inputContact, city: e.target.value })
              }
            />
          </div>
          <>
            {error ? (
              <div className="alert alert-danger" role="alert">
                Something went wrong!
              </div>
            ) : (
              <></>
            )}
          </>

          <div className="text-center">
            <button type="submit" className="btn btn-primary mb-4 w-100">
              Add Contact
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}

export default AddContact;