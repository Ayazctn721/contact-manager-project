import "./Home.css";
import ContactList from "../../components/contactList/ContactList";
import { useEffect } from "react";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import { fetchContacts } from "../../utils/api";

function Home() {
  const { store, dispatch } = useGlobalStore();

  useEffect(() => {
    // fetch and set contacts via dispatch
    const refreshContacts = async () => {
      try {
        const getContactsResponse = await fetchContacts(store.user.user_id);
        console.log("Fetched Contacts: ", getContactsResponse);
        dispatch({ type: "SET_CONTACTS", payload: getContactsResponse });
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    if (store.user.user_id) {
      refreshContacts();
    }
  }, [store.user.user_id]); // Add store.user.user_id to the dependency array

  console.log("Home - store:", store); // Add logging to check store

  return (
    <div className="d-flex flex-column justify-content-center w-100 p-1">
      <h3 className="front fs-1 fw-bold mt-4 text-cust-color text-center">
        Contacts
      </h3>
      <ContactList />
    </div>
  );
}

export default Home;