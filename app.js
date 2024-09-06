const addressBook = {
  contacts: [
    {
      id: 1,
      photoUrl: "https://api.dicebear.com/9.x/initials/svg?seed=John%20Doe",
      fullName: "John Doe",
      nickName: "John",
      phone: "1234567890",
      emails: [
        {
          id: 1,
          email: "john@example.com",
          type: "work",
        },
        {
          id: 2,
          email: "john2@example.com",
          type: "personal",
        },
      ],
      address: "1234 Main St, Anytown, USA",
      affiliations: [
        {
          id: 1,
          company: "John Doe Company",
          jobTitle: "Software Engineer",
        },
      ],
      notes: "",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      phone: "0987654321",
      email: "jane@example.com",
      address: "5678 Oak Ave, Other City, USA",
    },
  ],
};

function renderContacts(contacts) {
  const sortedContacts = sortContacts(contacts);

  console.log(sortedContacts);
}

function sortContacts(contacts) {
  return contacts.sort((a, b) => {
    return a.fullName.localeCompare(b.fullName);
  });
}

function addContact(contact) {}

function searchContacts(keyword) {}

const exampleContact = `
  👤 Elon Musk
  💼 CEO at Tesla, SpaceX
  📞 +1234567890, +1321546890
  📧 Emails: elon@tesla.com (Work), elon@spacex.com (Personal)
`;

renderContacts(addressBook.contacts);
