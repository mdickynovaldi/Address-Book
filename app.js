async function showContacts() {
  try {
    const response = await fetch(
      "https://my-json-server.typicode.com/mdickynovaldi/address-book/db"
    );
    const data = await response.json();
    console.log(data);
    const contactList = document.getElementById("contact-list");
  } catch (error) {
    console.error("Error:", error);
  }
}

async function postData() {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
    });

  const fullName =
    document.getElementById("first-name").value +
    " " +
    document.getElementById("last-name").value;
  const nickName = document.getElementById("nick-name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const birthday = document.getElementById("birthday").value;
  const note = document.getElementById("notes").value;
  const affiliationCompany = document.getElementById("affiliation").value;
  const affiliationJobTitle = document.getElementById("job-title").value;

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        photoUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${fullName}`,
        fullName: fullName,
        nickName: nickName,
        phone: phone,
        emails: email,
        address: address,
        birthday: birthday,
        affiliations: affiliationCompany,
        affiliationJobTitle: affiliationJobTitle,
        note: note,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const json = await response.json();
    console.log(json);

    addContactToTable(json);
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
    {
      method: "DELETE",
    }
  );
  const json = await response.json();
  console.log(json);
}

showContacts();
