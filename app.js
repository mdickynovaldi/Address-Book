function showContacts() {
  sortContacts();

  addressBook.contacts.forEach((contact) => {
    console.log(`${contact.fullName} (${contact.nickName})`);
    console.log(contact);
    // TODO: Show formatted contact info as string
  });
}

function sortContacts() {
  addressBook.contacts.sort((previous, next) => {
    return previous.fullName.localeCompare(next.fullName);
  });
}

function addContact() {
  const fullName = prompt("Enter full name:");
  if (!fullName) return;

  const nickName = prompt("Enter nick name:");
  if (!nickName) return;

  const phone = prompt("Enter phone:");
  if (!phone) return;

  const email = prompt("Enter email:");
  if (!email) return;

  const address = prompt("Enter address:");
  if (!address) return;

  const birthday = prompt("Enter birthday (YYYY-MM-DD):");
  if (!birthday) return;

  const affiliationCompany = prompt("Enter affiliation company:");
  if (!affiliationCompany) return;

  const affiliationJobTitle = prompt("Enter affiliation company's job title:");
  if (!affiliationJobTitle) return;

  const nextId = addressBook.contacts[addressBook.contacts.length - 1].id + 1;

  const newContact = {
    id: nextId,
    fullName,
    nickName,
    phone,
    photoUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${fullName}`,
    emails: [
      {
        id: 1,
        type: "work",
        email: email,
      },
    ],
    address,
    birthday: new Date(birthday),
    affiliations: [
      {
        id: 1,
        company: affiliationCompany,
        jobTitle: affiliationJobTitle,
      },
    ],
  };

  console.log({ newContact });

  addressBook.contacts = [...addressBook.contacts, newContact];
}

function deleteContactById(id) {
  addressBook.contacts = addressBook.contacts.filter(
    (contact) => contact.id !== id
  );
}

showContacts();

addContact();

showContacts();
