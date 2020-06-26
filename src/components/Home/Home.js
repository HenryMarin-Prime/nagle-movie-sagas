import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component{

    //We need to see all the movies from DB
    //once we get those we can display on DOM
    componentDidMount=()=>{
        this.props.dispatch({ type: "GET_MOVIES" });
    }

    getDetails=(id)=>{
        this.props.history.push(`/details/${id}`);
    }

    render(){
        return(
         <>
         <h2>Click On A Movie To View Details</h2>
         {/* {JSON.stringify(this.props.movies)} */}
         <section>
             {this.props.movies.map((movie)=>
             <div key={movie.id}>
                 <h2>{movie.title}</h2>
                 <button onClick={()=>this.getDetails(movie.id)}>
                 <img src={movie.poster} alt={movie.title}/></button>
             </div>
             )}
         </section>
         </>
        );
    }
}

const putReduxStateOnProps = (reduxState) => ({
    movies: reduxState.movies
})
export default connect(putReduxStateOnProps)(Home);