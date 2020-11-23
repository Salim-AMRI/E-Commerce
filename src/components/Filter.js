import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filter-result">{this.props.count} produits</div>
        <div className="filter-type">
          Type :{"  "}
          <select value={this.props.type} onChange={this.props.filterType}>
            <option>TOUT</option>
            <option value="Decoration">Deco.</option>
            <option value="Service à table">ServiceT.</option>
            <option value="Electromenager">ElectroM.</option>
            <option value="Meuble">Meuble</option>
            <option value="Hytech">Hytech</option>
            <option value="Vetement">Vetement</option>
            <option value="Jouet">Jouet</option>
            <option value="Sport">Sport</option>
            <option value="Outillage">Outillage</option>
          </select>{" "}
        </div>
        <div className="filter-etat">
          Etat :{"  "}
          <select value={this.props.etat} onChange={this.props.filterEtat}>
            <option>TOUT</option>
            <option value="Neuve">Neuve</option>
            <option value="Ancienne">Ancienne</option>
          </select>{" "}
        </div>
        <div className="filter-prix">
          Prix :{"  "}
          <select value={this.props.tri} onChange={this.props.sortPrix}>
            <option>TOUT</option>
            <option value="Moins">Moins cher</option>
            <option value="Plus">Plus cher</option>
          </select>{" "}
        </div>
      </div>
    );
  }
}
