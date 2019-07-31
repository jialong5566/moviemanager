import React, {Component} from 'react';
import {IMovieState} from "../redux/reducers/MovieReducer";
import {message, Switch, Table} from "antd";
import {ColumnProps, PaginationConfig} from "antd/lib/table";
import {IMovie} from "../service/MovieService";
import defaultImg from "../assets/default.jpg";
import {SwitchType} from "../service/CommonTypes";
import Button from "antd/lib/button";
import {NavLink} from "react-router-dom";
import Popconfirm from "antd/lib/popconfirm";
import Icon from "antd/lib/icon";
import Input from "antd/lib/input";

export interface IMovieTableEvent {
    onLoad:()=>void
    onSwitchChange:(type:SwitchType,newState:boolean,id:string)=>void
    onDelete:(id:string)=>Promise<void>
    onPageChange:(newPage:number)=>void
    onKeyChange:(e:any)=>void
    onSearch:()=>void
}

class MovieTable extends Component<IMovieState & IMovieTableEvent> {
    componentDidMount(): void {
        if(this.props.onLoad){
            this.props.onLoad();
        }
    }

    private getFilterDropDown=(p:Object)=>{
        return (
            <div style={{ padding: 8 }}>
                <Input
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                    value={this.props.condition.key}
                    onChange={e=>{this.props.onKeyChange(e.target.value)}}
                    onPressEnter={this.props.onSearch}
                />
                <Button
                    type="primary"
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                    onClick={this.props.onSearch}
                >
                    Search
                </Button>
                <Button  size="small" style={{ width: 90 }} onClick={()=>{
                    this.props.onKeyChange("");
                    this.props.onSearch();
                }}>
                    Reset
                </Button>
            </div>
        )
    }
    private getColumns():ColumnProps<IMovie>[]{
        return [
            {title:"海报",dataIndex:"poster",
                render:(poster:string)=>{
                    if (poster) {
                        return (
                         <img src={poster} alt=""/>
                        )
                    }
                    else {
                        return <img width={50} height={50} src={defaultImg}/>
                    }
            }},
            {
                title:"电影名",
                dataIndex:"name",
                filterDropdown:this.getFilterDropDown,
                filterIcon:<Icon type={"search"}/>
            },
            {title:"上映地区",dataIndex:"areas",
            render:(text:string[])=>{
                return (
                    text.join(", ")
                )
            }},
            {title:"上映地区",dataIndex:"types",
                render:(text:string[])=>{
                    return (
                        text.join(", ")
                    )
            }},
            {
                title:"时长/分钟",
                dataIndex:"duration"
            },{
                title:"正在热映",
                dataIndex:"isHot",
                render:(isHot,record)=>{
                    return (
                        <Switch checked={!!isHot} defaultChecked={!!isHot}  onChange={(newVal)=>{
                            this.props.onSwitchChange(SwitchType.isHot,newVal,record._id!);
                        }}/>
                    )
                }
            },{
                title:"即将上映",
                dataIndex:"isComing",
                render:(isComing,record)=>{
                    return (
                        <Switch checked={!!isComing} defaultChecked={!!isComing}  onChange={(newVal)=>{
                            this.props.onSwitchChange(SwitchType.isComing,newVal,record._id!);
                        }}/>
                    )
                }
            },{
                title:"即将上映",
                dataIndex:"isClassic",
                render:(isClassic,record)=>{
                    return (
                        <Switch checked={!!isClassic} defaultChecked={!!isClassic}  onChange={(newVal)=>{
                            this.props.onSwitchChange(SwitchType.isClassic,newVal,record._id!);
                        }}/>
                    )
                }
            },
            {
                title:"操作",
                dataIndex:"_id",
                render:(id:string)=>{
                return (
                    <div>
                        <NavLink to={`/movie/edit/${id}`}>
                            <Button type={"primary"} size={"small"}>编辑</Button>
                        </NavLink>
                        <Popconfirm title={"确认要删除"} onConfirm={async()=>{
                            await this.props.onDelete(id);
                            message.success("删除 成功");
                        }}>
                            <Button type={"danger"} size={"small"} >删除</Button>
                        </Popconfirm>

                    </div>
                    )
                }
            }
        ];
    }
    getPageConfig():PaginationConfig|false {
        if(this.props.total==0){
            return false;
        }
        return {
            current:this.props.condition.page,
            pageSize:this.props.condition.limit,
            total:this.props.total
        }
    }
    handleChange(pagination:PaginationConfig){
        this.props.onPageChange(pagination.current!);
    }
    render() {
        return (
            <Table dataSource={this.props.data}
                columns={this.getColumns()}
                rowKey={"_id"}
                pagination={this.getPageConfig()}
                onChange={this.handleChange.bind(this)}
                loading={this.props.isLoading}
                >
            </Table>
        );
    }
}

export default MovieTable;