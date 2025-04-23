const BASE_URL = "http://yollstudentapi.com";

export async function deleteContact(user_id, contact_id) {
  const options = {
    method: "DELETE",
  };
  console.log(`Deleting contact: user_id=${user_id}, contact_id=${contact_id}`);

  const response = await fetch(
    `${BASE_URL}/api/user/contacts/${contact_id}?user_id=${user_id}`,
    options
  );

  console.log("Delete response status:", response.status);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export async function fetchUserByEmail(email) {
  const options = { headers: { 'X-Secret-Token': 'qwerty' } };
  const response = await fetch(`/api/users/email/${email}`, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function createNewUser(user) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  const response = await fetch('/api/users', options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function fetchContacts(userId) {
  const response = await fetch(`/api/user/contacts?user_id=${userId}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function addToFavorites(userId, contactId) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: userId, contact_id: contactId }),
  };
  const response = await fetch(`/api/user/contacts/favorites`, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function deleteFromFavorites(userId, contactId) {
  const options = {
    method: 'DELETE',
  };
  const response = await fetch(
    `/api/user/contacts/favorites/${contactId}?user_id=${userId}`,
    options
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function createNewContact(contact) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  };
  const response = await fetch(`${BASE_URL}/api/user/contacts`, options);

  console.log("create new contact response: ", response);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function editContact(user_id, contact_id, contact) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  };

  const response = await fetch(
    `${BASE_URL}/api/user/contacts/${contact_id}?user_id=${user_id}`,
    options
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("API Error:", errorData);
    throw new Error(errorData.message || response.statusText);
  }

  return await response.json();
}