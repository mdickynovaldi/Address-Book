// const BACKEND_API_URL = "https://my-json-server.typicode.com/mdickynovaldi/address-book";
const BACKEND_API_URL = "http://localhost:3000";

const homeContactListTableBodyElement =
  document.getElementById("contact-list-home");
const homeContactsCountElement = document.getElementById("contacts-count-home");

const contactPageListTableBodyElement = document.getElementById("contact-list");
const contactPageCountElement = document.getElementById("contact-count");
const searchInput = document.getElementById("search-input");

const editContactFormElement = document.getElementById("contact-form-edit");

const addContactFormElement = document.getElementById("contact-form");

const contactViewPageListTableBodyElement =
  document.getElementById("contact-list-view");

async function getContacts() {
  try {
    const response = await fetch(`${BACKEND_API_URL}/contacts`);
    const contacts = await response.json();

    return contacts;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addNewContact() {
  event.preventDefault();

  const formData = new FormData(addContactFormElement);

  const lastId = await getContacts();

  const newContactData = {
    id: lastId.length + 1,
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

  try {
    const response = await fetch(`${BACKEND_API_URL}/contacts`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newContactData),
    });

    const newContact = await response.json();
  } catch (error) {
    console.error("Error occurred while adding data:", error);
  }

  window.location.href = "/contact";
}

async function deleteContactById(id) {
  try {
    const response = await fetch(`${BACKEND_API_URL}/contacts/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete contact");
    }
    const json = await response.json();
    renderContacts();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function renderContacts() {
  const contacts = await getContacts();

  contactPageCountElement.innerText = contacts.length;

  contactPageListTableBodyElement.innerHTML = contacts
    .map((contact) => {
      return `<tr>
    <td class="py-2 px-4">${contact.id}</td>
    <td class="py-2 px-4"><img src="${
      contact.photoUrl
    }" alt="Photo" class="w-10 h-10 rounded-full"/></td>
    <td class="py-2 px-4">${contact.fullName}</td>
    <td class="py-2 px-4  md:table-cell">${contact.nickName}</td>
    <td class="py-2 px-4  md:table-cell">${contact.phone}</td>
    <td class="py-2 px-4  md:table-cell">${contact.email}</td>
    <td class="py-2 px-4  md:table-cell">${contact.address}</td>
    <td class="py-2 px-4  md:table-cell">${contact.affiliation}</td>
    <td class="py-2 px-4  md:table-cell">${contact.jobTitle}</td>
    <td class="py-2 px-4  md:table-cell">${new Date(
      contact.birthday
    ).toLocaleDateString()}</td>
    <td class="py-2 px-4  md:table-cell">${contact.notes}</td>
    <td class="py-2 px-4">
      <button onclick="deleteContactById(${
        contact.id
      })" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 my-2 rounded">
        Delete
      </button>
      <button onclick="getContactById(${
        contact.id
      })" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-2 rounded">
        Edit
      </button>
      <button onclick="getContactViewById(${
        contact.id
      })" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded">
        View
      </button>
    </td>
  </tr>`;
    })
    .join("");
}

function getContactById(id) {
  window.location.href = `/edit/?id=${id}`;
}

function getContactViewById(id) {
  window.location.href = `/contact/view/?id=${id}`;
}

async function updateData() {
  event.preventDefault();

  try {
    const params = new URLSearchParams(window.location.search).get("id");
    const formData = new FormData(editContactFormElement);
    let fetchContactId = getContactById;
    console.log(getContactById);

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

    const response = await fetch(`${BACKEND_API_URL}/contacts/${params}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContactData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Data updated successfully:", result);
    window.location.href = "/contact";
  } catch (error) {
    console.error("Error occurred while updating data:", error);
  }
}

