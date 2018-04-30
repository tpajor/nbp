import React from 'react';

import style from '../App.scss';

export default class Input extends React.Component {
  state = { 
    numberOfData: null,
    errorMessage: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    const value = parseInt(this.state.numberOfData, 10);
    if (isNaN(value)) {
      this.setState({ errorMessage: 'Wpisz liczbę' });
      this.props.resetServerError();
    } else if (value > 250 || value <= 0) {
      this.setState({ errorMessage: 'Maksymalna liczba notowań to 250' });
      this.props.resetServerError();
    } else {
      this.setState({ errorMessage: '' });
      this.props.getDataForChart(value);
    }
  }

  render() {
    const { errorMessage, numberOfData } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={style.Form}>
        <div className={`form-group col-2 ${style.Input}`}>
          <input className="form-control-plaintext"
            type="text" 
            value={this.props.code.toUpperCase()}
            readOnly
          />
        </div>
        <div className={`form-group col-6 ${style.Form}`}>
          <input className="form-control"
            type="text" 
            value={numberOfData}
            onChange={event => this.setState({ numberOfData: event.target.value })}
            placeholder="Wpisz liczbę ostatnich kursów"
          />
          {(this.props.serverError) ?
            <p style={{color: 'red'}}>Błąd serwera. Upewnij się, że wpisałeś liczbę i spróbuj ponownie</p> :
            <p style={{color: 'red'}}>{errorMessage}</p>
          }
        </div>
        <button type="submit" className={`btn btn-primary col-4 ${style.SearchButton}`} disabled={this.props.code === ''}>Pokaż</button>
      </form> 
    );
  }
};