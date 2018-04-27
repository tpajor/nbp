import React from 'react';
import axios from 'axios';

import Search from './Search';
import Card from './Card';
import CardList from './CardList';

import style from '../App.scss';

export default class SearchContainer extends React.Component {
  state = { 
    cards: [],
    temporaryCard: null
  };

  searchByCode = (currencyCode) => {
    axios.get(`http://api.nbp.pl/api/exchangerates/rates/c/${currencyCode}/today/`)
      .then(res => {
        this.setState({ temporaryCard: res.data });
      });
  };

  saveCard = (card) => {
    this.setState(prevState => ({ 
      cards: prevState.cards.concat(card) 
    }));
  };

  render() {
    const { temporaryCard, cards } = this.state;
    return (
      <div className={`col-4 ${style.SearchView}`}>
        <Search searchByCode={this.searchByCode}/>
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