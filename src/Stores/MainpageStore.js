import Config from "../Config/config";
import Constants from "../Constants/Constants";
const EventEmitter = require('events');

class MainpageStoreClass extends EventEmitter {

  constructor(){
    super();
    this.projectList = null;
  }

  getProjectList(refresh){
    if(!refresh && this.projectList){
        this.emit(Constants.ProjectConstants.PROJECTS_LOADED, this.projectList);
    }else{
        let self = this;
        let request = new Request(Config.api.base + "/main/projects", Constants.RESTConstants.GET);
        fetch(request)
          .then(function(response){
            if(response.ok){
              return(response.json())
            }
          })
          .then(function(response){
            self.setProjectList(response);
          })
    }
  }

  setProjectList(projectList){
    this.projectList = projectList;
    this.emit(Constants.ProjectConstants.PROJECTS_LOADED, projectList);
  }
}

let MainpageStore = new MainpageStoreClass();

export default MainpageStore;
