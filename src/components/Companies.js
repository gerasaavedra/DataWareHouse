import React, { Fragment, useContext, useEffect } from 'react';
import Navbar from './layout/Navbar';
import Sidebar from './layout/Sidebar';
import companyContext from './context/companys/companyContext';
import AuthContext from '../components/context/autenticacion/authContext';

const Companies = () => {

    // Extrae la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);


    const companysContext = useContext(companyContext);
    const {companies, eliminarCompany, saveCompanySelected} = companysContext; 


    const companySelected = company => {
        saveCompanySelected(company);
    };
    
    return (

        <Fragment>

            <Navbar />

            <div className="d-flex vh-100">
                
                <Sidebar />
                
                <main>
                    <div className="container row ms-1">
                        {companies.map(company => (
                            <ul key={company._id} className="mt-5 col-4 company-card-33 grow">
                                <li className="company-card company-card-li sombra">
                                    <p>Nombre: <span>{company.nombre}</span></p>
                                    <p>Dirección: <span>{company.direccion}</span></p>
                                    <p>Email: <span>{company.email}</span></p>
                                    <p>Teléfono: <span>{company.tel}</span></p>
                                    <p>Ciudad: <span>{company.ciudad}</span></p>
                                    <p>País: <span>{company.pais}</span></p>

                                    <div className="d-flex">
                                        <button
                                            className="btn btn-eliminar p-2 me-2"
                                            onClick={ () => eliminarCompany(company._id) }
                                        >Eliminar</button>
                                        <button
                                            className="btn btn-editar p-2"
                                            onClick={() => companySelected(company)}
                                            data-bs-toggle="modal" 
                                            data-bs-target="#exampleModal" 
                                            data-bs-whatever="@mdo"
                                        >Edit</button>
                                    </div>
                                </li>
                            </ul>
                        ))}    
                    </div>
                </main>

            </div>

        </Fragment>
        
    );
};

export default Companies;