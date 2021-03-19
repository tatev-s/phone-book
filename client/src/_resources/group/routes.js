import React from 'react';
import Loadable from 'react-loadable';
import {endpoint} from "./costants";

const Loading = () => <div>Loading...</div>;


const GroupsList = Loadable({
  loader: () => import('./List'),
  loading: Loading
});
const EditGroup = Loadable({
  loader: () => import('./Edit'),
  loading: Loading
});

const CreateGroup = Loadable({
  loader: () => import('./Create'),
  loading: Loading
});

const routes = [
  {
    path: `/${endpoint}`, exact: true, name: 'Groups', component: GroupsList
  },
  {
    path: `/${endpoint}/edit/:id`, exact: true, name: 'Edit Group', component: EditGroup
  },
  {
    path: `/${endpoint}/create`, exact: true, name: 'Create Group', component: CreateGroup
  }
];

export default routes;
