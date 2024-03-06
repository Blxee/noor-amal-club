const { app, BrowserWindow } = require("electron");
const path = require("path");
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const localServerApp = express();
localServerApp.use(express.json())
const PORT = 8088;
const dataPath = app.getPath('userData') + '/user-data.json';

// create the data file if it does not exist
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]');
}

// if the data is corrupted, rest the file
try {
  const data = fs.readFileSync(dataPath);
  JSON.parse(data);
} catch {
  fs.writeFileSync(dataPath, '[]');
}

const startDataAPI = () => {

  localServerApp.get('/get-all/', (req, res) => {
    let data = fs.readFileSync(dataPath);
    res.send(data);
  });

  localServerApp.post('/add-user/', (req, res) => {
    try {
      const newUser = req.body;
      let data = fs.readFileSync(dataPath);
      data = JSON.parse(data);
      newUser.id = (data[data.length - 1]?.id || 0) + 1;
      data.push(newUser);
      data = JSON.stringify(data);
      fs.writeFileSync(dataPath, data);
      res.status(200).send('تمت اضافة عضو جديد بنجاح');
    } catch (error) {
      console.log(error);
      res.status(404).send('فشل اضافة عضو جديد');
    }
    res.end();
  });

  localServerApp.put('/update-user/:userId', (req, res) => {
     try {
      const updatedUser = req.body;
      let data = fs.readFileSync(dataPath);
      data = JSON.parse(data);
      const user = data.find(({ id }) => id === parseInt(req.params.userId));
      if (user == undefined) {
        res.status(404).send('لا يمكن ايجاد هذا العضو');
        return;
      }
      Object.assign(user, updatedUser);
      data = JSON.stringify(data);
      fs.writeFileSync(dataPath, data);
      res.status(200).send('تم تعديل معلومات العضو بنجاح');
    } catch (error) {
      console.log(error);
      res.status(404).send(error.message);
    }
    res.end();
 });

  localServerApp.put('/pay-month/:userId', (req, res) => {
     try {
      let data = fs.readFileSync(dataPath);
      data = JSON.parse(data);
      const user = data.find(({ id }) => id === parseInt(req.params.userId));
      if (user == undefined) {
        res.status(404).send('لا يمكن ايجاد هذا العضو');
        return;
      }
      let lastPaid = new Date(user.lastPaid);
      lastPaid = new Date(lastPaid.setMonth(lastPaid.getMonth() + 1));
      user.lastPaid = lastPaid;
      data = JSON.stringify(data);
      fs.writeFileSync(dataPath, data);
      res.status(200).send('تم دفع شهر لهذا العضو');
    } catch (error) {
      console.log(error);
      res.status(404).send(error.message);
    }
    res.end();
 });

  localServerApp.delete('/delete-user/:userId', (req, res) => {
    try {
      let data = fs.readFileSync(dataPath);
      data = JSON.parse(data);
      const idx = data.findIndex(({ id }) => id === parseInt(req.params.userId));
      if (idx === -1) {
        res.status(404).send('لا يمكن ايجاد هذا العضو');
        return;
      }
      const user = data.splice(idx, 1);
      data = JSON.stringify(data);
      fs.writeFileSync(dataPath, data);
      res.status(200).send('تم حذف هذا العضو بنجاح');
    } catch (error) {
      console.log(error);
      res.status(404).send(error.message);
    }
    res.end();
  });

};

const startLocalServer = (done) => {
  localServerApp.use(express.json({ limit: "100mb" }));
  localServerApp.use(cors());
  localServerApp.use(express.static('./dist/'));
  localServerApp.listen(PORT, async () => {
    console.log("Server Started on PORT ", PORT);
    done();
  });
};

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  //   mainWindow.loadFile('index.html')
  mainWindow.loadURL("http://localhost:" + PORT);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  startDataAPI();
  startLocalServer(createWindow);

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
