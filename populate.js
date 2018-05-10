fetch('http://localhost:4000/api/get/5af0fba75c5ba22ba456a9ad')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
