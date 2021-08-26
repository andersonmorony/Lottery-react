import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Lottery from './components/Lottery'
import Menu from './components/menu'


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      tempo: 1700,
      hora: ''
    };
  }
  
componentDidMount(){
  this.countdown();
}


countdown = () => {

    if ((this.state.tempo - 1) >= -1) {

        var min = parseInt(this.state.tempo  / 60);
        var seg = this.state.tempo  % 60;

        if (min < 10) {
            min = "0" + min;
            min = min.substr(0, 2);
        }
        if (seg <= 9) {
            seg = "0" + seg;
        }

        var horaImprimivel = '00:' + min + ':' + seg;
        this.setState({hora: horaImprimivel});

        setTimeout(() => this.countdown(), 1000);

        
        this.setState({hora: horaImprimivel});
        this.state.tempo--;

    } 
    else {
    }

}



 render() {

    return (
      <div className="app container">
        <div className="menu">
          <Menu/>
        </div>
        <section className="lottery">
          <Lottery hora={this.state.hora}/>
        </section>
      </div>
    );
  }
}

export default App;
