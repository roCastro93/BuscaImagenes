import React, { useState, useEffect } from 'react';
import Buscador from './components/Buscador';
import Listadoimagenes from './components/Listadoimagenes';

function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPagina, setTotalPagina] = useState(1);

  useEffect(() => {

    const consultarAPI = async () => {

      if (busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '15307939-bc8d89e38e7527c21fef7f162';

      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits);
      //console.log(resultado);

      //Calcular el total de paginas
      const calcularTotalPaginas = resultado.totalHits / imagenesPorPagina;
      setTotalPagina(Math.ceil(calcularTotalPaginas));

      //Mover al usuario a la parte superior
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth', block:'start'});
    }
    consultarAPI();

  }, [busqueda,paginaActual]);

  const paginaAnterior = () => {
    let nuevaPaginaActual = paginaActual - 1;

    //Colocarlo en el state
    setPaginaActual(nuevaPaginaActual);
  }
  const paginaSiguiente = () => {
    let nuevaPaginaActual = paginaActual + 1;

    //Colocar en el state
    setPaginaActual(nuevaPaginaActual);
  }
  return (
    <div className="App container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Buscador
          setBusqueda={setBusqueda}
        />

      </div>
      <div className="row justify-content-center">
        <Listadoimagenes
          imagenes={imagenes}
        />
        {(paginaActual === 1) ? null: (<button onClick={paginaAnterior} className="btn btn-info mr-3 mb-5">&laquo; Anterior </button>)}
       
        {(paginaActual === totalPagina) ? null :(<button onClick={paginaSiguiente} className="btn btn-info mb-5">Siguiente  &raquo;</button>)}
        
      </div>
    </div>
  );
}

export default App;
