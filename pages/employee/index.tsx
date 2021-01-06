import React, { forwardRef, useEffect, useState } from 'react';
import router from 'next/router';

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';
const tableIcons = {
    Add: forwardRef((props, ref: any) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref: any) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref: any) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref: any) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref: any) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref: any) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref: any) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref: any) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref: any) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref: any) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref: any) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref: any) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref: any) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref: any) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref: any) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref: any) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref: any) => <ViewColumn {...props} ref={ref} />)
};
export default function blog() {
    const [data, setData] = useState([] as any);
    const fetchEmployees = async () => {
        await fetch('http://localhost:5000/employees')
            .then(res => res.json())
            .then(res => setData(res))
    }
    useEffect(() => {
        fetchEmployees()
    }, [])

    const handleRowUpdate = (newData: any, oldData: any) => {
        axios.put("http://localhost:5000/employees/" + oldData.id, newData)
            .then(res => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
            })
    }

    const handleRowAdd = (newData: any) => {
        axios.post("http://localhost:5000/employees/", newData)
            .then(res => setData(res))
    }
    const handleRowDelete = (oldData: any) => {
        axios.delete("http://localhost:5000/employees/" + oldData)
            .then(res => setData(res))
    }
    return (
        <MaterialTable
            data={data}
            options={{
                search: true
              }}
            columns={[
                { field: 'id', title: 'ID' },
                { field: 'first_name', title: 'First name' },
                { field: 'last_name', title: 'Last name' },
                { field: 'email', title: 'Email' },
                { field: 'password', title: 'Password' }
            ]}
            icons={tableIcons}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        console.log(newData);
                        console.log(oldData);
                        console.log(resolve);
                        handleRowUpdate(newData, oldData);
                    }),
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        console.log(newData);
                        console.log(resolve);
                        handleRowAdd(newData)
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        console.log(oldData);
                        console.log(resolve);
                        handleRowDelete(oldData.id)
                    }),
            }} />
    )
}

// export async function getStaticProps() {
//     const res = await fetch('http://localhost:5000/employee/');
//     const data = await res.json();
//     return {
//         props: {
//             data,
//         }
//     }
// }