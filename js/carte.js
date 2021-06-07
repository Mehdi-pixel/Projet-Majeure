function callme(){
  var NovaMacchina=L.marker([46, 5]).addTo(carte);
  carte.on('click', GenerateVehicle);
    function GenerateVehicle(e) {
        NovaMacchina.setLatLng(e.latlng);
        window.NewCoords=NovaMacchina.getLatLng();
  };
}

k = 0;



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



window.Liaison=[];


function Rodeo(data){


  CarVehicleArray=[];
  TruckVehicleArray=[];
  FireEngineVehicleArray=[];
  PumperTruckVehicleArray=[];
  WaterTenderVehicleArray=[];
  TurnTableLadderTruckVehicleArray=[];

  WaterLiquidArray=[];
  WaterWithAdditiveLiquidArray=[];
  PowderLiquidArray=[];
  CarbonDioxideLiquidArray=[];

  console.log(data);
  for(let j=1; j<data.length; j++){
    var Vehicle = L.marker([data[j].lat, data[j].lon]).addTo(carte);
    switch(data[j].type){
      case "CAR":
        CarVehicleArray.push(Vehicle)
        break
      case "TRUCK":
        TruckVehicleArray.push(Vehicle)
        break
      case "FIRE_ENGINE":
        FireEngineVehicleArray.push(Vehicle)
        break
      case "PUMPER_TRUCK":
        PumperTruckVehicleArray.push(Vehicle)
        break
      case "WATER_TENDERS":
        WaterTenderVehicleArray.push(Vehicle)
        break
      case "TURNTABLE_LADDER_TRUCK":
        TurnTableLadderTruckVehicleArray.push(Vehicle)    
        break
    }
    switch(data[j].liquidType){
      case "WATER":
        WaterLiquidArray.push(Vehicle)
        break
      case "WATER_WITH_ADDITIVES":
        WaterWithAdditiveLiquidArray.push(Vehicle)
        break
      case "POWDER":
        PowderLiquidArray.push(Vehicle)
        break
      case "CARBON_DIOXIDE":
        CarbonDioxideLiquidArray.push(Vehicle)
        break

    }
    console.log("<button type='button' onclick='seekandmodify("+ data[j].id + "," +
       '"' + document.getElementById('VehicleType').value+ '"' + "," + 
       '"' + document.getElementById('LiquidType').value + '")"' +
        "> Change </button>" + "</p>");
    Vehicle.bindPopup(''); 
    var Linfodelvagone = Vehicle.getPopup();
    Linfodelvagone.setContent("<p>"+ "ID of the vehicle :" + data[j].id + "<br />" + "Type of the vehicle : " + data[j].type + "<br />" +
      "Available crew : " + data[j].crewMember + "<br />" + "Maximum crew : " +
       data[j].crewMemberCapacity + "<br />" + "Efficiency : " + data[j].efficiency +
        "<br />" + "Remaining fuel : " + data[j].fuel + "<br />" + "Fuel consumption : " + data[j].fuelConsumption +
         "<br />" + "Currently loaded liquid : " + data[j].liquidType + "<br />" + "Available liquid : " +
          data[j].liquidQuantity + "<br />" + "Liquid consumption : " + data[j].liquidConsumption + 
     "<br />" + "<button type='button' onclick='seekanddestroy("+ data[j].id +")'>  Physically remove </button>" +
      "<br />" + 
      "<button type='button' onclick='seekandmodify("+ data[j].id + "," +
       '"' + document.getElementById('VehicleType').value+ '"' + "," + 
       '"' + document.getElementById('LiquidType').value + '")'+ "'" +
        "> Change </button>" + "</p>");
    var vroum = new Object();

    vroum = {"marker" : Vehicle, "id" : data[j].id}
    window.Liaison.push(vroum);
  }






  var WaterLiquidArray = L.layerGroup(WaterLiquidArray).addTo(carte);
  var WaterWithAdditiveLiquidArray = L.layerGroup(WaterWithAdditiveLiquidArray).addTo(carte);
  var CarbonDioxideLiquidArray = L.layerGroup(CarbonDioxideLiquidArray).addTo(carte);
  var PowderLiquidArray = L.layerGroup(PowderLiquidArray).addTo(carte);



  var CarVehicleArray = L.layerGroup(CarVehicleArray).addTo(carte);
  var TruckVehicleArray = L.layerGroup(TruckVehicleArray).addTo(carte);
  var FireEngineVehicleArray = L.layerGroup(FireEngineVehicleArray).addTo(carte);
  var PumperTruckVehicleArray = L.layerGroup(PumperTruckVehicleArray).addTo(carte);
  var WaterTenderVehicleArray = L.layerGroup(WaterTenderVehicleArray).addTo(carte);
  var TurnTableLadderTruckVehicleArray = L.layerGroup(TurnTableLadderTruckVehicleArray).addTo(carte);

  var OverlayVehicle = {
    "Cars": CarVehicleArray,
    "Trucks": TruckVehicleArray,
    "Fire Engine": FireEngineVehicleArray,
    "Pumper Truck": PumperTruckVehicleArray,
    "Water Tender": WaterTenderVehicleArray,
    "Turn-Table Ladder Truck": TurnTableLadderTruckVehicleArray,
  };

  var OverlayLiquid = {
    "Water": WaterLiquidArray,
    "Water with additives": WaterWithAdditiveLiquidArray,
    "Powder": PowderLiquidArray,
    "Carbon dioxide": CarbonDioxideLiquidArray,
  };

  L.control.layers(null,OverlayVehicle).addTo(carte);
  L.control.layers(null,OverlayLiquid).addTo(carte);


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


function TOMYCOLLECTION(vType,lType,Coords){
  ret = {"id":null,"lon":Coords.lng,"lat":Coords.lat,"type":vType,"efficiency":null,"liquidType":lType,"liquidQuantity":null,"liquidConsumption":null,"fuel":null,"fuelConsumption":null,"crewMember":null,"crewMemberCapacity":null,"facilityRefID":0};
  ret.id = window.k++;
  ret.efficiency = 5.0;

  switch (vType){


    case "CAR" :
      ret.liquidQuantity = 100.0;
      ret.liquidConsumption = 1.0;
      ret.fuel = 250.0;
      ret.fuelConsumption = 0.5;
      ret.crewMember = 1;
      ret.crewMemberCapacity = ret.crewMember*2;
      break;  

    case "TRUCK" :
      ret.liquidQuantity = 1000.0;
      ret.liquidConsumption = 10.0;
      ret.fuel = 500.0;
      ret.fuelConsumption = 1.0;
      ret.crewMember = 4;
      ret.crewMemberCapacity = ret.crewMember*2;
      break;
    case "FIRE_ENGINE" :
      ret.liquidQuantity = 2000.0;
      ret.liquidConsumption = 15.0;
      ret.fuel = 750.0;
      ret.fuelConsumption = 3.0;
      ret.crewMember = 6;
      ret.crewMemberCapacity = ret.crewMember*2;
      break;

    case "PUMPER_TRUCK" :
      ret.liquidQuantity = 4000.0;
      ret.liquidConsumption = 50.0;
      ret.fuel = 1000.0;
      ret.fuelConsumption = 10.0;
      ret.crewMember = 4;
      ret.crewMemberCapacity = ret.crewMember*2;
      break;

    case "WATER_TENDERS" :
      ret.liquidQuantity = 15000.0;
      ret.liquidConsumption = 100.0;
      ret.fuel = 5000.0;
      ret.fuelConsumption = 35.0;
      ret.crewMember = 21;
      ret.crewMemberCapacity = ret.crewMember*2;
      break;

    case "TURNTABLE_LADDER_TRUCK" :
      ret.liquidQuantity = 1500.0;
      ret.liquidConsumption = 20.0;
      ret.fuel = 600.0; 
      ret.fuelConsumption = 2.0;
      ret.crewMember = 12;
      ret.crewMemberCapacity = ret.crewMember*2;
      break;
  }
  ret = JSON.stringify(ret);
  console.log(ret);
  return ret;
}




function AFINEADDITION() {
  var vType = document.getElementById('VehicleType').value;
  console.log("Newestest vType : "+vType);
  var lType = document.getElementById('LiquidType').value;
  console.log("lType : " + lType);



  fetch('http://localhost:8081/vehicle', {method:'POST', body: TOMYCOLLECTION(vType,lType,window.NewCoords),headers: new Headers({'content-type': 'application/json'})})
  .then(results => results.json())
  .then(console.log);

  HIGHWAYTOHELL();

}






function seekanddestroy(id){  fetch("http://localhost:8081/vehicle/"+id , {method:'DELETE'})
.then(
  function(response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return;
    }

    // Examine the text in the response
    console.log("You shall go to the shadow realm")
  }
)
.catch(function(err) {
  console.log('Fetch Error :-S', err);
});

}

function ElDiablo(data,ret){
  console.log(data)
  data.liquidType=ret[1];
  data.type=ret[0];
  console.log(data)
  data=JSON.stringify(data);
  fetch("http://localhost:8081/vehicle/"+data.id , {method:'PUT', body:data, headers: new Headers({'content-type': 'application/json'})})
  .then(results => results.json())
  .then(console.log);

}


function seekandmodify(id,vType,lType){
  ret = [vType, lType];
  fetch("http://localhost:8081/vehicle/"+id)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
        response.json()
    .then(data => ElDiablo(data, ret));
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

}



function seekanddestroy(id){

  let i = 0;
    while (window.Liaison[i].id != id){
      if (i==window.Liaison.length){
        console.log("Lmao get fucked bitch")
        break
      }
      i++;
    }

    

    fetch("http://localhost:8081/vehicle/"+id,{method:'DELETE'});
    carte.removeLayer(window.Liaison[i].marker);
    const index = window.Liaison.indexOf(window.Liaison[i]);
    if (index > -1) {
      window.Liaison.splice(index, 1);
}
  console.log(window.Liaison); 

    
}

