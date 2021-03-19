import * as React from 'react';
import {getRequest} from "../../_services";
import { endpoint} from "./costants";
import { useParams } from "react-router-dom";
import GroupForm from "./form";
const Edit = (props) => {
    const {id} = useParams();
    const [record, setRecord] = React.useState({});
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(()=>{
        if(!loaded){
            getRequest({endpoint:`${endpoint}/${id}`})
                .then(({data})=>{
                    setLoaded(true)
                    setRecord(data)
                })
        }
    },[loaded]);
    if(!record.id) return ''
    return (<GroupForm record={record} {...props}/>)
}
export default Edit;
