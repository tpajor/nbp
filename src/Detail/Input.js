import React from 'react';

import style from '../App.scss';

export default class Input extends React.Component {
  state = { numberOfData: null };

  handleSubmit = event => {
    event.preventDefault();
    this.props.getDataForChart(this.state.numberOfData);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={style.Form}>
        <div className={`form-group col-2 ${style.Form}`}>
          <input className={`form-control-plaintext ${style.Input}`}
            type="text" 
            value={this.props.code.toUpperCase()}
            readOnly
          />
        </div>
        <div className={`form-group col-6 ${style.Form}`}>
          <input className="form-control"
            type="text" 
            value={this.state.numberOfData}
            onChange={event => this.setState({ numberOfData: event.target.value })}
            placeholder="Wpisz liczbę ostatnich kursów"
          />
        </div>
        <button type="submit" className="btn btn-primary col-4" disabled={this.props.code === ''}>Pokaż</button>
      </form> 
    );
  }
};