import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const ClientListItem = (props) => {
  const className = props.client.selected ? 'item item--selected' : 'item';

  return (
    <div className={className} onClick={() => {
      props.Session.set('selectedClientId', props.client._id);
    }}>
      <h5 className="item__title">{ props.client.name || 'Sem nome' }</h5>
      <p className="item__subtitle">{ moment(props.client.updatedAt).format('M/DD/YY') }</p>
    </div>
  );
};

ClientListItem.propTypes = {
  client: React.PropTypes.object.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return { Session };
}, ClientListItem);
