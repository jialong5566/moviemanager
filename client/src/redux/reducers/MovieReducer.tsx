import {IMovie} from "../../service/MovieService";
import {ISearchCondition} from "../../service/CommonTypes";
import {
    DeleteAction,
    MovieActions,
    MovieChangeSwitchAction,
    SaveMoviesAction,
    SetConditionAction,
    SetLoadingAction
} from "../actions/MovieAction";
import {Reducer} from "react";

//类型演算出 搜索条件
export type IMovieCondition = Required<ISearchCondition>
export interface IMovieState {
    /**
     * 总记录
     */
    data:IMovie[]
    /**
    * 查询条件
    */
    condition:IMovieCondition
    /**
     * 总数量
     */
    total:number
    /**
     * 是否正在加载
     */
    isLoading:boolean,
    /**
    * 总页数
    */
    totalPage:number
}

const defaultState:IMovieState = {
    data:[],
    condition:{
        page:1,
        limit:10,
        key:""
    },
    total:0,
    isLoading:false,
    totalPage:1
}


type MovieReducer<A> = Reducer<IMovieState,A>

const  saveMovie:MovieReducer<SaveMoviesAction> = function (state,action) {
    return {
        ...state,
        data:action.payload.movies,
        total:action.payload.total,
        totalPage:Math.ceil(action.payload.total/state.condition.limit)
    };
}
const  setCondition:MovieReducer<SetConditionAction> = function (state,action) {
    const newState =  {
        ...state,
        condition:{
            ...state.condition,
            ...action.payload
        }
    };
    newState.totalPage = Math.ceil(newState.totalPage/newState.condition.limit);
    return newState;
}
const  deleteMovie:MovieReducer<DeleteAction> = function (state,action) {
    return {
        ...state,
        data:state.data.filter(m=>m._id!==action.payload),
        total:state.total-1,
        totalPage:Math.ceil((state.totalPage-1)/state.condition.limit)
    };
}

const  setLoading:MovieReducer<SetLoadingAction> = function (state,action) {
    return {
        ...state,
        isLoading:action.payload
    };
}

const changeSwitch:MovieReducer<MovieChangeSwitchAction> = function (state,action) {
    const movie = state.data.find(d=>d._id===action.payload.id);
    if(!movie){
        return state;
    }else {
        const newMovie = {...movie};
        newMovie[action.payload.type] = action.payload.newVal;
        const newData = state.data.map(d=>{
            if(d._id===action.payload.id){
                return newMovie;
            }else {
                return d;
            }
        })
        return {
            ...state,
            data:newData
        }
    }
}

export default function(state:IMovieState = defaultState,action:MovieActions) {
   switch (action.type) {
       case "movie_deleteAction":
           return  deleteMovie(state,action);
       case "movie_save":
           return  saveMovie(state,action);
       case "movie_setCondition":
           return  setCondition(state,action);
       case "movie_setLoading":
           return setLoading(state,action);
       case "movie_switch":
           return changeSwitch(state,action);
       default:
           return state;
   }
}