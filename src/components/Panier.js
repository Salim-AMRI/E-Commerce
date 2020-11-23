import React, { Component } from "react";
import formatPrix from "./Prix";
import Fade from "react-reveal/Fade";

export default class Panier extends Component {
  state = {
    name: "",
    phone: "",
    adress: "",
    CIN: "",
    showCheckout: false,
  };
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  passerCommande = (e) => {
    e.preventDefault();
    const commande = {
      name: this.state.name,
      mail: this.state.mail,
      adress: this.state.adress,
      CIN: this.state.CIN,
      panier: this.props.panier,
    };
    this.props.passerCommande(commande);
  };
  render() {
    const { panier } = this.props;
    return (
      <div>
        {panier.length === 0 ? (
          <div className="panier panier-header"> Le panier est vide </div>
        ) : (
          <div className="panier panier-header">
            {" "}
            Vous avez {panier.length} produits dans le panier{" "}
          </div>
        )}
        <div>
          <div className="panier">
            <Fade left cascade={true}>
              <ul className="panier-carte">
                {panier.map((produit) => (
                  <li key={produit._id}>
                    <div>
                      <img src={produit.photo} alt={produit.titre}></img>
                    </div>
                    <div>
                      <div>{produit.titre}</div>
                      <div className="right">
                        {formatPrix(produit.prix)}{" "}
                        <button
                          className="button"
                          onClick={() => this.props.supprimerProduit(produit)}
                        >
                          Enlever
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {panier.length !== 0 && (
            <div>
              <div className="panier">
                <div className="total">
                  <div>
                    Total : {formatPrix(panier.reduce((a, b) => a + b.prix, 0))}
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="button primary"
                  >
                    Passer la commande
                  </button>
                </div>
              </div>
              {this.state.showCheckout && (
                <Fade right cascade={true}>
                  <div className="panier">
                    <form onSubmit={this.passerCommande}>
                      <ul className="form-container">
                        <li>
                          <label>Nom et prénom</label>
                          <input
                            name="name"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Téléphone</label>
                          <input
                            name="phone"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Adresse de livraison</label>
                          <input
                            name="adress"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>N° de C.I.N</label>
                          <input
                            name="CIN"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <button className="button-primary" type="submit">
                            Valider
                          </button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
