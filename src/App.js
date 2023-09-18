import React, {Component} from "react";
import Buscador from "./Component/Buscador";
import Resultado from "./Component/Resultado";

class App extends Component {
  state = { termino : '',
            imagenes:[],
}
  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth','end');
  }

  paginaAnterior=()=>{
    let pagina = this.state.pagina;
    if(pagina===1) return null;
    pagina -=1;
    this.setState({pagina},()=>{this.consultarAPI();this.scroll();});
  }
  paginaSiguiente=()=>{
    let pagina = this.state.pagina;
    pagina +=1;

    this.setState({pagina},()=>{this.consultarAPI();this.scroll();});
  }

  consultarAPI = () => {
    const pagina=this.state.pagina;
    const url = `https://pixabay.com/api/?key=39523116-c563c19d7bfdc02d737f727f0&q=${this.state.termino}&page=${pagina}`;
    
    //console.log(url);

    fetch(url)
      .then(respuesta =>respuesta.json())
      .then(resultado => this.setState({imagenes:resultado.hits}))
      
  }

  datosBusqueda = (termino) => {this.setState({
    termino:termino,
    pagina:1
  
  },()=>{this.consultarAPI();})}

  render() {
  return (
    <div className="App container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagen</p>
        <Buscador
          datosBusqueda={this.datosBusqueda}
        />
      </div>
      <div className="row justify-content-center">
         <Resultado
            imagenes= {this.state.imagenes}
            paginaSiguiente={this.paginaSiguiente}
            paginaAnterior={this.paginaAnterior}
         />
      </div>
    </div>
  );
}
}

export default App;
