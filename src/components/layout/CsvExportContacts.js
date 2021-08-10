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
 
class ExportCSV extends Component {

    constructor(props) {
      super(props);
      this.state = {
        data: []
      }
      this.csvLinkEl = React.createRef();
    };

    // Exportar contacto/s por su _id 
    exportarContactos = async () => {

      const arrayOfInputs = [];

      const checkboxes = document.querySelectorAll('input:checked');
      arrayOfInputs.push(checkboxes);

      const arrayOfInputsIds = [];
      checkboxes.forEach(checkbox => {
          arrayOfInputsIds.push(checkbox.id);
      });


      let params = new URLSearchParams();
      let i;
      for(i = 0; i < arrayOfInputsIds.length; i++) {
          params.append("_id", arrayOfInputsIds[i]);
      };

      let request = {
          params: params
      };

      // Enviar el request a la DB
      try {
          return await clienteAxios.get('/exportar_contactos/', request)
          .then(res => res.data);
      } catch (error) {  
          console.log(error);
      };
      
    };
 
    downloadReport = async () => {
      const data = await this.exportarContactos();
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
          <input type="button" className="border-0 bg-transparent" value="Exportar seleccionados" onClick={this.downloadReport} />
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
 
export default ExportCSV;