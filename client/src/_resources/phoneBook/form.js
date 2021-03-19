import * as React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import {getRequest, patchRequest, postRequest} from "../../_services";
import { endpoint, formName} from "./costants";
import { endpoint as groupEndpoint} from "../group/costants";
import { useParams } from "react-router-dom";

const PhoneBookForm = ({history, record = null}) => {
    const {id} = useParams();
    const [formState, setFormState] = React.useState( record ||{});
    const [validated, setValidated] = React.useState(false);
    const [groups, setGroups] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState('');
    const handleChange = ({target: {name, value, selectedOptions}}) => {
        if (name === 'groups') {
            if (!formState[name]) formState[name] = [];
            formState[name] = Array.from(selectedOptions, option => option.value);
        } else {
            formState[name] = value;
        }
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
    React.useEffect(()=>{
        if(!loaded){
            getRequest({endpoint: groupEndpoint, queryParams:{limit:10000}})
                .then(({data: {rows}}) => {
                    setGroups(rows);
                    setLoaded(true)
                })
        }
    },[loaded]);

    return (
        <Form noValidate validated={validated} onSubmit={sendRequest} method={'post'}>
            {error ?
                <Alert key='errorMessage' variant={'danger'}>
                    {error}
                </Alert>
                : ''}
            <Form.Group controlId={`${formName}.firstName`}>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name={"firstName"} onChange={handleChange} defaultValue={formState ? formState.firstName: ''} required/>
            </Form.Group>
            <Form.Group controlId={`${formName}.lastName`}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name={"lastName"} onChange={handleChange} defaultValue={formState ?formState.lastName: ''} required/>
            </Form.Group>
            <Form.Group controlId={`${formName}.phoneNumber`}>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" name={"phoneNumber"} onChange={handleChange} defaultValue={formState ? formState.phoneNumber: ''} required/>
            </Form.Group>
            <Form.Group controlId={`${formName}.groups`}>
                <Form.Label>Select Groups</Form.Label>
                <Form.Control as="select" multiple name={"groups"} onChange={handleChange} required>
                    {
                        groups.map(group => <option key={group.id} value={group.id} selected={formState && formState.groups && formState.groups.includes(group.id)}>{group.name}</option>)
                    }
                </Form.Control>
            </Form.Group>
            <Button type={'submit'}>Submit</Button>
        </Form>
    );
}
export default PhoneBookForm;
