const http = require('http');
const { json } = require('stream/consumers');
const PORT = process.env.PORT || 3000;

let users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Jin' },
];

// Logger middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}; 

// JSON middleware
const jsonMiddleWare = (req,res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
};

// Route handler for GET /api/users
const getUserHandler = (req, res) => {
    res.write(JSON.stringify(users));
    res.end();
}

// Route handler for GET /api/users/:id
const getUserByIdHandler = (req, res) => {
    const id = req.url.split("/")[3];
    const user = users.find((user) => user.id === parseInt(id));
    if (user) {
        res.write(JSON.stringify(user));
    } else {
        res.statusCode = 404
        res.write(JSON.stringify({ message: 'User not found' }));
    }
    res.end();
};

// Route handler for GET /api/users/name
const getUserByNameHandler = (req, res) => {
    const name = req.url.split("/")[3];
    let found = false;

    users.forEach((user) => {
        if(user.name.toLowerCase() === name.toLowerCase()) {
            found = true;
            res.write(JSON.stringify(user));
        } 
    });

    if(!found){
        res.statusCode = 404
        res.write(JSON.stringify({ message: 'User not found' }));
    }
    res.end();
}

// Route for handling POST /api/users/
const createUser = (req, res) => {
    let body = '';
    // Listen for data
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const newUser = JSON.parse(body);
        users.push(newUser);
        res.statusCode = 201;
        res.write(JSON.stringify(newUser));
    });
    res.end();
}

// Route for handling DELETE /api/users/
const deleteUser = (req,res) => {
    const id = parseInt(req.url.split("/")[3]); // Extract ID from the URL
    const initialLength = users.length; // Store initial length

    // Use filter method to remove the user
    users = users.filter(user => user.id !== id); 

    if (users.length < initialLength) {
        res.writeHead(200);
        res.write(JSON.stringify({ message: `User with ID ${id} deleted successfully.` }));
    } else {
        res.writeHead(404);
        res.write(JSON.stringify({ message: `User with ID ${id} not found.` }));
    }
    res.end();
}

// Not found handler
const notFoundHandler = (req, res) => {
    res.statusCode = 404
    res.write(JSON.stringify({ message: 'Route not found' }));
    res.end();
};

// Custom API
const server = http.createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleWare(req, res, () => {
            if (req.url === '/api/users' && req.method === 'GET') {
                getUserHandler(req, res);
            } 
            else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET'){
                getUserByIdHandler(req, res);
            } 
            else if(req.url.match(/\/api\/users\/([a-zA-Z]+)/) && req.method === 'GET'){
                getUserByNameHandler(req, res);
            } 
            else if(req.url === '/api/users' && req.method === 'POST'){
                createUser(req, res);
            } 
            else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'DELETE'){
                deleteUser(req, res);
            }
            else{
                notFoundHandler(req, res);
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});