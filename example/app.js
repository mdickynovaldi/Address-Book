async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    localStorage.setItem("example", JSON.stringify(data));
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function postData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function deleteData(id) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
    console.log(response);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();

console.log(contact);

// Menyimpan ke localStorage

// Mengambil data dari localStorage
const example = JSON.parse(localStorage.getItem("example"));

console.log(example);
