// const BACKEND_API_URL = "https://my-json-server.typicode.com/mdickynovaldi/address-book";
const BACKEND_API_URL = "http://localhost:3000";

let contacts = [];

const contactFormElement = document.getElementById("contact-form");

async function showContacts() {
  try {
    const response = await fetch(`${BACKEND_API_URL}/contacts`);
    const contacts = await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addNewContact(event) {
  event.preventDefault();

  console.log("add new contact");

  const formData = new FormData(contactFormElement);

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

  console.log({ newContactData });

  try {
    const response = await fetch(`${BACKEND_API_URL}/contacts`, {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(newContactData),
    });

    const newContact = await response.json();
    console.log({ newContact });
  } catch (error) {
    console.error("Error:", error);
  }
}

function addContactToTable(contact) {
  const contactList = document.getElementById("contact-list");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td class="py-2 px-4">${contact.id}</td>
    <td class="py-2 px-4"><img src="${contact.photoUrl}" alt="Photo" class="w-10 h-10 rounded-full"/></td>
    <td class="py-2 px-4">${contact.fullName}</td>
    <td class="py-2 px-4 hidden md:table-cell">${contact.nickName}</td>
    <td class="py-2 px-4 hidden md:table-cell">${contact.phone}</td>
    <td class="py-2 px-4 hidden md:table-cell">${contact.emails}</td>
    <td class="py-2 px-4 hidden md:table-cell">${contact.address}</td>
    <td class="py-2 px-4 hidden md:table-cell">${contact.affiliations}</td>
    <td class="py-2 px-4 hidden md:table-cell">${contact.affiliationJobTitle}</td>
    <td class="py-2 px-4 hidden md:table-cell">${contact.birthday}</td>
    <td class="py-2 px-4 hidden md:table-cell">${contact.note}</td>
    <td class="py-2 px-4">
      <button onclick="deleteContactById(${contact.id})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Hapus
      </button>
      <button onclick="deleteContactById(${contact.id})" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Edit
      </button>
    </td>
  `;

  contactList.appendChild(row);
}

async function deleteContactById(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts${id}`,
    { method: "DELETE" }
  );
  const json = await response.json();
  console.log(json);
}

contactFormElement.addEventListener("submit", addNewContact);

showContacts();
