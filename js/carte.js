function changeIntensity(){
  var x = document.getElementById("intensitySlider").value;
  document.getElementById("intensityNumber").innerHTML = x;
  return x;
  }

function changeRange(){
  var y = document.getElementById("rangeSlider").value;
  document.getElementById("rangeNumber").innerHTML = y;
  return y;
  }


function Allumeylefuego(data){
  console.log(data)
  AfireArray = [];
  BfireArray = [];
  CfireArray = [];
  DfireArray = [];
  EfireArray = [];

tenIntensityFireArray = [];
twentyIntensityFireArray = [];
thirtyIntensityFireArray = [];
fortyIntensityFireArray = [];
fiftyIntensityFireArray = [];

tenRangeFireArray = [];
twentyRangeFireArray = [];
thirtyRangeFireArray = [];
fortyRangeFireArray = [];
fiftyRangeFireArray = [];



    for (let i =0; i <data.length; i++){
      var Feu = L.circle([data[i].lat, data[i].lon], 210, {
          'color': '#FF7F00',
          'fill': true,
          'fillColor': '#FFFF00',
          'fillOpacity': 0.2,
      });
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
      
      if (data.intensity <= 10){
        tenIntensityFireArray.push(Fire);
      }
      if (data.intensity <= 20 && data.intensity > 10){
        twentyIntensityFireArray.push(Fire);
      }
      if (data.intensity <= 30 && data.intensity > 20){
        thirtyIntensityFireArray.push(Fire);
      }
      if (data.intensity <= 40 && data.intensity > 30){
        fortyIntensityFireArray.push(Fire);
      }
      if (data.intensity <= 50 && data.intensity > 40){
        fiftyIntensityFireArray.push(Fire);
      }
      
      if (data.range <= 10){
        tenRangeFireArray.push(Fire);
      }
      if (data.range <= 20 && data.range > 10){
        twentyRangeFireArray.push(Fire);
      }
      if (data.range <= 30 && data.range > 20){
        thirtyRangeFireArray.push(Fire);
      }
      if (data.range <= 40 && data.range > 30){
        fortyRangeFireArray.push(Fire);
      }
      if (data.range <= 50 && data.range > 40){
        fiftyRangeFireArray.push(Fire);
      }


      Feu.bindPopup('');
      var Elinfodelfuego = Feu.getPopup();
      Elinfodelfuego.setContent("<p>"+ "Type of fire : " + data[i].type + "<br />" + "Intensity of the fire : " + data[i].intensity + "<br />" + "Range of the fire : " + data[i].range + "</p>");
      Feu.openPopup();
    } 
    var Afires = L.layerGroup(AfireArray).addTo(carte);
    var Bfires = L.layerGroup(BfireArray).addTo(carte);
    var Cfires = L.layerGroup(CfireArray).addTo(carte);
    var Dfires = L.layerGroup(DfireArray).addTo(carte);
    var Efires = L.layerGroup(EfireArray).addTo(carte);

    for (let i=0; i < data.length; i++){



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






function Rodeo(data){
  console.log(data);
  for(let j=1; j<data.length; j++){
    var Vehicle = L.marker([data[j].lat, data[j].lon]).addTo(carte);
    Vehicle.bindPopup(''); // Je ne mets pas de texte par défaut
    var Linfodelvagone = Vehicle.getPopup();
    Linfodelvagone.setContent("<p>"+ "Available crew : " + data[j].crewMember + "<br />" + "Maximum crew : " + data[j].crewMemberCapacity + "<br />" + "Efficiency : " + data[j].efficiency + "<br />" + "Remaining fuel : " + data[j].fuel + "<br />" + "Fuel consumption : " + data[j].fuelConsumption + "<br />" + "Currently loaded liquid : " + data[j].liquidType + "<br />" + "Available liquid : " + data[j].liquidQuantity + "<br />" + "Liquid consumption : " + data[j].liquidConsumption +  "</p>");

  }

}


function HIGHWAYTOHELL(){
  fetch("http://localhost:8081/vehicle")
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
    
          // Examine the text in the response
            response.json()
        .then(data => Rodeo(data));
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    }






