import React from 'react';
import web3 from '../../web3';
import lottery from '../../lottery';
import './styles.css';

class Lottery extends React.Component {

    constructor(props) {
        super(props);

        this.state = { manager: '' };
    }

    async componentDidMount() {
        const manager = await lottery.methods.manager().call();

        this.setState({manager});
    }

    render() {
        return(
            <div className="div-contract">
                <h2>Contract Lottery</h2>
                <p><strong>Manager of this contract:</strong> {this.state.manager}</p>
            </div>
        );
    }

}

export default Lottery;