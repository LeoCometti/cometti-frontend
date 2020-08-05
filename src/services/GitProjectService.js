import axios from 'axios'

//const GITPROJECTS_REST_API_URL = "http://localhost:8090/gitprojects";
const GITPROJECTS_REST_API_URL = "https://cometti-backend.herokuapp.com/gitprojects";

class GitProjectService {
    getGitProjects() {
        return axios.get(GITPROJECTS_REST_API_URL);
    }

    setGitProjects(obj) {
        return axios.post(GITPROJECTS_REST_API_URL, obj);
    }
}

export default new GitProjectService()