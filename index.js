const express = require('express')
const app = express()
const fs = require('fs')
const cp = require('child_process')
const configProxy = require("./configProxy.json")
app.use(express.json())

let fileData = {
    subDomain: 'usman',
    Port: '8083',
}


app.post('/api/create', async (req, res) => {
    let data = req.body

    console.log(data)
    res.send("hund")
})

app.get('/api/get', async (req, res) => {
    res.send(configProxy)
})

function putProxyData(data) {
    let read = fs.readFileSync('./configProxy.json')
    let obj = JSON.parse(read)

    obj[data.Domain] = data
    let newData = JSON.stringify(obj)

    fs.writeFileSync('./configProxy.json', newData)
}



function createProxyFile(data) {
    let proxyData = `server {listen 80; listen [::]:80; server_name ${data.Domain}.verion.ch; location / {proxy_pass http://127.0.0.1:${data.Port}; include proxy_params; }}`
    fs.writeFileSync(`/etc/nginx/sites-available/${data.subDomain}`, proxyData)
    executeCommand(data)

}


function executeCommand(alsoFileData) {
    cp.exec(`sudo ln -s /etc/nginx/sites-available/${alsoFileData.Domain} /etc/nginx/sites-enabled/${alsoFileData.Domain}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: symlink created ${stdout}`);
    })

    cp.exec('sudo systemctl reload nginx', (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: nginx reloaded ${stdout}`);
    })
}

app.use(express.static('./frontend'))

app.listen(fileData.Port, () => {
    console.log("online")
})
