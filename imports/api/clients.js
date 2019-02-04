import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Clients = new Mongo.Collection('clients');

if (Meteor.isServer) {
  Meteor.publish('clients', function () {
    return Clients.find({ userId: this.userId });
  });
}

Meteor.methods({
  'clients.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Clients.insert({
      name: '',
      address: '',
      number: '',
      city: '',
      state: '',
      cep: '',
      telphone: '',
      celphone: '',
      birthdate: new Date(),
      // interestArea: [],
      userId: this.userId,
      updatedAt: moment().valueOf()
    });
  },
  'clients.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Clients.remove({ _id, userId: this.userId });
  },
  'clients.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      name: {
        type: String
      },
      address: {
        type: String,
        optional: true
      },
      number: {
        type: String,
        optional: true
      },
      city: {
        type: String,
        optional: true
      },
      state: {
        type: String,
        optional: true
      },
      cep: {
        type: String,
        optional: true
      },
      telphone: {
        type: String,
        max: 12,
        optional: true
      },
      celphone: {
        type: String,
        max: 13,
        optional: true
      },
      birthdate: {
        type: String,
        optional: true
      },
      // interestArea: {
      //   type: Array
      // }
    }).validate({
      _id,
      ...updates
    });

    Clients.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  }
});
