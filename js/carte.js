function Allumeylefuego(data){
  console.log(data)
    for (let i =0; i <data.length; i++){
      var influence = L.circle([data[i].lat, data[i].lon], 210, {
          'color': '#FF7F00',
          'fill': true,
          'fillColor': '#FFFF00',
          'fillOpacity': 0.2,
      }).addTo(carte);
      influence.bindPopup('');
      var Elinfodelfuego = influence.getPopup();
      
      Elinfodelfuego.setContent('Type of fire : ' + data[i].type + " Intensity of the fire : " + data[i].intensity + "\r \n Range of the fire : " + data[i].range);
      influence.openPopup();
    } 
}


function FIRESTORM(){
    fetch("http://localhost:8081/fire")
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
      
            // Examine the text in the response
              response.json()
          .then(data => Allumeylefuego(data));
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
        
}

