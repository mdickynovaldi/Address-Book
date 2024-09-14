const contactList = document.getElementById("contact-list");
const h1 = document.getElementById("contact-title-list");

// Fungsi untuk merender daftar kontak ke tabel
function renderContacts() {
  h1.textContent = `Contacts (${addressBook.contacts.length})`;

  const sortedContacts = addressBook.contacts.sort((a, b) => {
    return a.nickName.localeCompare(b.nickName);
  });

  addressBook.contacts.forEach((contact, index) => {
    const row = document.createElement("tr");
    row.classList.add("border-b");
    row.classList.add("hover:bg-gray-100");

    row.innerHTML = `
        <td class="py-2 px-4">${index + 1}</td>
        <td class="py-2 px-4"><img src="${contact.photoUrl}"
        alt="${contact.fullName}" class="w-12 h-12 rounded-full"></td>
        <td class="py-2 px-4">${contact.fullName}</td>
        <td class="py-2 px-4">${contact.nickName}</td>
        <td class="py-2 px-4">${contact.phone}</td>
        <td class="py-2 px-4">
        ${contact.emails
          .map((email) => `${email.email} (${email.type})`)
          .join(", ")}
        </td>
        <td class="py-2 px-4">${contact.address}</td>
        <td class="py-2 px-4">
          ${contact.affiliations
            .map((affiliation) => affiliation.company)
            .join(", ")}
        </td>
        <td class="py-2 px-4">
          ${contact.affiliations
            .map((affiliation) => affiliation.jobTitle)
            .join(", ")}
        </td>
        <td class="py-2 px-4">${contact.birthday}</td>
        <td class="py-2 px-4">${contact.notes}</td>
        <td class="py-2 px-4">
          <button class="bg-blue-500 text-white px-2 py-1 rounded-md">Edit</button>
          <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
        </td>
      `;
    // Tambahkan row ke tbody
    contactList.appendChild(row);
  });
}

// Panggil fungsi untuk merender kontak saat halaman dimuat
renderContacts();
