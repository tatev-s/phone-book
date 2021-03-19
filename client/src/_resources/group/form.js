import * as React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import {patchRequest, postRequest} from "../../_services";
import { endpoint, formName} from "./costants";
import { useParams } from "react-router-dom";

const GroupForm = ({history, record = null}) => {
    const {id} = useParams();
    const [formState, setFormState] = React.useState( record ||{});
    const [validated, setValidated] = React.useState(false);
    const [error, setError] = React.useState('');
    const handleChange = ({target: {name, value}}) => {
        formState[name] = value;
        setFormState(formState);
    }
    const sendRequest = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() !== false) {
            const request = id ?
                patchRequest({endpoint: `${endpoint}/${id}`, data: formState})
                :
                postRequest({endpoint: `${endpoint}`, data: formState});
            request.then(({data, error}) => {
                if (!error) {
                    if(id){
                        window.location.reload(false);
                    }else{
                        history.push(`/${endpoint}/edit/${data.id}`)
                    }
                } else {
                    let message = [];
                    if (error.details && error.details.message) {
                        message = error.details.message.map(message => message);
                    } else {
                        message.push(error.debug)
                    }
                    setError(message.join(''));
                }
            })
        }
        setValidated(true);
    }

    return (
        <Form noValidate validated={validated} onSubmit={sendRequest} method={'post'}>
            {error ?
                <Alert key='errorMessage' variant={'danger'}>
                    {error}
                </Alert>
                : ''}
            <Form.Group controlId={`${formName}.name`}>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name={"name"} defaultValue={formState.name || ''} onChange={handleChange}/>
            </Form.Group>
            <Button type={'submit'}>Submit</Button>
        </Form>
    );
}
export default GroupForm;
