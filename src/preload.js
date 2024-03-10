// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge } = require('electron');

function sayHi() {
  console.log('Hello World!');
  return 'Hello World!';
}

contextBridge.exposeInMainWorld('sayHi', sayHi);