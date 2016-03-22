import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: 'andungtra',
            userData:[],
            userRepos:[],
            perPage:10
        }
    }
    getUserData() {
      $.ajax({
        url: 'https://api.github.com/users/' + this.state.username + '?client_id=' + this.props.clientId + '&client_secret=' + this.props.clientSecret,
        dataType: 'json',
        cache: false,
        success:function(data) {
          console.log(data);
          this.setState({userData: data});

        }.bind(this),
        error: function(xhr, status, error) {
          this.setState({username: null});
          alert(error);
        }.bind(this)
      })
    }
    getUserRepos() {
      $.ajax({
        url: 'https://api.github.com/users/' + this.state.username + '/repos?per_page='+ this.state.perPage + '&client_id=' + this.props.clientId + '&client_secret=' + this.props.clientSecret + '&sort=created',
        dataType: 'json',
        cache: false,
        success:function(data) {
          console.log(data);
          this.setState({userRepos: data});

        }.bind(this),
        error: function(xhr, status, error) {
          this.setState({username: null});
          alert(error);
        }.bind(this)
      })
    }
    handleFormSubmit(username) {
      this.setState({username: username}, function(){
        this.getUserData();
        this.getUserRepos();
      });
    }
    componentDidMount() {
      this.getUserData();
      this.getUserRepos();
    }
    render(){

        return(
            <div>
                <Search onFormSubmit= {this.handleFormSubmit.bind(this)} />
                <Profile {...this.state} />
            </div>
        )
    }
}

App.propTypes = {
    clientId: React.PropTypes.string,
    clientSecret: React.PropTypes.string
};
App.defaultProps = {
    clientId: '617a7c93178d53327ca7',
    clientSecret: '9b429df74aa6464aae84efa15f8a7cd4e9f658a4'
}

export default App
