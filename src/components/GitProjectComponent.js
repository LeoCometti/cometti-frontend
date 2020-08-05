import React from 'react';
import { Button } from 'react';
import GitProjectService from '../services/GitProjectService';


class GitProjectComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            gitprojects:[],
            textUrl: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        GitProjectService.getGitProjects().then((response) => {
            this.setState({ gitprojects: response.data })
        });
    }

    handleChange(event) {
        this.setState({textUrl: event.target.value});  
    }

    handleSubmit(event) {
        GitProjectService.setGitProjects({"url": this.state.textUrl})
        .then((res) => {
            GitProjectService.getGitProjects().then((response) => {
                this.setState({ gitprojects: response.data })
            });
        })
        
        this.setState({textUrl: ''});
    
    }

    render () {
        return (
            <div>
                <h1 className = "text-center"> Git Project List</h1>
                
                <div class="navbar navbar-inverse navbar-fixed-top" role="navigation"></div>
                <div className="container" style={{ paddingTop:15, paddingBottom: 25 }}>
                    <div className="container">
                        <div class="input-group">
                            <input type='text' value={this.state.textUrl} onChange={this.handleChange}/>
                            <span class="input-group-btn">
                                <button onClick={this.handleSubmit} 
                                    type="button" class="btn btn-primary">Add github url</button>{''}
                            </span>
                        </div>
                    </div>
                </div>


                <table className = "table table-striped">

                    <thead>
                        <tr> 
                            <td> List of files </td> 
                            <td> Url </td> 
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.gitprojects.map(
                                gitproject =>
                                <tr key = {gitproject.id}>
                                    <td> {gitproject.groupedFiles.map(
                                        files =>
                                    <div>Extension: {files.extension}, Number of files: {files.numberOfFiles}, Number of lines {files.numberOfLines}, Number of bytes {files.numberOfBytes}</div>
                                    )} </td>
                                    <td> {gitproject.url} </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default GitProjectComponent