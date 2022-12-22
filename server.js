const http = require("http");
const server = http.createServer((req, res) => {
    res.write("WELCOME");
    res.write("Let's Try this again, WELCOME");
    res.end();

    console.log("Request Made");
});

server.listen(3000, 'localhost', () => {
    console.log("This server is listening");
})