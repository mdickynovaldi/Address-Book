// const BACKEND_API_URL = "https://my-json-server.typicode.com/mdickynovaldi/address-book";
const BACKEND_API_URL = "http://localhost:3000";

// All Pages
const contactsCountElement = document.getElementById("contacts-count");

// Home Page
const homeContactListTableBodyElement =
  document.getElementById("home-contacts");

// View All Contacts Page
const contactsPageListTableBodyElement = document.getElementById("contacts");

// View Contact Page
const contactViewPageListTableBodyElement = document.getElementById("contacts");

// Add New Contact Page
const addContactFormElement = document.getElementById("new-contact-form");

// Edit Contact Page
const editContactFormElement = document.getElementById("edit-contact-form");

// -----------------------------------------------------------------------------

/**
 * Fetch to API
 */

async function fetchContacts() {
  try {
    const response = await fetch(`${BACKEND_API_URL}/contacts`);
    const contacts = await response.json();
    return contacts;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchContactById(id) {
  try {
    const response = await fetch(`${BACKEND_API_URL}/contacts/${id}`);
    const contact = await response.json();
    return contact;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchAddNewContact(newContactData) {
  try {
    const response = await fetch(`${BACKEND_API_URL}/contacts`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newContactData),
    });
    const newContact = await response.json();
    return newContact;
  } catch (error) {
    console.error("Error occurred while adding data:", error);
  }
}

async function fetchDeleteContactById(id) {
  try {
    console.log({ id });
    const response = await fetch(`${BACKEND_API_URL}/contacts/${id}`, {
      method: "DELETE",
    });
    const deletedContact = await response.json();

    return deletedContact;
  } catch (error) {
    console.error("Error:", error);
  }
}

/**
 * Render UI
 */

async function renderContactsHome() {
  const contacts = await fetchContacts();

  const keyword = new URLSearchParams(window.location.search).get("q");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.fullName.toLowerCase().includes(keyword) ||
      contact.nickName.toLowerCase().includes(keyword)
  );

  const contactsToRender = keyword ? filteredContacts : contacts;
  const contactsCount = contactsToRender.length;

  contactsCountElement.innerText = contactsCount;

  if (contactsCount === 0) {
    homeContactListTableBodyElement.innerHTML = `<tr>No contacts found</tr>`;
    return null;
  }

  homeContactListTableBodyElement.innerHTML = contactsToRender
    .map((contact) => {
      return `<tr>
      <td class="py-2 px-4">${contact.id}</td>
  
      <td class="py-2 px-4">
        <img src="${contact.photoUrl}"
             alt="Photo" class="w-10 h-10 rounded-full"/>
      </td>
  
      <td class="py-2 px-4">${contact.fullName}</td>
      <td class="py-2 px-4  md:table-cell">${contact.nickName}</td>
      <td class="py-2 px-4  md:table-cell">${contact.phone}</td>
      <td class="py-2 px-4  md:table-cell">${contact.email}</td>
      <td class="py-2 px-4  md:table-cell">${contact.address}</td>
      <td class="py-2 px-4  md:table-cell">${contact.affiliation}</td>
      <td class="py-2 px-4  md:table-cell">${contact.jobTitle}</td>
      <td class="py-2 px-4  md:table-cell">
        ${new Date(contact.birthday).toLocaleDateString()}
      </td>
      <td class="py-2 px-4  md:table-cell">${contact.notes}</td>
    </tr>`;
    })
    .join("");
}

async function renderContacts() {
  const contacts = await fetchContacts();

  const keyword = new URLSearchParams(window.location.search).get("q");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.fullName.toLowerCase().includes(keyword) ||
      contact.nickName.toLowerCase().includes(keyword)
  );

  const contactsToRender = keyword ? filteredContacts : contacts;
  const contactsCount = contactsToRender.length;

  contactsCountElement.innerText = contactsCount;

  if (contactsCount === 0) {
    contactsPageListTableBodyElement.innerHTML = `<tr>No contacts found</tr>`;
    return null;
  }

  contactsPageListTableBodyElement.innerHTML = contactsToRender
    .map((contact) => {
      return `<tr>
    <td class="py-2 px-4">${contact.id}</td>

    <td class="py-2 px-4">
      <img src="${contact.photoUrl}"
           alt="Photo" class="w-10 h-10 rounded-full"/>
    </td>

    <td class="py-2 px-4">${contact.fullName}</td>
    <td class="py-2 px-4  md:table-cell">${contact.nickName}</td>
    <td class="py-2 px-4  md:table-cell">${contact.phone}</td>
    <td class="py-2 px-4  md:table-cell">${contact.email}</td>
    <td class="py-2 px-4  md:table-cell">${contact.address}</td>
    <td class="py-2 px-4  md:table-cell">${contact.affiliation}</td>
    <td class="py-2 px-4  md:table-cell">${contact.jobTitle}</td>
    <td class="py-2 px-4  md:table-cell">
      ${new Date(contact.birthday).toLocaleDateString()}
    </td>
    <td class="py-2 px-4  md:table-cell">${contact.notes}</td>

    <td class="py-5 px-4">
        <button onclick="fetchDeleteContactById('${contact.id}')" 
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"> 
          Delete
        </button>

      <div class="my-6">
        <a href="/contacts/edit/?id=${contact.id}"
           class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Edit
        </a>
      </div>

      <div class="my-6">
        <a href="/contacts/view/?id=${contact.id}"
           class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
          View
        </a>
      </div>
    </td>
  </tr>`;
    })
    .join("");
}

