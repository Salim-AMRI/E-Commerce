import React, { Component } from "react";
import formatPrix from "./Prix";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";

export default class Produits extends Component {
  state = {
    product: null,
  };
  openModal = (product) => {
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };
  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade={true}>
          <ul className="products">
            {this.props.products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <a
                    href={"#" + product._id}
                    onClick={() => this.openModal(product)}
                  >
                    <img src={product.photo} alt={product.titre}></img>{" "}
                    <p className="title">{product.titre}</p>
                  </a>
                  <p className="prix-produit">
                    <div>{formatPrix(product.prix)}</div>
                    <button
                      onClick={() h-title=> this.props.addPanier(product)}
                      className="button primary"
                    >
                      Ajouter au panier
                    </button>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="produit-description">
                <img src={product.photo} alt={product.titre}></img>
                <div className="produit-description-detail">
                  <p className="titre-modal">{product.titre}
                  </p>
                  <p>
                    <strong>Description : </strong> {product.description}
                  </p>
                  <p>
                    <strong>Etat : </strong> {product.etat}
                  </p>
                  <p>
                    <strong>Prix : </strong> {formatPrix(product.prix)}
                  </p>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
