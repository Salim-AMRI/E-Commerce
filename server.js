const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/gorbej-db", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Produit = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    titre: String,
    type: String,
    etat: String,
    photo: String,
    description: String,
    prix: Number,
  })
);

app.get("/api/produits", async (req, res) => {
  const produits = await Produit.find({});
  res.send(produits);
});

app.post("/api/produits", async (req, res) => {
  const newProduit = new Produit(req.body);
  const savedProduit = await newProduit.save();
  res.send(savedProduit);
});

app.delete("/api/produits/:id", async (req, res) => {
  const deleteProduit = await Produit.findByIdAndDelete(req.params.id);
  res.send(deleteProduit);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("mon server localhost:5000"));
