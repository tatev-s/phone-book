import * as React from 'react';
import {columns, endpoint} from "./costants";
import List from "../common/list";
const PhoneBookList = () => (<List columns={columns} endpoint={endpoint}/>);

export default PhoneBookList;
