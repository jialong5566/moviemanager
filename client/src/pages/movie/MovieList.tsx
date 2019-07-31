import React, {Component, Dispatch} from 'react';
import MovieTable, {IMovieTableEvent} from "../../components/MovieTable";
import {connect} from "react-redux";
import {IRootState} from "../../redux/reducers/RootReducer";
import MovieAction from "../../redux/actions/MovieAction";
import {IMovieState} from "../../redux/reducers/MovieReducer";

function mapStateToProps(state:IRootState) :IMovieState{
    return state.movie;
}

function mapDispatchToProps(dispatch:Dispatch<any>) :IMovieTableEvent{
    return {
        onLoad(){
            dispatch(MovieAction.fetchMovies({page:1,limit:10,key:""}))
        },
        onSwitchChange(type,newState,id){
            dispatch(MovieAction.changeSwitch(type, newState,id))
        },
        async onDelete(id){
            await dispatch(MovieAction.deleteMovie(id))
        },
        onPageChange(newPage){
            dispatch(MovieAction.fetchMovies({page:newPage,limit:10,key:""}))
        },
        onKeyChange(key){
            dispatch(MovieAction.setConditionAction({key}))
        },
        onSearch(){
            dispatch(MovieAction.fetchMovies({
                page:1
            }))
        }
    }
}

const MovieContainer  = connect(mapStateToProps,mapDispatchToProps)(MovieTable);

class MovieList extends Component {
    render() {
        return (
            <MovieContainer />
        );
    }
}

export default MovieList;