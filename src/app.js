//nodemon src/app.js -e js,hbs
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { send } = require("process");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Aiden Gao",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Aiden Gao",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help",
    name: "Aiden Gao",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  if (
    address.includes("!") ||
    address.includes("@") ||
    address.includes("#") ||
    address.includes("$") ||
    address.includes("^") ||
    address.includes("&") ||
    address.includes("*") ||
    address.includes("(") ||
    address.includes(")") ||
    address.includes("+") ||
    address.includes("=") ||
    address.includes("-") ||
    address.includes("_") ||
    address.includes("|") ||
    address.includes("1") ||
    address.includes("2") ||
    address.includes("3") ||
    address.includes("4") ||
    address.includes("5") ||
    address.includes("6") ||
    address.includes("7") ||
    address.includes("8") ||
    address.includes("9") ||
    address.includes("0") ||
    address.includes("`") ||
    address.includes("~") || address.includes("[") || address.includes("]") || address.includes("{")
  ) {
    return res.send({
      error: "Invalid Address Provided! Try another Search",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  //   res.send({
  //     forecast: "It is snowing",
  //     location: "San Diego",
  //     address: req.query.address
  //   });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search item",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aiden Gao",
    errorMessage: "404 Error. Help Page not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aiden Gao",
    errorMessage: "404 Error. Page not Found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
