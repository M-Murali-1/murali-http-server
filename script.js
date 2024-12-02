const http = require("http");
const port = 8082;

const { v4: uuidv4 } = require("uuid");
const value = {
  slideshow: {
    author: "Yours Truly",
    date: "date of publication",
    slides: [
      {
        title: "Wake up to WonderWidgets!",
        type: "all",
      },
      {
        items: [
          "Why <em>WonderWidgets</em> are great",
          "Who <em>buys</em> WonderWidgets",
        ],
        title: "Overview",
        type: "all",
      },
    ],
    title: "Sample Slide Show",
  },
};

const server = http.createServer((req, res) => {
  if (req.url === "/html") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(`<h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
      <p> - Martin Fowler</p>`);
    res.end();
  } else if (req.url === "/json") {
    res.writeHead(200, { "content-type": "application/json" });
    res.write(JSON.stringify(value));
    res.end();
  } else if (req.url === "/uuid") {
    res.writeHead(200, { "content-type": "application/json" });
    let uuid = { uuid: uuidv4() };
    res.write(JSON.stringify(uuid));
    res.end();
  } else if (req.url.startsWith("/status")) {
    res.writeHead(200, { "content-type": "text" });
    let status = req.url.split("/").at(-1);
    if(status<100 || status>600) {
      res.write("Status values lies between 100 and 600");
    }
    else{
    res.write(status);
    }
    res.end();
  } else if (req.url.startsWith("/delay")) {
    let delay = parseInt(req.url.split("/").at(-1));
    setTimeout(() => {
      res.writeHead(200, { "content-type": "text/plain" });
      res.write(`Response is delayed by ${delay}ms`);
      res.end();
    }, delay);
  }
});

server.listen(port, (err) => {
  if(err) {
    console.log("Error Occured while creating the server",err);
  }
});
