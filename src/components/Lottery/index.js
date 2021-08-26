import React from 'react';
import web3 from '../../web3';
import lottery from '../../lottery';
import './styles.css';

class Lottery extends React.Component {

    state = {
        manage: '',
        players: [],
        balance: '',
        value: '',
        message: ''
    };

    async componentDidMount() {
        const manager = await lottery.methods.manager().call();
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);
        
        this.setState({manager, players, balance});
    };
    
    onSubmit = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        this.setState({message: 'Wait wile ours send your transition....'});

        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.value, 'ether')
        });

        this.setState({message: 'Transition sended with success'})

    };

    render() {
        return(
            <div className="div-contract">
                <h2>Contract Lottery</h2>
                <p><strong>Manager of this contract:</strong> {this.state.manager}</p>
                <p>This contract there are {this.state.players.length} actually and had the balance in {web3.utils.fromWei(this.state.balance, 'ether')}</p>
                
                <hr/>

                <form onSubmit={this.onSubmit}>
                    <label for="">Amount of ether</label>
                    <span>Value: {this.state.value}</span>
                    <input type="text" value={this.state.value} onChange={event => this.setState({value: event.target.value})} />
                    <button>
                        Entrar
                    </button>
                </form>

                <hr />

                <h3>{this.state.message}</h3>

            </div>

            
        );
    }

}

export default Lottery;