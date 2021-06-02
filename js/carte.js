function Allumeylefuego(data){
  console.log(data)
  coordonnayLati=[];
  coordonnayLong=[];
  for (let i =0; i <length(data); i++){
    coordonnayLati.push(data[i][3]);
    coordonnayLong.push(data[i][4]);
  }         
  
  console.log(data.lon);

  var influence = L.circle(coords, 210000, {
      'color': '#FF7F00',
      'fill': true,
      'fillColor': '#FFFF00',
      'fillOpacity': 0.2,
  }).addTo(carte);
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

