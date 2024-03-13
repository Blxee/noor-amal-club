// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge } = require('electron');
const { ipcRenderer } = require('electron/renderer');
const fs = require("fs");

ipcRenderer.on('get-data', (event, dataPath) => {
  // create the data file if it does not exist
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]');
  }

  // if the data is corrupted, reset the file
  try {
    const data = fs.readFileSync(dataPath);
    JSON.parse(data);
  } catch {
    fs.writeFileSync(dataPath, '[]');
  }

  function getAll() {
    let data = fs.readFileSync(dataPath);
    return JSON.parse(data);
  }

  function addUser(newUser) {
    try {
      let data = fs.readFileSync(dataPath);
      data = JSON.parse(data);
      newUser.id = (data[data.length - 1]?.id || 0) + 1;
      data.push(newUser);
      data = JSON.stringify(data);
      fs.writeFileSync(dataPath, data);
      return ['success', 'تمت اضافة عضو جديد بنجاح'];
    } catch (error) {
      console.log(error);
      return ['error', 'فشل اضافة عضو جديد'];
    }
  }

  function updateUser(updatedUser, userId) {
     try {
      let data = fs.readFileSync(dataPath);
      data = JSON.parse(data);
      const user = data.find(({ id }) => id === userId);
      if (user == undefined) {
        return ['error', 'لا يمكن ايجاد هذا العضو'];
      }
      Object.assign(user, updatedUser);
      data = JSON.stringify(data);
      fs.writeFileSync(dataPath, data);
      return ['success', 'تم تعديل معلومات العضو بنجاح'];
    } catch (error) {
      console.log(error);
      return ['error', error.message];
    }
  }

  function payMonth(userId) {
     try {
      let data = fs.readFileSync(dataPath);
      data = JSON.parse(data);
      const user = data.find(({ id }) => id === userId);
      if (user == undefined) {
        return ['error', 'لا يمكن ايجاد هذا العضو'];
      }
      let lastPaid = new Date(user.lastPaid);
      lastPaid = new Date(lastPaid.setMonth(lastPaid.getMonth() + 1));
      user.lastPaid = lastPaid;
      data = JSON.stringify(data);
      fs.writeFileSync(dataPath, data);
      return ['success', 'تم دفع شهر لهذا العضو'];
    } catch (error) {
      console.log(error);
      return ['error', error.message];
    }
  }

  function deleteUser(userId) {
    try {
      let data = fs.readFileSync(dataPath);
      data = JSON.parse(data);
      const idx = data.findIndex(({ id }) => id === userId);
      if (idx === -1) {
        return ['error', 'لا يمكن ايجاد هذا العضو'];
      }
      const user = data.splice(idx, 1);
      data = JSON.stringify(data);
      fs.writeFileSync(dataPath, data);
      return ['success', 'تم حذف هذا العضو بنجاح'];
    } catch (error) {
      console.log(error);
      return ['error', error.message];
    }
  }

  contextBridge.exposeInMainWorld('usersAPI', {
    getAll,
    addUser,
    updateUser,
    payMonth,
    deleteUser,
  });
});
