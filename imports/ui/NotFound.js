import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>404 - Página não encontrada.</h1>
        <p>Não foi possivel achar a pagina.</p>
        <Link to="/" className="button button--link">Home</Link>
      </div>
    </div>
  );
};
