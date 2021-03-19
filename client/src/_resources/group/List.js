import * as React from 'react';
import {columns, endpoint} from "./costants";
import List from "../common/list";

const GroupList = () => (<List columns={columns} endpoint={endpoint}/>);

export default GroupList;
