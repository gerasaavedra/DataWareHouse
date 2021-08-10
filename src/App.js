import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import clienteAxios from './config/axios';

// componentes
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Contactos from './components/Contactos';
import Companies from './components/Companies';
import Usuarios from './components/Usuarios';
import RegionCiudad from './components/Region_ciudad'

import ContactState from './components/context/contacts/contactState';
import CompanyState from './components/context/companys/companyState';
import AlertaState from './components/context/alertas/alertaState';
import AuthState from './components/context/autenticacion/authState';
import tokenAuth from './config/tokenAuth';

// High Order Component - protege los componentes
import RutaPrivadad from './components/Rutas/RutaPrivada';

// Revisar si existe un token
const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
};

function App() {
  
  // State de la app
  const [contactos, nuevoContacto] = useState([]);
  const [consulta, guardarConsulta] = useState(true);


  useEffect( () => {
    
    if(consulta) {
      const consultarContactos = () => {
        clienteAxios.get('/contactos')
          .then(respuesta => {
            
            // colocar en el state el resultado
            nuevoContacto(respuesta.data);

            // deshabilitar la consulta
            guardarConsulta(false);

          })
          .catch(error => {
            console.log(error);
          });
      };
      consultarContactos();
    };

  }, [contactos] );

  
  // Lista de Regiones / Paises
  const [paises, guardarPaises] = useState([]);

    useEffect( () => {
        const consultarPaises = () => {
            clienteAxios.get('/region_ciudad')
                .then(respuesta => {
                  guardarPaises(respuesta.data);
                })
                .catch(error => {
                    console.log(error);
                });
        };
        consultarPaises();


    }, [] );


    return ( 
      
        <AuthState>
          <ContactState>
            <CompanyState>
                <AlertaState>
                  <Router>
                      <Switch>

                          <Route
                            exact path="/" component={Login}
                          />

                          <Route
                            exact path="/login" component={Login}
                          />

                          <Route
                            exact path="/nueva-cuenta" component={NuevaCuenta}
                          />

                          <RutaPrivadad
                            exact path="/contactos" component={() => <Contactos contactos={(contactos)} guardarConsulta={guardarConsulta} />}
                          />

                          <RutaPrivadad
                            exact path="/companies" component={Companies}
                          />

                          <RutaPrivadad
                            exact path="/usuarios" component={Usuarios}
                          />

                          <RutaPrivadad
                            exact path="/region_ciudad" component={() => <RegionCiudad paises={paises} />}
                          />
                
                      </Switch>
                  </Router>
                </AlertaState>
            </CompanyState>
          </ContactState>
        </AuthState>

    );
};

export default App;