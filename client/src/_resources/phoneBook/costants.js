export const endpoint ='phoneBooks';

export const formName ='phoneBookForm';
const getGroups = (cell)=>{
  const names = cell.map(group=>group.name);
  return names.join(' | ')
}
export const columns = [{
  dataField: 'id',
  text: 'ID'
}, {
  dataField: 'firstName',
  text: 'First Name'
}, {
  dataField: 'lastName',
  text: 'Last Name'
}, {
  dataField: 'phoneNumber',
  text: 'Phone Number'
}, {
    dataField: 'groups',
    text: 'Groups',
    formatter: getGroups
}];

