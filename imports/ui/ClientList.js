import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Clients } from '../api/clients';
import ClientListHeader from './ClientListHeader';
import ClientListItem from './ClientListItem';
import ClientListEmptyItem from './ClientListEmptyItem';

export const ClientList = (props) => {
  return (
    <div className="item-list">
      <ClientListHeader/>
      { props.notes.length === 0 ? <ClientListEmptyItem/> : undefined }
      {props.notes.map((client) => {
        return <ClientListItem key={client._id} client={client}/>;
      })}
    </div>
  );
};

ClientList.propTypes = {
  clients: React.PropTypes.array
};

export default createContainer(() => {
  const selectedClientId = Session.get('selectedClientId');

  Meteor.subscribe('clients');

  return {
    notes: Clients.find({}, {
      sort: {
        updatedAt: -1
      }
    }).fetch().map((client) => {
      return {
        ...client,
        selected: client._id === selectedClientId
      };
    })
  };
}, ClientList);
