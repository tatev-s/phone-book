import * as React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    PaginationTotalStandalone
} from 'react-bootstrap-table2-paginator';
import {Alert, Button, Form} from "react-bootstrap";
import {deleteRequest, getRequest} from "../../_services";
import {Link} from "react-router-dom";
import UploadCsv from "./uploadCsv";
const List = ({columns, endpoint}) => {
    const [items, setItems] = React.useState([]);
    const [totalSize, setTotalSize] = React.useState(0);
    const [selected, setSelected] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState('');
    const [queryParams, setQueryParams] = React.useState({limit:10, offset:1});
    const idField = columns.findIndex(column=>column.dataField === 'id');

    const getId = (cell, row) => {
        const link = `/${endpoint}/edit/${row.id}`;
        return <Link to={link}>{row.id}</Link>;
    };
    if(idField !== -1){
        columns[idField].formatter = getId;
    }

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelectAll: (isSelect, rows) => {
            setSelected(
                isSelect ? rows.map(item=>item.id) : []
            )
        },
        onSelect: (row, isSelect) => {
            if(isSelect){
                setSelected([...selected, row.id]);
            }else{
                setSelected(selected.filter(item=>item !== row.id))
            }
        }
    };
    React.useEffect(()=>{
        console.log({loaded})
        if(loaded) return;
        loadData();
    },[queryParams, loaded]);
    const loadData = ()=>{
        getRequest({endpoint, queryParams})
            .then(({data, error})=>{
                if (!error) {
                    console.log(data.count)
                    setTotalSize(data.count)
                    setItems(data.rows);
                } else {
                    let message = [];
                    if (error.details && error.details.message) {
                        message = error.details.message.map(message => message);
                    } else {
                        message.push(error.debug)
                    }
                    setError(message.join(''));
                }
                setLoaded(true);
            })
    }
    const searchItems = ({target: {value}}) =>{
        queryParams.search = value;
        setQueryParams(queryParams)
        setLoaded(false)
    }

    const deleteSelected = ()=>{
        deleteRequest({endpoint,data:selected})
            .then(()=>{
                setLoaded(false)
            })
    }

    const options = {
        custom: true,
        totalSize,
        sizePerPage:10,
        onSizePerPageChange: (sizePerPage, page) => {
            queryParams.offset = page;
            queryParams.limit = sizePerPage;
            setQueryParams(queryParams);
            setLoaded(false)
        },
        onPageChange: (page, sizePerPage) => {
            queryParams.offset = page;
            queryParams.limit = sizePerPage;
            setQueryParams(queryParams);
            setLoaded(false)
        }
    };
    console.log({options})
    return (<>
            <Button variant="primary" href={`/${endpoint}/create`}>Create Group</Button>
                <Form.Group controlId="search" >
                    <Form.Control type="text" placeholder="search" onChange={searchItems}/>
                </Form.Group>
                <UploadCsv />
            {selected.length?
                <Button variant="secondary" onClick={deleteSelected}>Delete</Button>
                :
                null
            }
            {error ?
                <Alert key='errorMessage' variant={'danger'}>
                    {error}
                </Alert>
                : ''}
            <PaginationProvider
                pagination={ paginationFactory(options) }
            >
                {
                    ({
                         paginationProps,
                         paginationTableProps
                     }) => (
                        <div>
                            <BootstrapTable
                                keyField='id'
                                data={items}
                                columns={columns}
                                remote={ { pagination: true} }
                                noDataIndication="Table is Empty"
                                pagination={paginationFactory(options)}
                                onTableChange={console.log}
                                selectRow={selectRow}
                                { ...paginationTableProps }/>
                            <PaginationTotalStandalone
                                { ...paginationProps }
                            />
                            <PaginationListStandalone
                                { ...paginationProps }
                            />
                        </div>
                    )
                }
            </PaginationProvider>

            </>
    );
}
export default List;
