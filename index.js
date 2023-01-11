const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

listContacts();
getContactById("3");
removeContact("8");
addContact("John", "john@gmail.com", "21212121");
