var cron = require('cron');
var fetch = require("node-fetch");
var cronJob = cron.job('0 0 8 * * *', function(){
    // perform operation e.g. GET request http.get() etc.
    fetch('http://localhost:4000/api/reset/5b03817f58504167ccb0eead',
  {
     method: 'POST'
  })
  .catch((error) => {
    console.error(error);
  });
  console.info('cron job completed');
});

cronJob.start();
