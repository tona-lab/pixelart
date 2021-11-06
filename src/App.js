import React, {Component} from 'react';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';

class App extends Component{

          state ={
            termino:'',
            imagenes : [],
            pagina:[]
          }

          scroll = () => {
            const elemento = document.querySelector('.jumbotron');
            elemento.scrollIntoView('smooth','start');
          }

          paginaAnterior = () =>{
            //leer el state de la pogina actual
            let pagina = this.state.pagina;
            //validar si la pagina es 1, ya no ir hacia atras
            if(pagina===1) return null;
            //restar uno a la pagina actual
            pagina -=1;
            //agregar el cambio al state
            this.setState({
              pagina
            }, () =>{
              this.consultarApi();
              this.scroll();
            });
          }

          paginaSiguiente = () =>{
            //leer el state de la pogina actual
            let pagina = this.state.pagina;
            //sumar uno a la pagina actual
            pagina +=1;
            //agregar el cambio al state
            this.setState({
              pagina
            },() =>{
              this.consultarApi();
              this.scroll();
            });
          }


    consultarApi = () =>{
      const termino = this.state.termino;
      const pagina = this.state.pagina;
      const url= `https://pixabay.com/api/?key=23769356-8d1b0b12a808218b06d74b7ef&q={ KEY }&q=${termino}&per_page=30&page=${pagina}`;

      fetch (url)
      .then(respuesta=>respuesta.json())
      .then(resultado=>this.setState({imagenes:resultado.hits}))
    }

  datosBusqueda = (termino) => {
    this.setState({
      termino:termino,
      pagina : 1
    },() =>{this.consultarApi();
    })
  }

  render(){
    return(
    <div className="container">
        <div className="jumbotron">
          <p className="lead text-center"> Buscador de Imagenes</p>
           <Buscador
           datosBusqueda={this.datosBusqueda}
           />
        </div>
          <div className="row justify-content-center">
          <Resultado 
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
          </div>
    </div>
 );
        }
 
      }

export default App;
