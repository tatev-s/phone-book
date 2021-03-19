import {Alert, Form} from "react-bootstrap";
import * as React from "react";
import {endpoint} from "../phoneBook/costants";
import {uploadFile} from "../../_services";

const UploadCsv = () =>{
    const [message, setMessage] = React.useState('');
    const upload = ({target})=>{
        const data = new FormData()
        data.append('file', target.files[0]);
        uploadFile({endpoint:`${endpoint}/import`, data})
            .then(({data})=>{
                if(data){
                    setMessage(`
                            Imported all items count ${data.allSettled},
                            Succeeded items count ${data.fulfilled},
                            Rejected items count ${data.rejected},
                    `)
                }
                target.value = null;
            })
    }
    return (
        <>
            {message ?
                <Alert key='infoMessage' variant={'info'}>
                    {message}
                </Alert>
                : ''}
        <Form.Group controlId="uploadCsv">
            <Form.Label>upload csv</Form.Label>
            <Form.Control
                type="file"
                name={"file"}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"

                onChange={upload}/>
        </Form.Group>
            </>
    )
 }
export default UploadCsv;
