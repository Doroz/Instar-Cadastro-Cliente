import React from 'react';

import PrivateHeader from './PrivateHeader';
import ClientList from './ClientList';
import Editor from './Editor';

export default () => {
  return (
    <div>
      <PrivateHeader title="Cadastro de clientes"/>
      <div className="page-content">
        <div className="page-content__sidebar">
          <ClientList/>
        </div>
        <div className="page-content__main">
          <Editor/>
        </div>
      </div>
    </div>
  );
};
