var electron = require('electron')
var path = require('path')
var app = electron.app
var Menu = electron.Menu
var MenuItem = electron.MenuItem
var ipcMain = electron.ipcMain

var win = null
var app = electron.app
var BrowserWindow = electron.BrowserWindow

app.on('ready', function () {
  win = new BrowserWindow({
    width: 1300,
    height: 600,
  })

  win.loadURL('file://' + path.join(__dirname, 'index.html'))

  win.on('close', function () {
    win = null
  })

  win.webContents.openDevTools()

  var editor = [
    {
      label: 'Rose',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click (item, win, event) {
            win.loadURL('file://' + path.join(__dirname, 'index.html'))
          }
        },
        {type: 'separator'},
        {role: 'undo'},
        {role: 'redo'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'selectall'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    }
  ]

  var appMenu = Menu.buildFromTemplate(editor)
  Menu.setApplicationMenu(appMenu)
})