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

function coco(type){ 
  console.log(type);
  switch (type) {
    case "A" : return "#f56042";
    case "B_Plastics" : return "#ad6a18";
    case "B_Alcohol" : return "#ad6a18";
    case "B_Gasoline" : return "#ad6a18";
    case "C_Flammable_Gases" : return "#bd1989";
    case "D_Metals" : return "#6d009c";
    case "E_Electric" : return "#ebdb00";
}         }



    for (let i =0; i <data.length; i++){
      var Feu = L.circle([data[i].lat, data[i].lon], 150, {
          'color': coco(data[i].type),
          'fill': true,
          'fillColor': coco(data[i].type),
          'fillOpacity': 0.5,
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
      
      if (data[i].intensity <= 10){
        tenIntensityFireArray.push(Feu);
      }
      if (data[i].intensity <= 20){
        twentyIntensityFireArray.push(Feu);
      }
      if (data[i].intensity <= 30){
        thirtyIntensityFireArray.push(Feu);
      }
      if (data[i].intensity <= 40){
        fortyIntensityFireArray.push(Feu);
      }
      if (data[i].intensity <= 50){
        fiftyIntensityFireArray.push(Feu);
      }
      
      if (data[i].range <= 10){
        tenRangeFireArray.push(Feu);
      }
      if (data[i].range <= 20){
        twentyRangeFireArray.push(Feu);
      }
      if (data[i].range <= 30){
        thirtyRangeFireArray.push(Feu);
      }
      if (data[i].range <= 40){
        fortyRangeFireArray.push(Feu);
      }
      if (data[i].range <= 50){
        fiftyRangeFireArray.push(Feu);
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

    var tenIntensityFires = L.layerGroup(tenIntensityFireArray).addTo(carte);


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

function filter(Feux,seuil){
  Feux.clearLayers();

  newFeux = new L.geoJson(exp_popplaces,{
    onEachFeature: pop_popplaces,
        filter:
            function(feature, layer) {
                 return (feature.properties.pop_max <= rangeMax) && (feature.properties.pop_max >= rangeMin);
            },
    pointToLayer: popplaces_marker})

      //and back again into the cluster group
  Feux.addLayer(popplaces);
  /*
  Reload tous les layers !
  Feux

  Vérification de la condition


  Redessinement des layers concernés







  */



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






