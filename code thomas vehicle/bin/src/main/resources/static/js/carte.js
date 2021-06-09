function PremierMarquage(){
  var NovaMacchina=L.marker([46, 5]).addTo(carte);
  carte.on('click', GenerateVehicle);
    function GenerateVehicle(e) {
        NovaMacchina.setLatLng(e.latlng);
        window.NewCoords=NovaMacchina.getLatLng();
  };
}

k = 0;
cringeArray = [];



function Intervention(lat,lng){
	
    fetch("http://localhost:8084/launchvehicle?latFeu=" + lat + "&lonFeu=" + lng)
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


function Allumeylefuego(data){
  AfireArray = [];
  BfireArray = [];
  CfireArray = [];
  DfireArray = [];
  EfireArray = [];


function ColorationFeux(type){ 
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
          'color': ColorationFeux(data[i].type),
          'fill': true,
          'fillColor': ColorationFeux(data[i].type),
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
  

      Feu.bindPopup('');
      var Elinfodelfuego = Feu.getPopup();
      Elinfodelfuego.setContent("<p>"+ "Type of fire : " + data[i].type + "<br />" + "Intensity of the fire : " + data[i].intensity + "<br />" + "Range of the fire : " + data[i].range + 
	  "<button type='button' onclick='Intervention("+ data[i].lat  + "," + data[i].lon + ")" + "'" + ">Send an emergency vehicle</button>" + "</p>");
      Feu.openPopup();
	  
	  
    } 
    var Afires = L.layerGroup(AfireArray).addTo(carte);
    var Bfires = L.layerGroup(BfireArray).addTo(carte);
    var Cfires = L.layerGroup(CfireArray).addTo(carte);
    var Dfires = L.layerGroup(DfireArray).addTo(carte);
    var Efires = L.layerGroup(EfireArray).addTo(carte);


    var Overlay = {
      "Feux secs": Afires,
      "Feux gras": Bfires,
      "Feux de gaz": Cfires,
      "Feux de métaux": Dfires,
      "Feux électriques": Efires,
    };
  
  if (window.fireControl != undefined){
    window.fireControl.remove(carte);
  }

  window.fireControl = L.control.layers(null,Overlay);
  window.fireControl.addTo(carte);

}


function FetchFeux(){
    fetch("http://localhost:8084/getfirelist")
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

function GestionVehicules(data){

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

  for(let j=1; j<data.length; j++){data[j].lat, data[j]
    Vehicle = L.marker([data[j].lat, data[j].lon]);
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

    Vehicle.bindPopup(''); 
    var Linfodelvagone = Vehicle.getPopup();
    Linfodelvagone.setContent("<p>"+ "ID of the vehicle :" + data[j].id + "<br />" + "Type of the vehicle : " + data[j].type + "<br />" +
      "Available crew : " + data[j].crewMember + "<br />" + "Maximum crew : " +
       data[j].crewMemberCapacity + "<br />" + "Efficiency : " + data[j].efficiency +
        "<br />" + "Remaining fuel : " + data[j].fuel + "<br />" + "Fuel consumption : " + data[j].fuelConsumption +
         "<br />" + "Currently loaded liquid : " + data[j].liquidType + "<br />" + "Available liquid : " +
          data[j].liquidQuantity + "<br />" + "Liquid consumption : " + data[j].liquidConsumption + 
     "<br />" + "<button type='button' onclick='DeleteVehicle("+ data[j].id +")'>  Physically remove </button>" +
      "<br />" + 
      "<button type='button' onclick='FetchVehicle("+ data[j].id + "," +
       '"' + document.getElementById('VehicleType').value+ '"' + "," + 
       '"' + document.getElementById('LiquidType').value + '")'+ "'" +
        "> Change </button>" + "</p>");
    var vroum = new Object();

    vroum = {"marker" : Vehicle, "id" : data[j].id}
    window.Liaison.push(vroum);
  }

  var WaterLiquidArray = L.layerGroup(WaterLiquidArray);
  var WaterWithAdditiveLiquidArray = L.layerGroup(WaterWithAdditiveLiquidArray);
  var CarbonDioxideLiquidArray = L.layerGroup(CarbonDioxideLiquidArray);
  var PowderLiquidArray = L.layerGroup(PowderLiquidArray);


  var CarVehicleArray = L.layerGroup(CarVehicleArray);
  var TruckVehicleArray = L.layerGroup(TruckVehicleArray);
  var FireEngineVehicleArray = L.layerGroup(FireEngineVehicleArray);
  var PumperTruckVehicleArray = L.layerGroup(PumperTruckVehicleArray);
  var WaterTenderVehicleArray = L.layerGroup(WaterTenderVehicleArray);
  var TurnTableLadderTruckVehicleArray = L.layerGroup(TurnTableLadderTruckVehicleArray);

  for(let i=1; i<window.cringeArray.length; i++){
    if (window.cringeArray[i] != undefined){
      window.cringeArray[i].clearLayers();
    }
  } 


  window.cringeArray[0] = WaterLiquidArray;
  window.cringeArray[1] = WaterWithAdditiveLiquidArray;
  window.cringeArray[2] = CarbonDioxideLiquidArray;
  window.cringeArray[3] = PowderLiquidArray;

  window.cringeArray[4] = CarVehicleArray;
  window.cringeArray[5] = TruckVehicleArray;
  window.cringeArray[6] = FireEngineVehicleArray;
  window.cringeArray[7] = PumperTruckVehicleArray;
  window.cringeArray[8] = WaterTenderVehicleArray;
  window.cringeArray[9] = TurnTableLadderTruckVehicleArray;


  for(let i=1; i<window.cringeArray.length; i++){
    window.cringeArray[i].addTo(carte);
  }

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
  if (window.vehiControl != undefined){
    window.vehiControl.remove(carte);
  }

  if (window.liquiControl != undefined){
    window.liquiControl.remove(carte);
  }
  window.vehiControl = L.control.layers(null,OverlayVehicle);
  window.liquiControl = L.control.layers(null,OverlayLiquid);

  window.vehiControl.addTo(carte);
  window.liquiControl.addTo(carte);


}

function FetchVehicules(){
  fetch("http://localhost:8084/vehicle")
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
    
          // Examine the text in the response
            response.json()
        .then(data => GestionVehicules(data));
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    }

function VehicleObjectify(vType,lType){
  ret = {"idRemote":1,"lon":window.NewCoords.lng,"lat":window.NewCoords.lat,"type":vType,"efficiency":null,"liquidType":lType,"liquidQuantity":null,"liquidConsumption":null,"fuel":null,"fuelConsumption":null,"crewMember":null,"crewMemberCapacity":null,"facilityRefID":0};
  ret.efficiency = 10.0;

  switch (vType){


    case "CAR" :
      ret.liquidQuantity = 100.0;
      ret.liquidConsumption = 1.0;
      ret.fuel = 250.0;
      ret.fuelConsumption = 0.5;
      ret.crewMember = 1;
      ret.crewMemberCapacity = ret.crewMember;
      break;  

    case "TRUCK" :
      ret.liquidQuantity = 1000.0;
      ret.liquidConsumption = 10.0;
      ret.fuel = 500.0;
      ret.fuelConsumption = 1.0;
      ret.crewMember = 4;
      ret.crewMemberCapacity = ret.crewMember;
      break;

    case "FIRE_ENGINE" :
      ret.liquidQuantity = 2000.0;
      ret.liquidConsumption = 15.0;
      ret.fuel = 750.0;
      ret.fuelConsumption = 3.0;
      ret.crewMember = 6;
      ret.crewMemberCapacity = ret.crewMember;
      break;

    case "PUMPER_TRUCK" :
      ret.liquidQuantity = 4000.0;
      ret.liquidConsumption = 50.0;
      ret.fuel = 1000.0;
      ret.fuelConsumption = 10.0;
      ret.crewMember = 4;
      ret.crewMemberCapacity = ret.crewMember;
      break;

    case "WATER_TENDERS" :
      ret.liquidQuantity = 15000.0;
      ret.liquidConsumption = 100.0;
      ret.fuel = 5000.0;
      ret.fuelConsumption = 35.0;
      ret.crewMember = 21;
      ret.crewMemberCapacity = ret.crewMember;
      break;

    case "TURNTABLE_LADDER_TRUCK" :
      ret.liquidQuantity = 1500.0;
      ret.liquidConsumption = 20.0;
      ret.fuel = 600.0; 
      ret.fuelConsumption = 2.0;
      ret.crewMember = 12;
      ret.crewMemberCapacity = ret.crewMember;
      break;
  }
  ret = JSON.stringify(ret);
  return ret;
}




function VehicleCreation() {

  var vType = document.getElementById('VehicleType').value;
  var lType = document.getElementById('LiquidType').value;



  fetch("http://localhost:8084/vehicle", {method:'POST', body: VehicleObjectify(vType,lType),headers: new Headers({'content-type': 'application/json'})})
  .then(results => results.json())
  .then(console.log);


  
}

function ChangeVehicle(data,ret){
  id = data.id;
  delete data.id;
  console.log(data)
  data.liquidType=ret[1];
  data.type=ret[0];
  console.log(data)
  data=JSON.stringify(data);
  fetch("http://localhost:8084/vehicle/"+id , {method:'PUT', body:data, headers: new Headers({'content-type': 'application/json'})})
  .then(results => results.json())
  .then(console.log);

  fetch("http://localhost:8084/vehicle/"+id)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
        response.json()
    .then(data => data);
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

  var id2 = data.id;
  let i = 0;
  while (window.Liaison[i].id != id){
    if (i == window.Liaison.length){
      break;
    }
    i++;
  }
  window.Liaison[i].id = id2;
}


function FetchVehicle(id,vType,lType){
  vType = document.getElementById('VehicleType').value;
  lType = document.getElementById('LiquidType').value;
  ret = [vType, lType];
  fetch("http://localhost:8084/vehicle/"+id)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
        response.json()
    .then(data => ChangeVehicle(data, ret));
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

}

function DeleteVehicle(id){

  let i = 0;
    while (window.Liaison[i].id != id){
      if (i==window.Liaison.length){
        console.log("Unfortunate")
        break
      }
      i++;
    }

    fetch("http://localhost:8084/vehicle/"+id,{method:'DELETE'});
    carte.removeLayer(window.Liaison[i].marker);
    const index = window.Liaison.indexOf(window.Liaison[i]);
    if (index > -1) {
      window.Liaison.splice(index, 1);
}
}





