//
const admin = require('firebase-admin');

const serviceAccount = require('../../../ecotfx-firebase-adminsdk-pdy2n-fb6e157222.json');

//console.log(serviceAccount);

function init() {
  //
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //
  });
}

init();

const PUSH = (token, service, status, id, custom = null) => {
  //
  const body = () => {
    if (service === 'gift card') {
      //
      if (status === 'reject') {
        return `Your Gift Card Sale trade #${id} has been REJECTED!`;
      }
      return `Your Gift Card Sale trade #${id} has been ACCEPTED!`;
    }
    if (service === 'withdraw') {
      //
      const sta = status.toUpperCase();
      return `The status of your withdrawal request #${id} has changed. New Status -> ${sta}`;
    }
    if (service === 'bill') {
      if (status === 'reject') {
        return `Your Bill Purchase #${id} has been REJECTED!`;
      }
      return `Your Bill Purchase #${id} has been ACCEPTED!`;
    }
    if (service === 'crypto') {
      //
      if (status === 'reject') {
        return `Your Crypto trade #${id} has been REJECTED!`;
      }
      return `Your Crypto trade #${id} has been ACCEPTED!`;
    }
    return `${custom}`;
  };
  const text = body();
  console.log(text);

  //
  const payload = {
    //
    notification: {
      title: 'notification',
      body: text,

      //

      android: {
        ttl: 86400,
        notification: {
          click_action: 'OPEN_ACTIVITY_1',
        },
      },
      //
      apns: {
        headers: {
          apns_priority: 5,
        },
        payload: {
          aps: {
            category: 'NEW_MESSAGE_CATEGORY',
          },
        },
      },

      //
      webpush: {
        headers: {
          TTL: 86400,
        },
      },
    },
  };

  // Get the Messaging service for the default app

  return admin.messaging().sendToDevice(token, payload);
  //send(message);
};
// PUSH('rttytht', 'bill', 'reject', 1234)
//   .then((err, result) => {
//     if (!err) console.log('success');
//   })
//   .catch((err) => console.log('err'));
module.exports = PUSH;
