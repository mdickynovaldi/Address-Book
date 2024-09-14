const contact = {
  id: 1,
  name: "Elon Musk",
  birthdate: new Date("1970-01-01"),
};

console.log(contact);

const stringifiedContact = JSON.stringify(contact);

localStorage.setItem("example", stringifiedContact);

const example = JSON.parse(localStorage.getItem("example"));

console.log(example);
