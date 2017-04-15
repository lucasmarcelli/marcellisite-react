import Config from "../Config/config";
const EventEmitter = require('events');

const ProjectConstants = {
  PROJECTS_LOADED: 'PROJECTS_LOADED'
}

class MainpageStoreClass extends EventEmitter{

  constructor(){
    super();
    this.projectList = null;
  }

  getProjectList(refresh){
    if(!refresh && this.projectList){
        this.emit(ProjectConstants.PROJECTS_LOADED, this.projectList);
    }else{
        let self = this;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", Config.api.base + "/main/projects", true);
        xhr.onreadystatechange = function(){
          if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              self.setProjectList(JSON.parse(xhr.responseText));
          }
        }
        xhr.send();
    }
  }

  setProjectList(projectList){
    this.projectList = projectList;
    this.emit(ProjectConstants.PROJECTS_LOADED, projectList);
  }
}

let MainpageStore = new MainpageStoreClass();

export default MainpageStore;
