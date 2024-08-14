// 1. Write a Node.js program that creates a basic HTTP server that responds with "Hello, World!" when accessed.

const http = require('http');
const port = process.env.PORT || 3000;

const fs = require('fs/promises');
const path = require('path');

//Get current path
// __filename
// Get directory path
// __dirname






const server = http.createServer(async (req, res) =>{
    // res.write("Hello world!");
    // res.end();

    // res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.end("Hello world!");

    // res.runHeader('Content-Type', 'text/html');
    // res.end("<h1>Not found</h1>");
  
    // console.log(req);
    // console.log(req.url);
    // console.log(req.method);

    // Custom router
    try {

        if(req.method === 'GET'){
            let filePath;
            if(req.url === '/'){
                filePath = path.join(__dirname, '/public/index.html');
            } else if(req.url === '/about'){
                filePath = path.join(__dirname, '/public/about.html');
            }else{
                throw new Error('Not found')
            }

            const data = await fs.readFile(filePath);
            res.setHeader('Content-Type', 'text/html');
            res.write(data);
            res.end();
            
        } else{
            throw new Error("Method not allowed");
        }
    } catch (error){
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end("Server Error");
    }
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// 4. Create a custom event emitter class that can emit and listen to events. Implement methods to add and remove listeners.

const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('event', () => {
    console.log("Event occurred");
})

myEmitter.emit('event');