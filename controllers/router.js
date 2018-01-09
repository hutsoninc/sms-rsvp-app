var rsvp = require('./rsvp');

exports.webhookRoutes = function(router){
  router.post('/sms', rsvp.process);
};
