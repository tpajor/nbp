import React from 'react';
import axios from 'axios';
import Clock from 'react-live-clock';

import Input from './Input';
import Chart from './Chart';

import style from '../App.scss';

export default class DetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      dataForChart: null,
      serverError: false,
    };
    let contWidth = null;
    this.getWidth = element => {
      this.contWidth = element.offsetWidth * 0.8;
    };
  }

  getDataForChart = (numberOfData) => {
    axios.get(`http://api.nbp.pl/api/exchangerates/rates/c/${this.props.code}/last/${numberOfData}/`)
      .then(res => {
        const chartData = this.prepareDataForChart(res.data);
        this.setState({ dataForChart: chartData, serverError: false, });
      })
      .catch(() => {
        this.setState({ serverError: true, });
      });
  };

  prepareDataForChart = (dataFromApi) => {
    return dataFromApi.rates.map(this.normalizeDataForChart);
  };

  normalizeDataForChart = (data, i) => {
    const dataNormalizedForChart = {};
    dataNormalizedForChart.name = data.effectiveDate;
    dataNormalizedForChart.kupno = data.ask;
    dataNormalizedForChart.sprzedaż = data.bid;
    return dataNormalizedForChart;
  };

  resetServerError = () => {
    this.setState({ serverError: false });
  };

  render() {
    const { dataForChart, serverError } = this.state;
    return (
      <div  className={`col-8 ${style.DetailView}`}>
        <Clock format={'YYYY-MM-DD HH:mm:ss'} ticking={true} timezone={'Europe/Warsaw'} />
        <div className={`${style.Chart}`} ref={this.getWidth}>
          <Input code={this.props.code}
            getDataForChart={this.getDataForChart}
            serverError={serverError}
            resetServerError={this.resetServerError}
          />
          <Chart dataToPlot={dataForChart}
            contWidth={this.contWidth}
          />
        </div>
      </div>
    );
  }
};