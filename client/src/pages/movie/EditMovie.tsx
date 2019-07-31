import React, {Component} from 'react';
import {RouteComponentProps} from "react-router";
import MovieForm from "../../components/MovieForm";
import {IMovie, MovieService} from "../../service/MovieService";
import {message} from "antd";

interface IParams {
    id:string
}
interface EditPgaeState {
    movie?:IMovie
}
class EditMovie extends Component<RouteComponentProps<IParams>,EditPgaeState> {
    state:EditPgaeState ={
        movie:undefined
    }
    async componentDidMount() {
        const resp = await MovieService.getMovieById(this.props.match.params.id);
        if(resp.data){
            this.setState({
                movie:resp.data
            })
        }

    }

    render() {
        return (
                <MovieForm
                    movie={this.state.movie}
                    onSubmit={async (movie)=>{
                    const resp = await MovieService.edit(this.props.match.params.id,movie);
                    return resp.data?"":resp.err;
                }}/>
        );
    }
}

export default EditMovie;