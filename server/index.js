import http from "http";
import handler from "../api/generateArticle.js";

const server = http.createServer((req, res) => {
  if (req.url === "/api/generate" && req.method === "POST") {
    return handler(req, res);
  }

  res.statusCode = 404;
  res.end("Not Found");
});

server.listen(3001, () => {
  console.log("API server running at http://localhost:3001");
});
