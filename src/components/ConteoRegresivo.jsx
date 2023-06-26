import React from 'react';
import './ConteoRegresivo.css';

export default class ConteoRegresivo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conteo: 10,
      ejecutandoTimer: false,
    };
    this.intervalId = null;
  }

  detenerConteo = () => {
    clearInterval(this.intervalId);
    this.setState({ ejecutandoTimer: false });
  };

  reiniciarConteo = () => {
    clearInterval(this.intervalId);
    this.setState({ conteo: 10, ejecutandoTimer: false });
  };

  iniciarConteo = () => {
    this.setState({ ejecutandoTimer: true });
    this.contador();
  };

  contador = () => {
    this.intervalId = setInterval(() => {
      if (this.state.ejecutandoTimer) {
        if (this.state.conteo === 0) {
          this.detenerConteo();
        } else {
          this.setState((prevState) => ({
            conteo: prevState.conteo - 1,
          }));
        }
      }
    }, 1000);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.conteo !== this.state.conteo) {
      const contadorElement = document.querySelector('.contador');
      contadorElement.classList.add('animado');
      setTimeout(() => {
        contadorElement.classList.remove('animado');
      }, 500);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { conteo, ejecutandoTimer } = this.state;
    const mostrarIniciar = conteo > 0 && !ejecutandoTimer;
    let iniciarTexto;

    if (conteo === 10) {
      iniciarTexto = "Iniciar";
    } else {
      iniciarTexto = "Continuar";
    }

    return (
      <div className="contenedor">
        <div className="contenido">
          <h1 className="contador">{conteo}</h1>
          <div className="botones">
            {!mostrarIniciar && (
              <button onClick={this.reiniciarConteo} className="btn reiniciar">Reiniciar</button>
            )}
            {ejecutandoTimer ? (
              <button onClick={this.detenerConteo} className="btn detener">Pausar</button>
            ) : (
              mostrarIniciar && (
                <button onClick={this.iniciarConteo} className="btn iniciar">{iniciarTexto}</button>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}
