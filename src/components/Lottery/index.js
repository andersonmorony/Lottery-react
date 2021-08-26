import React from "react";
import web3 from "../../web3";
import lottery from "../../lottery";
import "./styles.css";

class Lottery extends React.Component {
  state = {
    manage: "",
    players: [],
    balance: "",
    value: "",
    message: "",
    showMessage: false,
    classMessage: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();


    this.setState({ message: "Wait wile ours send your transition....", classMessage: 'alert alert-warning', showMessage: true });

    try{

        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.value, "ether"),
        });

        this.setState({ message: "Transition sended with success", classMessage: 'alert alert-success', showMessage: true  });

    } catch(err){
        this.setState({ message: err.message, classMessage: 'alert alert-danger', showMessage: true });

    }

  };

  pickWinner = async () => {
    this.setState({ message: "Wait wile one winner is choose...", classMessage: 'alert alert-warning', showMessage: true });

    const accounts = await web3.eth.getAccounts();

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    this.setState({ message: "Had a new Winner!", classMessage: 'alert alert-success', showMessage: true });
  };

  render() {
    return (
      <div className="row">
        <div className="block enter col-6">
          <div>Enter now and you could be the next winner</div>
          <h1>Next winner in {this.props.hora}</h1>
          <h2><strong>{web3.utils.fromWei(this.state.balance, 'ether')} Amount of Ether</strong></h2>
          <img src="https://img.icons8.com/nolan/212/ethereum.png" />
          <div className="enter">
            {this.state.showMessage ?
                <div className={this.state.classMessage}  role="alert">
                    {this.state.message}
                </div>
            : ''}
            <form className="form" onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="number" required
                  className="form-control"
                  placeholder="0.00"
                  value={this.state.value}
                  onChange={event => this.setState({value: event.target.value})}
                />
              </div>
              <div class="d-grid gap-2">
                <button class="btn btn-info" type="submit">
                  Enter now
                  <img src="https://img.icons8.com/emoji/28/000000/fire.png" />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="block players col-5">
          <h5>
            <img src="https://img.icons8.com/nolan/64/crowd.png" /> {this.state.players.length} players
            in the game
          </h5>
          {/* <h5>15</h5> */}
          <div className="list-players">
            <ul class="list-group list-group-flush">
              {this.state.players.map((player, index) => (
                <li class="list-group-item">
                  <span class="badge bg-info rounded-pill">{index + 1}</span>
                  <span> </span>
                   {player}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Lottery;
