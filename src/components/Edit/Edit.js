import React, { Component } from 'react';
import { connect } from 'react-redux';


class Edit extends Component {

    //create a state to hold the values locally
    state = ({
        title: '',
        description: '',
    })

    //I probably shpuld just go back to details, but going home will do
    home=()=>{
        this.props.history.push('/');
    }

    //I need a way to send the details to the server
    handleEditDetails =(id) => {
        this.props.dispatch({ type: 'EDIT_DETAILS', payload: {title: this.state.title, description: this.state.description, id: this.props.match.params.movieId}});
        //I probably should add a confirmation here
        //once edited go back to details
        this.props.history.push(`/edit/${this.props.match.params.movieId}`);
    }

    handleChange = name => event => {
        console.log(event.target);
        this.setState({ [name]: event.target.value,});
      };

    render() {
        return(
            <div>
                <h2>Edit</h2>
                {JSON.stringify(this.props.match)}
                <input
                    placeholder="Title"
                    value={this.state.title}
                    onChange={this.handleChange('title')}/>
                <input
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.handleChange('description')}/>
                <br />
                <button onClick={this.handleEditDetails}>Save Details</button>
                <br />
                <button onClick={this.home}>Cancel</button>
             </div>
        );
    }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
});

export default connect(putReduxStateOnProps)(Edit);