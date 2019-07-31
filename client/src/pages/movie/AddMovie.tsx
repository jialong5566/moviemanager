import React, {Component} from 'react';
import MovieForm  from "../../components/MovieForm"
import {MovieService} from "../../service/MovieService";
class AddMovie extends Component {
    render() {
        return (
            <div>
                <MovieForm
                    onSubmit={async (movie)=>{
                    const resp = await MovieService.add(movie);
                    return resp.data?"":resp.err;
                }}/>
            </div>
        );
    }
}

export default AddMovie;