async function searchContact() {
  const contacts = await getContacts();
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.fullName
        .toLowerCase()
        .includes(searchInput.value.toLowerCase()) ||
      contact.nickName.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  contactPageCountElement.innerText = filteredContacts.length;

  contactPageListTableBodyElement.innerHTML = filteredContacts
    .map((contact) => {
      return `<tr>
    <td class="py-2 px-4">${contact.id}</td>
    <td class="py-2 px-4"><img src="${
      contact.photoUrl
    }" alt="Photo" class="w-10 h-10 rounded-full"/></td>
    <td class="py-2 px-4">${contact.fullName}</td>
    <td class="py-2 px-4  md:table-cell">${contact.nickName}</td>
    <td class="py-2 px-4  md:table-cell">${contact.phone}</td>
    <td class="py-2 px-4  md:table-cell">${contact.email}</td>
    <td class="py-2 px-4  md:table-cell">${contact.address}</td>
    <td class="py-2 px-4  md:table-cell">${contact.affiliation}</td>
    <td class="py-2 px-4  md:table-cell">${contact.jobTitle}</td>
    <td class="py-2 px-4  md:table-cell">${new Date(
      contact.birthday
    ).toLocaleDateString()}</td>
    <td class="py-2 px-4  md:table-cell">${contact.notes}</td>
    <td class="py-2 px-4">
      <button onclick="deleteContactById(${
        contact.id
      })" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Delete
      </button>
      <button onclick="fetchContactIds(${
        contact.id
      })" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Edit
      </button>
    </td>
  </tr>`;
    })
    .join("");
}

async function renderContactsHome() {
  const contacts = await getContacts();

  homeContactsCountElement.innerText = contacts.length;

  homeContactListTableBodyElement.innerHTML = contacts
    .map((contact) => {
      return `<tr>
    <td class="py-2 px-4">${contact.id}</td>
    <td class="py-2 px-4"><img src="${
      contact.photoUrl
    }" alt="Photo" class="w-10 h-10 rounded-full"/></td>
    <td class="py-2 px-4">${contact.fullName}</td>
    <td class="py-2 px-4  md:table-cell">${contact.nickName}</td>
    <td class="py-2 px-4  md:table-cell">${contact.phone}</td>
    <td class="py-2 px-4  md:table-cell">${contact.email}</td>
    <td class="py-2 px-4  md:table-cell">${contact.address}</td>
    <td class="py-2 px-4  md:table-cell">${contact.affiliation}</td>
    <td class="py-2 px-4  md:table-cell">${contact.jobTitle}</td>
    <td class="py-2 px-4  md:table-cell">${new Date(
      contact.birthday
    ).toLocaleDateString()}</td>
    <td class="py-2 px-4  md:table-cell">${contact.notes}</td>
    
  </tr>`;
    })
    .join("");
}

async function viewContacstById(id) {
  try {
    const response = await fetch(`${BACKEND_API_URL}/contacts/${id}`);
    const contact = await response.json();
    return contact;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function renderContactsView() {
  const params = new URLSearchParams(window.location.search).get("id");
  const contact = await viewContacstById(params);
  if (contact) {
    contactViewPageListTableBodyElement.innerHTML = `
      <tr>
        <td class="py-2 px-4">${contact.id}</td>
        <td class="py-2 px-4"><img src="${
          contact.photoUrl
        }" alt="Photo" class="w-10 h-10 rounded-full"/></td>
        <td class="py-2 px-4">${contact.fullName}</td>
        <td class="py-2 px-4 md:table-cell">${contact.nickName}</td>
        <td class="py-2 px-4 md:table-cell">${contact.phone}</td>
        <td class="py-2 px-4 md:table-cell">${contact.email}</td>
        <td class="py-2 px-4 md:table-cell">${contact.address}</td>
        <td class="py-2 px-4 md:table-cell">${contact.affiliation}</td>
        <td class="py-2 px-4 md:table-cell">${contact.jobTitle}</td>
        <td class="py-2 px-4 md:table-cell">${new Date(
          contact.birthday
        ).toLocaleDateString()}</td>
        <td class="py-2 px-4 md:table-cell">${contact.notes}</td>
      </tr>`;
  }
}

renderContacts();
renderContactsHome();
renderContactsView();
