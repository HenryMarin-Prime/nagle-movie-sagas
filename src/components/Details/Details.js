import React, { Component } from 'react';
import { connect } from 'react-redux';

class Details extends Component {

    //all the info needs to be displayed, making a call to the get function
    componentDidMount=()=> {
        this.getDetails(this.props.match.params.id);
    }
    
    //we need to be able to see the details from DB
    getDetails = (id) => {
        this.props.dispatch({ type: "GET_DETAILS", payload: id });
    }

    //let's go home
    home=()=>{
        this.props.history.push('/');
    }

    //we need a way to send to edit component
    edit=()=> {
        this.props.history.push(`/edit/${this.props.match.params.id}`)

    }

    render(){
        return(
            <>
            {JSON.stringify(this.props.match.params.id)}
            <section>
                {this.props.details.map((detail)=>
                <div key={detail.id}>
                    <h2>{detail.title}</h2>
                    <img src={detail.poster} alt={detail.title} />
                    <p>{detail.description}</p>
                </div>)}
                <button onClick={this.edit}>Edit Movie</button>
                <button onClick={this.home}>HOME</button>
            </section>
            </>
        );
    }
}

const putReduxStateOnProps = (reduxState) => ({
    details: reduxState.details
})
export default connect(putReduxStateOnProps)(Details);