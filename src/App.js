import React from "react";
import data from "./data.json";
import Produits from "./components/Produits";
import Filter from "./components/Filter";
import Panier from "./components/Panier";

class App extends React.Component {
  state = {
    products: data.products,
    type: "",
    etat: "",
    tri: "",
    panier: localStorage.getItem("panier")
      ? JSON.parse(localStorage.getItem("panier"))
      : [],
  };

  passerCommande = (commande) => {
    alert(commande.name + " : Votre commande est validée");
  };

  filterType = (e) => {
    console.log(e.target.value);
    if (e.target.value === "" || e.target.value === "TOUT") {
      this.setState({
        type: e.target.value,
        products: data.products,
      });
    } else {
      this.setState({
        type: e.target.value,
        products: data.products.filter(
          (produit) => produit.type.indexOf(e.target.value) >= 0
        ),
      });
    }
  };

  filterEtat = (e) => {
    console.log(e.target.value);
    if (e.target.value === "" || e.target.value === "TOUT") {
      this.setState({
        etat: e.target.value,
        products: data.products,
      });
    } else {
      this.setState({
        etat: e.target.value,
        products: data.products.filter(
          (produit) => produit.etat.indexOf(e.target.value) >= 0
        ),
      });
    }
  };

  sortPrix = (e) => {
    const tri = e.target.value;
    console.log(e.target.value);
    this.setState((state) => ({
      tri: tri,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          tri === "Moins"
            ? a.prix > b.prix
              ? 1
              : -1
            : tri === "Plus"
            ? a.prix < b.prix
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        ),
    }));
  };

  addPanier = (product) => {
    const panier = this.state.panier.slice();
    let alreadyInPanier = false;
    panier.forEach((produit) => {
      if (produit._id === product._id) {
        produit.count++;
        alreadyInPanier = true;
      }
    });
    if (!alreadyInPanier) {
      panier.push({ ...product, count: 1 });
    }
    this.setState({ panier });
    localStorage.setItem("panier", JSON.stringify(panier));
  };

  supprimerProduit = (produit) => {
    const panier = this.state.panier.slice();
    this.setState({ panier: panier.filter((x) => x._id !== produit._id) });
    localStorage.setItem(
      "panier",
      JSON.stringify(panier.filter((x) => x._id !== produit._id))
    );
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">Gorbej</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                type={this.state.type}
                etat={this.state.etat}
                tri={this.state.tri}
                filterType={this.filterType}
                filterEtat={this.filterEtat}
                sortPrix={this.sortPrix}
              />
              <Produits
                products={this.state.products}
                addPanier={this.addPanier}
              />
            </div>
            <div className="sidebar">
              <Panier
                panier={this.state.panier}
                supprimerProduit={this.supprimerProduit}
                passerCommande={this.passerCommande}
              />
            </div>
          </div>
        </main>
        <footer>By Amri Salim</footer>
      </div>
    );
  }
}

export default App;
