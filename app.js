function ShowContact() {
  sortContact();
  addressBook.contacts.forEach((contact) => {});
}

function sortContact() {
  addressBook.contacts.sort((a, b) => {
    return a.fullName.localeCompare(b.fullName);
  });
}

function addContact(contact) {
  addressBook.contacts.push(contact);
}

function deleteContact(id) {
  addressBook.contacts = addressBook.contacts.filter(
    (contact) => contact.id !== id
  );
}

function removeFirstContact() {
  // Menghapus elemen pertama dari array
  addressBook.contacts.shift();
}

// Menambah kontak baru ke dalam addressBook
addContact(newContact);

ShowContact();
console.log(addressBook.contacts);
