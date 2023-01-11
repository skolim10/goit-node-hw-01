const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
// const { fileURLToPath } = require("url");
// import { nanoid } from "nanoid";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: udokumentuj każdą funkcję
const listContacts = async () => {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  const contactsList = JSON.parse(data);
  return contactsList;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const getContact = contacts.find((x) => x.id === contactId);
  if (!getContact) {
    console.error("No match found");
  }
  //   console.log(getContact);
  return getContact;
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const filteredContact = contacts.filter((x) => x.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(filteredContact, null, 2), {
      encoding: "utf-8",
    });
    return filteredContact;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    const updatedContacts = [newContact, ...contacts];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), {
      encoding: "utf-8",
    });
    return newContact;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
