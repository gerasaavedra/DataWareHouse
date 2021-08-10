import React, { Component } from 'react';
import { CSVLink } from "react-csv";
import clienteAxios from '../../config/axios';

const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Last Name', key: 'lastname' },
    { label: 'Address', key: 'address' },
    { label: 'Company', key: 'company' },
    { label: 'Charge', key: 'charge' },
    { label: 'Email', key: 'mail' },
    { label: 'Country', key: 'country' },
    { label: 'Region', key: 'region' },
    { label: 'Interes', key: 'interes' },
    { label: 'Contact', key: 'contact_channel' },
    { label: 'User Account', key: 'user_account' }
];

class ExportAll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.csvLinkEl = React.createRef();
    };

    exportAllContacts = async() => {

        try {
            return await clienteAxios.get('/contactos')
                .then(res => res.data);
        } catch (error) {
            console.log(error);
        };
    };

    downloadReport = async () => {

        const data = await this.exportAllContacts();
        this.setState({ data: data }, () => {
            setTimeout(() => {
            this.csvLinkEl.current.link.click();
            });
        });
    };

    render() {

        const { data } = this.state;
    
        return (
            <div>
            <input type="button" className="border-0 bg-transparent" value="Todos los filtros" onClick={this.downloadReport} />
            <CSVLink
                headers={headers}
                filename="Report.csv"
                data={data}
                ref={this.csvLinkEl}
            />
            </div>
        );
    };

};

export default ExportAll;