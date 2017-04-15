import React, { Component } from 'react';
import jump from 'jump.js';

import './css/card.css';

class SectionCard extends Component {

  constructor(){
    super();
    this.get_buttons = this.get_buttons.bind(this);
  }


  render(){
    let card_image = (this.props.image ? (
      <div className="card-image text-center">
        <img src={this.props.image} alt={this.props.altText || null} />
      </div>
    ) : null);

    let card_block = (
      <div className="card-block">
        <h4 className="card-title text-center">
          {this.props.title}
        </h4>
        <p className="card-text">
          {this.props.text}
        </p>
      </div>
    );

    let buttons = (this.props.buttons ? (
      <div className="btn-toolbar">
        {this.get_buttons(this.props.buttons)}
      </div>
    ) : null);

    return(
      <div className="card section-card">
        {card_image}
        {card_block}
        {buttons}
      </div>
    )
  }

  get_buttons(button_config){
    let buttons = [];
    for(let i = 0; i < button_config.length; i++){
        let html_button;
        if(button_config[i].url){

          html_button = (
          <a key={"hero-button-" + i} href={button_config[i].url} target={button_config[i].external ? "_blank" : null} className={"btn btn-info " + (button_config[i].cssClass ? button_config[i].cssClass : "")}>
            {button_config[i].label}
          </a> );
        }else{
          html_button = (
          <button key={"hero-button-" + i} onClick={() => jump(button_config[i].jump, {offset: -60})} className={"btn btn-info " + (button_config[i].cssClass ? button_config[i].cssClass : "")}>
            {button_config[i].label}
          </button> );
        }
      buttons.push(html_button);
    }
    return buttons;
  }
}

export default SectionCard;
