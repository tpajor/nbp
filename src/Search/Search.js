import React from 'react';

import style from '../App.scss';

export default class Search extends React.Component {
  state = { currencyCode: '' };

  handleSubmit = event => {
    event.preventDefault();
    this.props.searchByCode(this.state.currencyCode.toLowerCase());
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit} className={style.Form}>
        <div className={`form-group col-8 ${style.Form}`}>
          <input className="form-control"
            type="text" 
            value={this.state.currencyCode}
            onChange={event => this.setState({ currencyCode: event.target.value })}
            placeholder="Wpisz kod waluty"
          />
        </div>
        <button type="submit" className="btn btn-primary col-4">Szukaj</button>
      </form>
    );
  }
}