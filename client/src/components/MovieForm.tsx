import React, {Component} from 'react';
import {Form, message} from "antd";
import {WrappedFormUtils} from "antd/lib/form/Form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import {IMovie} from "../service/MovieService";
import ImgUploader from "./ImgUploader";
import Checkbox from "antd/lib/checkbox";
import InputNumber from "antd/lib/input-number";
import Switch from "antd/lib/switch";
import {RouteComponentProps, withRouter} from "react-router";


interface IFormProp extends RouteComponentProps{
    form:WrappedFormUtils<any>
    onSubmit:(movie:IMovie)=>Promise<string>
    movie?:IMovie
}
const formItemLayout = {
    labelCol: {
         span: 24
    },
    wrapperCol: {
         span: 24
    },
};
const AllAreas:{label:string,value:string}[] = [
    {label:"中国",value:"中国"},
    {label:"美国",value:"美国"},
    {label:"日本",value:"日本"},
    {label:"韩国",value:"韩国"},
    {label:"德国",value:"德国"},
]
const AllTypes:{label:string,value:string}[] = [
    {label:"爱情",value:"爱情"},
    {label:"科幻",value:"科幻"},
    {label:"动作",value:"动作"},
    {label:"历史",value:"历史"},
    {label:"悬疑",value:"悬疑"},
]
const AreaGroup = Checkbox.Group;
class MovieForm extends Component<IFormProp> {
    private handleSubmit=(e:React.FormEvent<any>)=>{
        e.preventDefault();

        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                // this.handleSubmit(values);
                const result = await this.props.onSubmit(this.props.form.getFieldsValue() as IMovie);
                if(result){
                    message.error(result)
                }else {
                    message.success(result,0.5,()=>{
                        this.props.history.push("/movie")
                    })
                }
            }
        });
    }
    render() {
        const {getFieldDecorator }  = this.props.form;


        return (
            <Form onSubmit={this.handleSubmit}
                  {...formItemLayout}
                  style={{width:"400px"}}
            >
                <Form.Item
                    {...formItemLayout} label={"电影名字"}
                >
                    {
                        getFieldDecorator<IMovie>("name",{
                            rules:[
                                {required:true,message:"名字必填"}
                            ]
                        })(<Input/>)
                    }
                </Form.Item>

                <Form.Item label={"封面"}>
                    {
                        getFieldDecorator<IMovie>("poster")(<ImgUploader/>)
                    }
                </Form.Item>
                <Form.Item label={"地区"}>
                    {
                        getFieldDecorator<IMovie>("areas",{
                            rules:[
                                {required:true,message:"地区必填"}
                            ]
                        })(<AreaGroup options={AllAreas}/>)
                    }
                </Form.Item>
                <Form.Item label={"类型"}>
                    {
                        getFieldDecorator<IMovie>("types",{
                            rules:[
                                {required:true,message:"类型必填"}
                            ]
                        })(<AreaGroup options={AllTypes}/>)
                    }
                </Form.Item>
                <Form.Item
                    wrapperCol={{span:5}} label={"时长/分钟"}
                >
                    {
                        getFieldDecorator<IMovie>("duration",{
                            rules:[
                                {required:true,message:"时长必填"}
                            ]
                        })(<InputNumber min={1} step={10}/>)
                    }
                </Form.Item>
                <Form.Item
                    wrapperCol={{span:5}} label={"正在热播"}
                >
                    {
                        getFieldDecorator<IMovie>("isHot",{
                            initialValue:false,
                            valuePropName:"checked"
                        })(<Switch/>)
                    }
                </Form.Item>
                <Form.Item
                    wrapperCol={{span:5}} label={"即将上映"}
                >
                    {
                        getFieldDecorator<IMovie>("isComing",{
                            initialValue:false,
                            valuePropName:"checked"
                        })(<Switch/>)
                    }
                </Form.Item>
                <Form.Item
                    wrapperCol={{span:5}} label={"经典影片"}
                >
                    {
                        getFieldDecorator<IMovie>("isClassic",{
                            initialValue:false,
                            valuePropName:"checked"
                        })(<Switch/>)
                    }
                </Form.Item>
                <Form.Item
                    wrapperCol={{span:20}} label={"描述"}
                >
                    {
                        getFieldDecorator<IMovie>("description")(<Input.TextArea/>)
                    }
                </Form.Item>
                <Form.Item labelCol={{span:0}} wrapperCol={{span:20,offset:4}}>
                <Button type={"primary"} htmlType={"submit"}>提交</Button>
                </Form.Item>
            </Form>
        );
    }
}
type MovieField = {
    [p in Exclude<keyof IMovie,"_id">]:any
}

function getDefaultField(movie:IMovie) {
    const obj:any = {};
    const keys:string[] = Object.keys(movie);
    const values= Object.values(movie)
    keys.forEach((key,index)=>{
        obj[key] =Form.createFormField({
            value:values[index]
        })

    })
    return obj
}

export default withRouter(Form.create<IFormProp>({
    mapPropsToFields:props => {
        if(props.movie){
            return getDefaultField(props.movie)
        }

    }
})(MovieForm));