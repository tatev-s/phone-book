import React from 'react';
import Loadable from 'react-loadable';
import {endpoint} from "./costants";
const Loading = () => <div>Loading...</div>;


const PhoneBookList = Loadable({
  loader: () => import('./List'),
  loading: Loading
});
const EditPhoneBook = Loadable({
  loader: () => import('./Edit'),
  loading: Loading
});

const CreatePhoneBook = Loadable({
  loader: () => import('./Create'),
  loading: Loading
});

const routes = [
  {
    path: `/${endpoint}`, exact: true, name: 'PhoneBook', component: PhoneBookList
  },
  {
    path: `/${endpoint}/edit/:id`, exact: true, name: 'Edit PhoneBook', component: EditPhoneBook
  },
  {
    path: `/${endpoint}/create`, exact: true, name: 'Create PhoneBook', component: CreatePhoneBook
  }
];

export default routes;
