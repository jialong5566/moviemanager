import React, {Component} from 'react';
import {Upload, Icon, message} from "antd";
import {UploadFile, UploadChangeParam} from "antd/lib/upload/interface";
import {IResponseData, IResponseError} from "../service/CommonTypes";
import {previewImage} from "antd/lib/upload/utils";
import Modal from "antd/lib/modal";

interface IImgUploaderProps {
    curImgUrl?:string,
    onChange?:(imgUrl:string)=>void
}

interface IImgState {
    showModal:boolean
}
export default class  extends Component<IImgUploaderProps> {
    state:IImgState = {
       showModal:false
    }

    private getUploadContent(){
        if(!this.props.curImgUrl){
            return (
                <div>
                    <Icon type={"plus"}></Icon>
                    <div>传图</div>
                </div>
            )
        }else {
            return null;
        }
    }
    private getFileList():UploadFile[]{
        if(this.props.curImgUrl){
            return [
                {
                    uid:this.props.curImgUrl,
                    name:this.props.curImgUrl
                }
            ]
        }
        return [];
    }

    async handleRequest(p:any){
        let formData = new FormData();
        formData.append(p.filename,p.file);
        const request = new Request(p.action,{
            method:"post",
            body:formData
        });
        const resp:IResponseData<string>|IResponseError = await fetch(request).then(resp=>resp.json());
        if(resp.err){
            message.error("上传失败");
        }else {
            this.props.onChange&&this.props.onChange(resp.data!);
        }
    }

    render() {

        return (
            <>
                <Upload
                    action={"/api/upload"}
                    name={"imgfile"}
                    accept={".jpg,.png,.gif,.bmp"}
                    listType={"picture-card"}
                    fileList={this.getFileList()}
                    customRequest={this.handleRequest.bind(this)}
                    onRemove={() => {
                        if(this.props.onChange){
                            this.props.onChange("");
                        }

                    }}
                    onPreview={() => {
                        this.setState({
                            showModal:true
                        })
                    }}
                >
                    {this.getUploadContent()}
                </Upload>
                <Modal
                    visible={this.state.showModal}
                    footer={null}
                    onCancel={
                        ()=>{
                            this.setState({showModal:false})
                        }
                    }
                >
                    <img alt="" style={{width: '100%'}} src={this.props.curImgUrl}/>
                </Modal>
            </>
        );
    }
};