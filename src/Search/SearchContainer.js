import React from 'react';
import axios from 'axios';

import Search from './Search';
import Card from './Card';
import CardList from './CardList';

import style from '../App.scss';

export default class SearchContainer extends React.Component {
  state = { 
    cards: [],
    temporaryCard: null,
    serverError: false,
  };

  searchByCode = (currencyCode) => {
    if (currencyCode.length > 3 || currencyCode.length < 3) {
      return ;
    } else {
      axios.get(`http://api.nbp.pl/api/exchangerates/rates/c/${currencyCode}/today/`)
        .then(res => {
          this.setState({ temporaryCard: res.data, serverError: false, });
        })
        .catch(() => {
          this.setState({ serverError: true, })
        });
    }
  };

  saveCard = (card) => {
    this.setState(prevState => ({ 
      cards: prevState.cards.concat(card) 
    }));
  };

  resetServerError = () => {
    console.log('??');
    this.setState({ serverError: false, });
  }

  render() {
    const { temporaryCard, cards, serverError } = this.state;
    return (
      <div className={`col-4 ${style.SearchView}`}>
        <Search searchByCode={this.searchByCode}
          serverError={serverError}
          resetServerError={this.resetServerError}
        />
        {(temporaryCard !== null) ?
          <Card cardData={temporaryCard}
            saveCard={this.saveCard}
            showDetails={this.props.showDetails}
            isTemporary={true}
          /> :
          <br />
        }
        <CardList cards={cards}
          showDetails={this.props.showDetails}
        />
      </div>
    );
  }
};