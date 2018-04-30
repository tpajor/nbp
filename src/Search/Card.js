import React from 'react';

import style from '../App.scss';

const Card = (props) => {
  return (
    <div className={style.Card}>
      <div className={`row ${style.CardMainContainer}`}>
        <div className={`col-4 ${style.CardMainCell} ${style.Left}`}>
          <p className={style.CardMainCellText}>
            {props.cardData.code}
          </p>
        </div>
        <div className={`col-4 ${style.CardMainCell} ${style.Mid}`}>
          <p className={style.CardMainCellText}>
            {props.cardData.rates[0].ask}  
          </p>  
        </div>
        <div className={`col-4 ${style.CardMainCell} ${style.Right}`}>
          <p className={style.CardMainCellText}>
          {props.cardData.rates[0].bid}
          </p>
          {props.isTemporary ? 
            '' :
            <button className={style.DeleteCardButton} onClick={() => props.deleteCard(props.cardData)}>X</button>
          }
        </div>
      </div>
      <div className={style.CardNameCell}>
        <p>
          {props.cardData.currency}
        </p>
      </div>
      { (props.isTemporary) ?
        <div className={style.DoubleButton}>
          <button className={style.SaveButton} onClick={() => props.saveCard(props.cardData)}>
            Zapisz
          </button> 
          <button className={style.HalfCardButton} onClick={() => props.showDetails(props.cardData.code)}>
            Szczegóły
          </button>
        </div> :
        <button className={style.CardButton} onClick={() => props.showDetails(props.cardData.code)}>
          Szczegóły
        </button>
      }
    </div>
  );
};

export default Card;