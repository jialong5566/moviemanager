import {ThunkAction} from "redux-thunk";
import {IAction} from "./ActionTypes";
import {IMovie, MovieService} from "../../service/MovieService";
import {ISearchCondition, SwitchType} from "../../service/CommonTypes";
import {IRootState} from "../reducers/RootReducer";
export type SaveMoviesAction = IAction<"movie_save",{
    movies:IMovie[]
    total:number
}>

function saveMoviesAction(movies:IMovie[],total:number) :SaveMoviesAction{
    return {
        type:"movie_save",
        payload:{
            movies,
            total
        }
    }
}

export type SetLoadingAction = IAction<"movie_setLoading",boolean>
function setLoadingAction(isLoading:boolean) :SetLoadingAction{
    return {
        type:"movie_setLoading",
        payload:isLoading
    }

}

export type SetConditionAction = IAction<"movie_setCondition",ISearchCondition>

function setConditionAction(condition:ISearchCondition):SetConditionAction {
    return {
        type:"movie_setCondition",
        payload:condition
    }
}


export type DeleteAction = IAction<"movie_deleteAction",string>
function deleteAction(id:string):DeleteAction {
    return {
        type:"movie_deleteAction",
        payload:id
    }
}



export type MovieChangeSwitchAction = IAction<"movie_switch",{
    type:SwitchType,
    newVal:boolean,
    id:string
}>
function changeSwitchAction(type:SwitchType,newVal:boolean,id:string):MovieChangeSwitchAction {
    return {
        type:"movie_switch",
        payload:{
            type,
            newVal,
            id
        }

    }
}
function changeSwitch(type:SwitchType,newVal:boolean,id:string):ThunkAction<Promise<void>,IRootState,any,MovieActions>{
    return async dispatch => {
        dispatch(changeSwitchAction(type,newVal,id));
         await MovieService.edit(id,{
            [type]:newVal
        })
    }
}

function fetchMovies(condition:ISearchCondition):ThunkAction<Promise<void>,IRootState,any,MovieActions>{
    return async (dispatch,getState)=>{
        dispatch(setLoadingAction(true));
        dispatch(setConditionAction(condition));
        const curState = getState().movie.condition;
        const resp = await MovieService.getMovies(curState);
        dispatch(saveMoviesAction(resp.data,resp.total));
        dispatch(setLoadingAction(false));
    }
}

function deleteMovie(id:string) :ThunkAction<Promise<void>,IRootState,any,MovieActions>{
    return async (dispatch,getState)=>{
        dispatch(setLoadingAction(true));
        await MovieService.delete(id);
        dispatch(deleteAction(id));
        dispatch(setLoadingAction(false));
    }
}
export type MovieActions = SetConditionAction|SetLoadingAction|SaveMoviesAction|DeleteAction|MovieChangeSwitchAction;
export default {
    saveMoviesAction,
    setLoadingAction,
    setConditionAction,
    deleteAction,
    fetchMovies,
    deleteMovie,
    changeSwitchAction,
    changeSwitch
}