const express = require('express')
const app = express()
const fs = require('fs')
const cp = require('child_process')

let fileData = {
    subDomain: 'usman',
    Port: '8082',
}
let proxyData = `server {listen 80; listen [::]:80; server_name ${fileData.subDomain}.verion.ch; location / {proxy_pass http://127.0.0.1:${fileData.Port}; include proxy_params; }}`


/* function createProxyFile(data, proxy) {
    fs.writeFileSync(`/etc/nginx/sites-available/${data.subDomain}`, proxy)
    executeCommand(data)

} createProxyFile(fileData, proxyData) */





/* app.get('/', async (req,res) => {

    fs.readFile('index.html', (err, data) => {
        res.end(data)
    })

}) */

function executeCommand(alsoFileData) {
    cp.exec(`sudo ln -s /etc/nginx/sites-available/${alsoFileData.subDomain} /etc/nginx/sites-enabled/${alsoFileData.subDomain}`, (error, stdout, stderr) => {
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
