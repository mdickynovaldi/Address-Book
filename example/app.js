async function fetchData() {
  try {
    const response = await fetch(
      "https://my-json-server.typicode.com/mdickynovaldi/address-book/contacts/"
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function postData() {
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
  const note = prompt("Enter note:");
  if (!note) return;

  try {
    const response = await fetch(
      "https://my-json-server.typicode.com/mdickynovaldi/address-book/contacts/",
      {
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
      }
    );
    const final = await response.json();
    console.log(final);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function deleteData(id) {
  try {
    const response = await fetch(
      `https://my-json-server.typicode.com/mdickynovaldi/address-book/contacts/${id}`,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();

deleteData(1);
