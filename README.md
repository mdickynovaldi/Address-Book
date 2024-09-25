# Address Book Website

Live: <https://address-book.mdickynovaldi.com>

## Description

The Address Book Website is a web application that allows users to store, manage, and search their contacts. The application is designed to provide a simple and intuitive interface for users to easily manage their contact information.

## Technologies Used

- HTML: For the structure and content of the web page.
- CSS: For styling and layout of the web page.
  - Tailwind CSS: For styling and layout of the web page.
- JavaScript: For interactivity and dynamic functionality.

## Project Structure

- `index.html`: Main HTML file for the web page structure.
- `main.css`: Main CSS file for page styling.
- `app.js`: Main JavaScript file for application functionality.
- `assets/`: Folder to store images or icons used in the application.

## Installation and Local Development

1. Clone this repository to your local computer.
2. Open the `index.html` file in your web browser.
3. For development, you can use your preferred text editor to edit the HTML, CSS, and JavaScript files.

## Run the local Backend REST API server

```sh
bunx json-server db.json
```

## Pages

Previous:

| Path                  | Description          |
| --------------------- | -------------------- |
| `/`                   | Home or all contacts |
| `/contacts`           | All contacts         |
| `/contacts/view?id=1` | View contact by id   |
| `/new/`               | Add new contact      |
| `/edit?id=1`          | Edit contact by id   |

Next:

| Path                  | Description          |
| --------------------- | -------------------- |
| `/`                   | Home or all contacts |
| `/contacts`           | All contacts         |
| `/contacts/new`       | Add new contact      |
| `/contacts/view?id=1` | View contact by id   |
| `/contacts/edit?id=1` | Edit contact by id   |

## Contribution

Contributions are always welcome. If you want to contribute to this project, please create a pull request or open an issue for discussion of new features or bug fixes.
