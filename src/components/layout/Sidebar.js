import React, { useContext, useEffect } from 'react';
import NewCompany from './NewCompany';
import companyContext from '../context/companys/companyContext';

const Sidebar = () => {

    const companysContext = useContext(companyContext);
    const { companies, obtenerCompanies } = companysContext;

    useEffect(() => {
        obtenerCompanies();
    }, [companies]);

    if(companies.length === 0) return null;

    return (  
        <aside className="p-5 bg-light vh-100">
            <h1>NUEVA<span className="fw-normal">Compañía</span></h1>

            <NewCompany />

            <div className="new-company text-center">
                <h2>Tus Compañías</h2>
                <ul className="listado-companias my-5">
                    {companies.map(company => (
                        <li key={company._id} className="mb-2">{company.nombre}</li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
 
export default Sidebar;