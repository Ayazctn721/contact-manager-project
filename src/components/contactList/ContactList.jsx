import React from 'react';
import ContactCard from '../contactCard/ContactCard';
import { useGlobalStore } from '../../hooks/useGlobalStore.js';
import { useLocation } from 'react-router';

function ContactList() {
  const { store, dispatch } = useGlobalStore();

  const hadleFavoritesPath = () => {
    const location = useLocation();
    if (location.pathname === '/favorites') {
      return store.contacts.filter((contact) => contact.is_favorite);
    }
    return store.contacts;
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center gap-2">
      {hadleFavoritesPath().length > 0 ? (
        hadleFavoritesPath().map((contact) => (
          <ContactCard
            key={contact.id}
            base64_image={contact.base64_image}
            city={contact.city}
            country={contact.country}
            email={contact.email}
            full_name={contact.full_name}
            id={contact.id}
            is_favorite={contact.is_favorite}
            phone_number={contact.phone_number}
          />
        ))
      ) : (
        <div className='d-flex flex-column justify-content-center z-3'>
          <h6 className='text-light text-center mt-5 fs-3'>No contacts here yet...</h6>
          <img src="/no-connection.png" alt="No Data" />
        </div>
      )}
    </div>
  );
}

export default ContactList;