async function renderContactsView() {
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) {
    console.log("ID contact not found");
    return null;
  }

  const contact = await fetchContactById(id);
  if (!contact) {
    contactViewPageListTableBodyElement.innerHTML = `<tr>
      <td class="py-2 px-4">not found</td>
    </tr>`;
    return null;
  } // Memastikan kontak ditemukan

  contactViewPageListTableBodyElement.innerHTML = `
    <img
              src="${contact.photoUrl}"
              alt="Photo"
              class="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h1 class="text-center text-2xl font-bold mb-4">${
              contact.nickName
            }</h1>
            <div class="flex flex-col gap-4">
              <div class="flex gap-2">
                <span class="text-gray-600">Full Name:</span>
                <span class="font-bold">${contact.fullName}</span>
              </div>

              <div class="flex gap-2">
                <span class="text-gray-600">Phone:</span>
                <span class="font-bold">${contact.phone}</span>
              </div>
              <div class="flex gap-2">
                <span class="text-gray-600">Email:</span>
                <span class="font-bold">${contact.email}</span>
              </div>
              <div class="flex gap-2">
                <span class="text-gray-600">Address:</span>
                <span class="font-bold">${contact.address}</span>
              </div>
              <div class="flex gap-2">
                <span class="text-gray-600">Date of Birth:</span>
                <span class="font-bold">${new Date(
                  contact.birthday
                ).toLocaleDateString()}</span>
              </div>
              <div class="flex gap-2">
                <span class="text-gray-600">Affiliation:</span>
                <span class="font-bold">${contact.affiliation}</span>
              </div>
              <div class="flex gap-2">
                <span class="text-gray-600">Job Title:</span>
                <span class="font-bold">${contact.jobTitle}</span>
              </div>
              <div class="flex gap-2">
                <span class="text-gray-600">Notes:</span>
                <span class="font-bold">${contact.notes}</span>
              </div>
            </div>`;
}

async function renderEditContact() {
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) return null;

  const contact = await fetchContactById(id);
  if (!id) return null;

  // TODO: Separate full name into first name & last name, choose either strategy
  editContactFormElement.querySelector("#first-name").value = contact.fullName;
  editContactFormElement.querySelector("#nick-name").value = contact.nickName;
  editContactFormElement.querySelector("#phone").value = contact.phone;
  editContactFormElement.querySelector("#email").value = contact.email;
  editContactFormElement.querySelector("#address").value = contact.address;
  editContactFormElement.querySelector("#affiliation").value =
    contact.affiliation;
  editContactFormElement.querySelector("#job-title").value = contact.jobTitle;
  editContactFormElement.querySelector("#birthday").value = contact.birthday; // TODO: Format date
  editContactFormElement.querySelector("#notes").value = contact.notes;
}

/**
 * Business Logic
 */

async function addNewContact(event) {
  event.preventDefault();

  const formData = new FormData(addContactFormElement);

  const newContactData = {
    photoUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${formData.get(
      "first-name"
    )}`,
    fullName: `${formData.get("first-name")} ${formData.get("last-name")}`,
    nickName: formData.get("nick-name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    address: formData.get("address"),
    birthday: new Date(formData.get("birthday")),
    affiliation: formData.get("affiliation"),
    jobTitle: formData.get("job-title"),
    notes: formData.get("notes"),
  };

  const newContact = await fetchAddNewContact(newContactData);
  if (!newContact) return null;

  window.location.href = `/contacts/view/?id=${newContact.id}`;
}

async function editContactById(event) {
  event.preventDefault();

  try {
    const id = new URLSearchParams(window.location.search).get("id");

    const formData = new FormData(editContactFormElement);

    const newContactData = {
      photoUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${formData.get(
        "first-name"
      )}`,
      fullName: `${formData.get("first-name")}`,
      nickName: formData.get("nick-name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      address: formData.get("address"),
      birthday: new Date(formData.get("birthday")),
      affiliation: formData.get("affiliation"),
      jobTitle: formData.get("job-title"),
      notes: formData.get("notes"),
    };

    const response = await fetch(`${BACKEND_API_URL}/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContactData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedContact = await response.json();
    if (!updatedContact) return null;

    window.location.href = `/contacts/view/?id=${id}`;
  } catch (error) {
    console.error("Error occurred while updating data:", error);
  }
}
