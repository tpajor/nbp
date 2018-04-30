import React from 'react';

import style from '../App.scss';

export default class Search extends React.Component {
  state = { 
    currencyCode: '',
    imputLengthError: false,
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.currencyCode.length > 3 || this.state.currencyCode.length < 3) {
      this.props.resetServerError();
      this.setState(() => ({ inputLengthError: true, }));
    } else {
      this.setState(() => ({ inputLengthError: false, }));
      this.props.searchByCode(this.state.currencyCode.toLowerCase());
    }
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
          {this.state.inputLengthError ?
            <p style={{color: 'red'}}>Wpisz trzyliterowy kod waluty, np. "USD", "chf"</p> :
            ""
          }
          {this.props.serverError ?
            <p style={{color: 'red'}}>Brak notowań waluty lub nieprawidłowy kod waluty</p> :
            ""
          }
        </div>
        <button type="submit" className={`btn btn-primary col-4 ${style.SearchButton}`}>Szukaj</button>
      </form>
    );
  }
}