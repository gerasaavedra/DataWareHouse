import React from 'react';
import { withRouter } from 'react-router-dom';

const SearchResults = () => {
    return (  

        <div className="modal fade" id="exampleModalResults" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="col-12 bg-white mb-5 fs-6">
                            <table className="table table-sm table-hover border border-1 mt-2 shadow-lg table-striped fs-6" cellSpacing="0">
                                <thead className="th-padding">
                                    <tr>
                                        <th className="text-center" scope="col">#</th>
                                        <th scope="col">Contacto</th>
                                        <th scope="col">País/Región</th>
                                        <th scope="col">Compañía</th>
                                        <th scope="col">Cargo</th>
                                        <th scope="col">Canal Preferido</th>
                                        <th scope="col">Interés</th>
                                    </tr>
                                </thead>
                                <tbody id="results-table" className="align-middle"></tbody>
                            </table>    
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

    );
}
 
export default withRouter(SearchResults);