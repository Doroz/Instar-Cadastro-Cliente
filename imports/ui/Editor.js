import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import InputMask from 'react-input-mask';
import moment from 'moment';

import { Clients } from '../api/clients';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      number: '',
      city: '',
      state: '',
      cep: '',
      telphone: '',
      celphone: '',
      birthdate: new Date()
    };
  }
  handleNameChange(e) {
    const name = e.target.value;
    this.setState({ name });
  }
  handleAddressChange(e) {
    const address = e.target.value;
    this.setState({ address });
  }
  handleNumberChange(e) {
    const number = e.target.value;
    this.setState({ number });
  }
  handleCityChange(e) {
    const city = e.target.value;
    this.setState({ city });
  }
  handleStateChange(e) {
    const state = e.target.value;
    this.setState({ state });
  }
  handleCepChange(e) {
    const cep = e.target.value;
    this.setState({ cep });
  }
  handleTelphoneChange(e) {
    const telphone = e.target.value;
    this.setState({ telphone });
  }
  handleCelphoneChange(e) {
    const celphone = e.target.value;
    this.setState({ celphone });
  }
  handleBirthdateChange(e) {
    const birthdate = e.target.value;
    this.setState({ birthdate });
  }
  handleUpdateAllFields() {
    // if (this.state.birthdate) {
    //   var date = new Date(this.state.birthdate);
    //   this.setState({ birthdate: date });
    //   console.log(this.state.birthdate);
    // }  
    this.props.call('clients.update', this.props.client._id, this.state );
    this.setState({ birthdate: this.state.birthdate });
  }
  // handleInterestAreaChange(e) {
  //   const interestArea = e.target.value;
  //   this.setState({ interestArea });
  //   this.props.call('clients.update', this.props.client._id, { interestArea });
  // }
  handleRemoval(){
    this.props.call('clients.remove', this.props.client._id);
    this.props.browserHistory.push('/dashboard');
  }
  componentDidUpdate(prevProps, prevState) {
    const currentClientId = this.props.client ? this.props.client._id : undefined;
    const prevClientId = prevProps.client ? prevProps.client._id : undefined;

    if (currentClientId && currentClientId !== prevClientId) {
      this.setState({
        name: this.props.client.name,
        address: this.props.client.address,
        number: this.props.client.number,
        city: this.props.client.city,
        state: this.props.client.state,
        cep: this.props.client.cep,
        telphone: this.props.client.telphone,
        celphone: this.props.client.celphone,
        birthdate: this.props.client.birthdate
        /* interestArea: this.props.client.interestArea */
      });
    }
  }
  render() {
    if (this.props.client) {
      return (
        <div className="editor">
          <input className="editor__title" value={this.state.name} placeholder="Nome" onChange={this.handleNameChange.bind(this)}/>
          <input className="editor__title" value={this.state.address} placeholder="Endereço" onChange={this.handleAddressChange.bind(this)}/>
          <input className="editor__title" value={this.state.number} placeholder="Número" onChange={this.handleNumberChange.bind(this)}/>
          <input className="editor__title" value={this.state.city} placeholder="Cidade" onChange={this.handleCityChange.bind(this)}/>
          <input className="editor__title" value={this.state.state} placeholder="Estado" onChange={this.handleStateChange.bind(this)}/>
          {/* <input className="editor__title" value={this.state.cep} placeholder="CEP" onChange={this.handleCepChange.bind(this)}/> */}
          <InputMask className="editor__title" mask="99999-999" maskChar={null} value={this.state.cep} placeholder="CEP" onChange={this.handleCepChange.bind(this)}/>;
          <InputMask className="editor__title" mask="99-9999-9999" maskChar={null} value={this.state.telphone} placeholder="Telefone" onChange={this.handleTelphoneChange.bind(this)}/>;
          <InputMask className="editor__title" mask="99-99999-9999" maskChar={null} value={this.state.celphone} placeholder="Celular" onChange={this.handleCelphoneChange.bind(this)}/>;
          {/* <input className="editor__title" value={this.state.telphone} placeholder="Telefone" onChange={this.handleTelphoneChange.bind(this)}/>
          <input className="editor__title" value={this.state.celphone} placeholder="Celular" onChange={this.handleCelphoneChange.bind(this)}/> */}
         {/*  <DatePicker onChange={this.handleBirthdateChange.bind(this)} value={this.state.birthdate}/> */}
          
          <input className="editor__title" type="date" value={this.state.birthdate} placeholder="Data de Nascimento" onChange={this.handleBirthdateChange.bind(this)}/>
          {/* <label className="editor__title">
            Escolha as áreas de interesse:
            <select multiple={true} value={this.state.interestArea} onChange={this.handleInterestAreaChange.bind(this)}>
              <option value="Informática">Informática</option>
              <option value="Educação">Educação</option>
              <option value="Saúde">Saúde</option>
              <option value="Lazer">Lazer</option>
            </select>
          </label> */}
          {/* <textarea className="editor__body" value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea> */}
          <div>
            <button className="button button--secondary" onClick={this.handleUpdateAllFields.bind(this)}>Atualizar Cliente</button>
            <button className="button button--secondary" onClick={this.handleRemoval.bind(this)}>Deletar Cliente</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="editor">
          <p className="editor__message">
            { this.props.selectedClientId ? 'Cliente não encontrado.' : 'Escolha ou cadastre um cliente para começar.'}
          </p>
        </div>
      );
    }
  }
};

Editor.propTypes = {
  client: React.PropTypes.object,
  selectedClientId: React.PropTypes.string,
  call: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  const selectedClientId = Session.get('selectedClientId');

  return {
    selectedClientId,
    client: Clients.findOne(selectedClientId),
    call: Meteor.call,
    browserHistory
  };
}, Editor);
