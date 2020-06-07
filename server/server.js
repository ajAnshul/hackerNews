import express from "express";
import fs from "fs";
import path from "path";


import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App";

const PORT = 5000;



const app = express();
app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.get("/", (req, res)=>{
  return renderHackerNews(req, res);
})

app.get("/page/:pageNumber", (req, res) => {
  return renderHackerNews(req, res);
});



function renderHackerNews(req, res){
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some error happened");
    }
    return res.send(data);
  });
}



app.listen(process.env.PORT || PORT, () => {
  console.log(`App launched on ${PORT}`);
});