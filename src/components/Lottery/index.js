import React from 'react';
import web3 from '../../web3';
import lottery from '../../lottery';
import './styles.css';

class Lottery extends React.Component {

    state = {
        manage: '',
        players: [],
        balance: ''
    };

    async componentDidMount() {
        const manager = await lottery.methods.manager().call();
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);

        this.setState({manager, players, balance});
    }

    render() {
        return(
            <div className="div-contract">
                <h2>Contract Lottery</h2>
                <p><strong>Manager of this contract:</strong> {this.state.manager}</p>
                <p>This contract there are {this.state.players.length} actually and had the balance in {web3.utils.fromWei(this.state.balance, 'ether')}</p>
            </div>
        );
    }

}

export default Lottery;