import React from 'react';

import SearchContainer from './Search/SearchContainer';
import DetailContainer from './Detail/DetailContainer';

import style from './App.scss';

export default class MainView extends React.Component {
  state = { cardForDetailedShow: '' }

  showDetails = (code) => {
    this.setState({ cardForDetailedShow: code });
  }

  render() {
    const { cardForDetailedShow } = this.state;
    return (
      <div className={`row ${style.MainView}`}>
        <SearchContainer showDetails={this.showDetails}/>
        <DetailContainer code={cardForDetailedShow.toLowerCase()}/>
      </div>
    );
  }
}