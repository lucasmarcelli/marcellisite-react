import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MainpageStore from '../../../Stores/MainpageStore';
import Constants from '../../../Constants/Constants';
import MarkdownUtils from '../../../Utils/MarkdownUtils';
import jump from 'jump.js';

import "./css/project.css";

let md = require('markdown-it')({
  breaks: true
});


class Project extends Component {

  constructor(){
    super();
    this.state = {
      active: null,
      occasional: null,
      inactive: null
    };
    this.setProjects = this.setProjects.bind(this);
    this.renderProjects = this.renderProjects.bind(this);
    this.renderProjectButtons = this.renderProjectButtons.bind(this);
    this.renderMore = this.renderMore.bind(this);
    this.toggleLongDesc = this.toggleLongDesc.bind(this);
  }

  componentDidMount(){
    MarkdownUtils.blankTargets(md);
    MainpageStore.addListener(Constants.ProjectConstants.PROJECTS_LOADED, this.setProjects);
    MainpageStore.getProjectList();
  }

  componentWillUnmount(){
    MainpageStore.removeListener(Constants.ProjectConstants.PROJECTS_LOADED, this.setProjects);
  }

  render(){
    return(
      <div>
        <section className="project-top full-height" id="projects">
          <div className="card project-card">
            <h1> Projects </h1>
            <h3> Where My Sleep Lives </h3>
            <div className="project-jump">
                <button className="btn btn-success" onClick={() => (jump("#active-items", {offset: -55}))}>Active Projects</button>
                <button className="btn btn-info" onClick={() => (jump("#inactive-items", {offset: -55}))}>Inactive Projects</button>
            </div>
          </div>
        </section>
        <section className="project-list full-height">
          <div id="active-items" className="project-items">
            {this.renderProjects(this.state.active)}
          </div>
          <div id="inactive-items" className="project-items">
            {this.renderProjects([].concat(this.state.occasional, this.state.inactive))}
          </div>
        </section>
      </div>
    )
  }

  setProjects(projectList){
    let active = [],
        occasional = [],
        inactive = [];

    for(let i = 0; i < projectList.length; i++){
      if(projectList[i].status === "active"){
        active.push(projectList[i]);
      }else if(projectList[i].status === "occasional"){
        occasional.push(projectList[i]);
      }else{
        inactive.push(projectList[i]);
      }
    }

    this.setState({
      active: active,
      occasional: occasional,
      inactive: inactive
    })
  }

  renderProjects(items){
    if(items && items[0] !== null){
      let return_items = [];
      for(let i = 0; i < items.length; i++){
        return_items.push(
          <div className="active-item project-item" key={items[i].status + "-project-" + i}>
            <div className="project-title-container">
              <h1 className="project-title">{items[i].name}</h1>
              <span className={"badge badge-default badge-" + items[i].status}>
                {items[i].statusLabel} &nbsp;
                {items[i].statusEmoji}
              </span>
            </div>
            <div className="project-desc">
              {items[i].description}
            </div>
            {this.renderMore(items[i])}
            <div className="project-buttons">
              {this.renderProjectButtons(items[i])}
            </div>
          </div>
        )
      }
      return return_items;
    }
  }

  renderProjectButtons(item){
    if(item.longDescription || item.links.links.length !== 0){
      let items = [];
      if(item.longDescription){
          items.push(
            <button className="btn btn-info" id={"link-" + item.longDescID} key={"link-" + item.longDescID} onClick={() => this.toggleLongDesc(item.longDescID)}>
              Read More
            </button>
          )
      }
      if(item.links.links.length !== 0){
        let links = item.links.links;
        for(let i = 0; i < links.length; i++){
            if(links[i].external){
              items.push(
                <a className="btn btn-info" key={"link-" + links[i]._id} href={links[i].url} target="_blank">
                  {links[i].label}
                </a>
              )
            }else{
              items.push(
                <Link className="btn btn-info" key={"link-" + links[i]._id} to={links[i].url}>
                  {links[i].label}
                </Link>
              )
            }
        }
      }
      return items;
    }else{
      return null;
    }
  }

  renderMore(item){
    if(item.longDescription){
      let longDescription = (
        <div className="project-long" id={"long-desc-" + item.longDescID}  dangerouslySetInnerHTML={{__html:md.render(item.longDescription)}}/>
      )
      return longDescription;
    }else{
      return null;
    }
  }

  toggleLongDesc(descID){
    let desc = document.getElementById("long-desc-" + descID);
    let link = document.getElementById("link-" + descID);
    if(desc.classList.contains("open")){
      desc.classList.remove("open");
      link.innerText = "Read More";
    }else{
      desc.classList.add("open");
      link.innerText = "Read Less";
    }
  }
}

export default Project;
