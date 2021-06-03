function Allumeylefuego(data){
  console.log(data)
  AfireArray = [];
  BfireArray = [];
  CfireArray = [];
  DfireArray = [];
  EfireArray = [];
    for (let i =0; i <data.length; i++){
      var Feu = L.circle([data[i].lat, data[i].lon], 210, {
          'color': '#FF7F00',
          'fill': true,
          'fillColor': '#FFFF00',
          'fillOpacity': 0.2,
      })//.addTo(carte);
      switch (data[i].type) {
        case "A" :
          AfireArray.push(Feu);
          break

        case "B_Plastics" :
          BfireArray.push(Feu);
          break

        case "B_Alcohol" :
          BfireArray.push(Feu);
          break

        case "B_Gasoline" :
          BfireArray.push(Feu);
          break

        case "C_Flammable_Gases" :
          CfireArray.push(Feu);
          break

        case "D_Metals" :
          DfireArray.push(Feu);
          break

        case "E_Electric" :
          EfireArray.push(Feu);
          break
      }

      var Afires = L.layerGroup(AfireArray).addTo(carte);
      var Bfires = L.layerGroup(BfireArray).addTo(carte);
      var Cfires = L.layerGroup(CfireArray).addTo(carte);
      var Dfires = L.layerGroup(DfireArray).addTo(carte);
      var Efires = L.layerGroup(EfireArray).addTo(carte);

      Feu.bindPopup('');
      var Elinfodelfuego = Feu.getPopup();
      Elinfodelfuego.setContent("<p>"+ "Type of fire : " + data[i].type + "<br />" + "Intensity of the fire : " + data[i].intensity + "<br />" + "Range of the fire : " + data[i].range + "</p>");
      Feu.openPopup();
    } 

    var Overlay = {
      "Feux secs": Afires,
      "Feux gras": Bfires,
      "Feux de gaz": Cfires,
      "Feux de métaux": Dfires,
      "Feux électriques": Efires,
    };
  
  L.control.layers(null,Overlay).addTo(carte);
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

