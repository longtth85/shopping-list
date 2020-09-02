const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            //whitelist channels
            let validChannels = ["item:add"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel) => {
            let validChannels = ["item:add"];
            const ul = document.querySelector('ul');
            if (validChannels.includes(channel)) {
                ipcRenderer.on('item:add', function (e, data){
                    const li = document.createElement('li');
                    const itemText = document.createTextNode(data);
                    li.appendChild(itemText);
                    ul.appendChild(li);
                });
            }
        },
        delete: (channel) => {
            let validChannels = ["item:clear"];
            const ul = document.querySelector('ul');

            if (validChannels.includes(channel)) {
                ipcRenderer.on('item:clear', () => {
                    ul.innerHTML = "";
                });
            }
        }
    }
)