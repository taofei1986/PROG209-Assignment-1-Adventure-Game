let displayLocationImage=document.getElementById("locationImage");
let displayplayerInformation=document.getElementById("playerInformation");
let displayLocationNotice=document.getElementById("notice");
let currentLocation;

let player={//player object
    playerPack:[],
    playerGold:0,
    playerCapacityLevel:1
}

let tavern={//location:tavern  object
    name:'Tavern',
    information:'Here is tavern, people are talking about something.You can go east or south.',
    imageUrl:"url('image/tavern.jpg')",
    command:["east","south","talk","fruit"],
    letterIsGiven:false,
    event:(inputValue)=>{// event happen in this location                              Here is Arrow functions
        switch(inputValue){
            case "east":
                currentLocation=arena;
                locationInformation();
                break;
            case "south":
                currentLocation=castleGate;
                locationInformation();
                break;
            case "talk":
                if(!this.letterIsGiven){
                    displayLocationNotice.innerHTML+="Rich man:\"We are out of fresh fruit, if you can bring some fruit from the cabin in the woods to here, we will pay 10 god. Here is a introduction letter.\"<br/><br/>";
                    player.playerPack.push("letter");
                    this.letterIsGiven=true;
                    playerInformation();
                }
                else{
                    displayLocationNotice.innerHTML+="Rich man:\"You have the letter now, please bring the fruit as soon as possible!\"<br/><br/>";
                }
                break;
            case "fruit"://give the fruit to rich man.
                if(player.playerPack.length==0){
                    displayLocationNotice.innerHTML+="You have nothing in your pack.<br/><br/>";
                    return;
                }
                for(i=0;i<player.playerPack.length;i++){//check whether there is fruit in pack.
                    if(player.playerPack[i]=="fruit"){
                        player.playerPack.splice(i,1);
                        player.playerGold=player.playerGold+10;
                        this.letterIsGiven=false;
                        displayLocationNotice.innerHTML+="You give one pack of fruit to rich man.<br/>";
                        displayLocationNotice.innerHTML+="Rich man:\"Hello friend! You just get in time. Here is 10 gold.\"<br/><br/>";
                        playerInformation();
                        return;
                    }                
                }
                displayLocationNotice.innerHTML+="There is no fruit in your pack.<br/><br/>";
                break;
            case "help":
                displayLocationNotice.innerHTML+="You can try these words "+this.command+".<br/><br/>";
                break;
            default:
            displayLocationNotice.innerHTML+="Bad input!<br/><br/>";
        }        
    },
}

let castleGate={//location:Castle Gate  object
    name:'Castle Gate',
    information:'Here is castle gate,everything is peaceful. Where do you want to go? East, south, west or north.',
    imageUrl:"url('image/castle_gates.jpg')",
    command:["east","south","west","north"],
    event:function(inputValue){// event happen in this location
        switch(inputValue){
            case "east":
                currentLocation=blackSmith;
                locationInformation();
                break;
            case "south":
                currentLocation=mineCave;
                locationInformation();
                break;
            case "west":
                currentLocation=cabin;
                locationInformation();
                break;
            case "north":
                currentLocation=tavern;
                locationInformation();
                break;
            case "help":
                displayLocationNotice.innerHTML+="You can try these words "+this.command+".<br/><br/>";
                break;
            default:
            displayLocationNotice.innerHTML+="Bad input!<br/><br/>";
        } 
    },
}

let cabin={//location:cabin object
    name:'Cabin in The Woods',
    information:'Here is the cabin in the woods, and a old man sit there. You can go east or south.',
    imageUrl:"url('image/cabin_in_the_woods.jpg')",
    command:["east","south","talk"],
    event:function(inputValue){
        switch(inputValue){
            case "east":
                currentLocation=castleGate;
                locationInformation();
                break;
            case "south":
                currentLocation=river;
                locationInformation();
                break;
            case "talk":
                if(player.playerPack.length==0){
                    displayLocationNotice.innerHTML+="Old man:\"Hello friend! If you have the introduction letter, I can give you one pack of fruit.\"<br/><br/>";
                    return;
                }
                for(i=0;i<player.playerPack.length;i++){//check whether there is letter in pack.
                    if(player.playerPack[i]=="letter"){
                        player.playerPack.splice(i,1);
                        player.playerPack.push("fruit");
                        displayLocationNotice.innerHTML+="You give the introduction letter to old man.<br/>";
                        displayLocationNotice.innerHTML+="Old man:\"Here is the fruit. Take care!\"<br/><br/>";
                        playerInformation();
                        return;
                    }                
                }
                displayLocationNotice.innerHTML+="Old man:\"Hello friend! If you have the introduction letter, I can give you one pack of fruit.\"<br/><br/>";
                break;
            case "help":
                displayLocationNotice.innerHTML+="You can try these words "+this.command+".<br/><br/>";
                break;
            default:
            displayLocationNotice.innerHTML+="Bad input!<br/><br/>";
        } 
    },
}

let river={//location:river  object
    name:'River',
    information:'Here is a river, you hear some scary screech from south. May be you can just go east or north.',
    imageUrl:"url('image/river.jpg')",
    command:["east","south","north"],
    event:function(inputValue){// event happen in this location
        switch(inputValue){
            case "east":
                currentLocation=mineCave;
                locationInformation();
                break;
            case "south":
                currentLocation=dragonCave;
                locationInformation();
                break;
            case "north":
                currentLocation=cabin;
                locationInformation();
                break;
            case "help":
                displayLocationNotice.innerHTML+="You can try these words "+this.command+".<br/><br/>";
                break;
            default:
            displayLocationNotice.innerHTML+="Bad input!<br/><br/>";
        } 
    },
}

let blackSmith={//location:BlackSmith Object
    name:'BlackSmith',
    information:'This is a blacksmith. A young man is working there. You can go west or north.',
    imageUrl:"url('image/blacksmith.png')",
    command:["north","west","talk","ore"],
    event:function(inputValue){// event happen in this location
        switch(inputValue){
            case "north":
                currentLocation=arena;
                locationInformation();
                break;
            case "west":
                currentLocation=castleGate;
                locationInformation();
                break;
            case "talk":
                displayLocationNotice.innerHTML+="Young man:\"Hello friend! People find some special iron ore in the mine cave before. You can try your luck.\"<br/><br/>";
                break;
            case "ore":
                for(i=0;i<player.playerPack.length;i++){//check whether there is ore in pack.
                    if(player.playerPack[i]=="iron ore"){
                        displayLocationNotice.innerHTML+="You give the special iron ore to young man.<br/>";
                        displayLocationNotice.innerHTML+="Young man:\"What a beautiful ore. Let me use it to make a nice and sharp sword.\"<br/>";
                        displayLocationNotice.innerHTML+="You get  a sword.<br/><br/>";
                        player.playerPack.splice(i,1);
                        player.playerPack.push("sword");
                        playerInformation();
                        return;
                    }
                }
                displayLocationNotice.innerHTML+="You don't have ore in your pack.<br/><br/>";      
                break;
            case "help":
                displayLocationNotice.innerHTML+="You can try these words "+this.command+".<br/><br/>";
                break;
            default:
            displayLocationNotice.innerHTML+="Bad input!<br/><br/>";
        } 
    },
}

let palace={//location:palace object
    name:'Palace',
    information:'Welcome to the palace. People are discussing some important thing. May be you want to go back.',
    imageUrl:"url('image/palace.jpg')",
    command:["west","talk","dragon"],
    event:function(inputValue){// event happen in this location
        switch(inputValue){
            case "west":
                currentLocation=arena;
                locationInformation();
                break;
            case "talk"://+++++
                displayLocationNotice.innerHTML+="Soldier:\"A dragon attacked small village, whole village was destroyed. The king said anyone killed that dragon would be the new general.\"<br/><br/>";
                break;
                case "west":
                currentLocation=arena;
                locationInformation();
                break;
            case "dragon"://
                for(i=0;i<player.playerPack.length;i++){//check whether there is ore in pack.
                    if(player.playerPack[i]=="dragon head"){
                        player.playerPack.splice(i,1);
                        ending();
                        return;
                    }
                }
                displayLocationNotice.innerHTML+="Soldier:\"Are you kiding? where is the dead dragon?\"<br/><br/>";
                break;
            case "help":
                displayLocationNotice.innerHTML+="You can try these words "+this.command+".<br/><br/>";
                break;
            default:
            displayLocationNotice.innerHTML+="Bad input!<br/><br/>";
        } 
    },
}

let honorPlace={//location:honor place object
    name:'Honor Place',
    information:'Plaza of honor, all citizens are here.',
    imageUrl:"url('image/honor_ending.png')",
    command:[],
    event:function(inputValue){// event happen in this location
        displayLocationNotice.innerHTML+="<b style=\"color:red;\">congratulations! You finished the adventure!</b><br/><br/>";
    },
}

let arena={//location:Arena object
    name:'Arena',
    information:'This is arena. People are practicing fighting skills with each other. You can go east, south or west.',
    imageUrl:"url('image/arena.jpg')",
    command:["east","south","west","talk","train"],
    event:function(inputValue){// event happen in this location
        switch(inputValue){
            case "east":
                currentLocation=palace;
                locationInformation();
                break;
            case "south":
                currentLocation=blackSmith;
                locationInformation();
                break;
            case "west":
                currentLocation=tavern;
                locationInformation();
                break;
            case "talk"://
                displayLocationNotice.innerHTML+="Warrior:\"Hello friend! If you can give me 10 gold, I can train you higher fighting skill.\"<br/><br/>";
                break;
            case "train"://
                if(player.playerGold>=10){
                    displayLocationNotice.innerHTML+="You pay 10 gold to warrior.<br/>"
                    displayLocationNotice.innerHTML+="Your fighting skill is improved.<br/><br/>"
                    player.playerGold=player.playerGold-10;
                    player.playerCapacityLevel=player.playerCapacityLevel+1;
                    playerInformation();
                }
                else{
                    displayLocationNotice.innerHTML+="You don't have enough gold. Go get a job.<br/><br/>"
                }
                break;
            case "help":
                displayLocationNotice.innerHTML+="You can try these words "+this.command+".<br/><br/>";
                break;
            default:
            displayLocationNotice.innerHTML+="Bad input!<br/><br/>";
        } 
    },
}

let dragonCave={//location:dragon cave  object
    name:'Dragon Cave',
    information:'Be quiet, the dragon is sleeping. It is a good chace. Or you can just go back.',
    imageUrl:"url('image/dragon_cave.jpg')",
    command:["north","attack"],
    dragonIsHere:true,
    event:function(inputValue){// event happen in this location
        switch(inputValue){
            case "north":
                currentLocation=river;
                locationInformation();
                break;
            case "attack":
                if(this.dragonIsHere){//dragon is here
                    for(i=0;i<player.playerPack.length;i++){// check whether there is sword in pack.
                        if(player.playerPack[i]=="sword"){
                            if(player.playerCapacityLevel>=3){
                                displayLocationNotice.innerHTML+="You attack the dragon. The dragon is killed in dream. You cut his head and put in pack.<br/><br/>";
                                this.dragonIsHere=false;
                                player.playerPack.push("dragon head");
                                playerInformation();
                                this.information='There was dragon live here before, but now only bones.';
                            }                        
                            else{
                                displayLocationNotice.innerHTML+="You are not stong enough. Leave will be a nice choice.<br/><br/>";
                            }
                            return;
                        }
                    }
                    displayLocationNotice.innerHTML+="You have no weapon in hand. Leave will be a nice choice.<br/><br/>";
                }
                else{//dragon is not here
                    displayLocationNotice.innerHTML+="There is nothing but rocks and bones.<br/><br/>";
                }
                break;
            case "help":
                displayLocationNotice.innerHTML+="You can try these words "+this.command+".<br/><br/>";
                break;
            default:
            displayLocationNotice.innerHTML+="Bad input!<br/><br/>";
        }
    },
}

let mineCave={//location:mine cave  object
    name:'Mine Cave',
    information:'Here is mine cave, you can go east or may be search this cave to find something useful.',
    imageUrl:"url('image/mines.jpg')",
    command:["west","north","search"],
    ironOreIsHere:true,
    event:function(inputValue){// event happen in this location
        switch(inputValue){
            case "west":
                currentLocation=river;
                locationInformation();
                break;
            case "north":
                currentLocation=castleGate;
                locationInformation();
                break;
            case "search":
                if(this.ironOreIsHere){
                    let randomNumber=Math.floor(Math.random() * 10);
                    console.log(randomNumber);
                    if(randomNumber==9){
                    displayLocationNotice.innerHTML+="Congratulations！You find a special iron ore, maybe you can use it to making a sword.<br/><br/>";
                    player.playerPack.push("iron ore");
                    playerInformation();
                    this.ironOreIsHere=false;
                    }
                    else{
                        displayLocationNotice.innerHTML+="Sorry! You don't find anything. Maybe you need searching more carefully.<br/><br/>";  
                    }
                }
                else{
                    displayLocationNotice.innerHTML+="Seems nothing left here.<br/><br/>"; 
                }
                break;
            case "help":
                displayLocationNotice.innerHTML+="You can try these words "+this.command+".<br/><br/>";
                break;
            default:
            displayLocationNotice.innerHTML+="Bad input!<br/><br/>";
        } 
    },
}



currentLocation=tavern;
function ending(){//finished game
    currentLocation=honorPlace;
    locationInformation();
    displayLocationNotice.innerHTML+="You put the dragon head on the ground.<br/>";
    displayLocationNotice.innerHTML+="King:\"Hero, You save thousand of lives. You are our new general now!\"<br/><br/>";
    player.playerGold=9999999999;
    player.playerCapacityLevel=99999;
    playerInformation();
}

function locationInformation(){// update location information
    displayLocationNotice.innerHTML="<b>Current Location:</b> "+currentLocation.name+"<br/>";
    displayLocationNotice.innerHTML+=currentLocation.information+"<br/><br/>";
    displayLocationImage.style.backgroundImage=currentLocation.imageUrl;//set back ground image for "locationImage" area.
}

function playerInformation(){//update play information
displayplayerInformation.innerHTML="<b>Player Information</b><br/>";
displayplayerInformation.innerHTML+="Gold: "+player.playerGold+"<br/>";
displayplayerInformation.innerHTML+="Fighting Capacity: Level "+player.playerCapacityLevel+"<br/>";
displayplayerInformation.innerHTML+="Pack: "+player.playerPack+"<br/>";
}

function game(){//excute commond
    let playerInput=document.getElementById("textInput").value;
    currentLocation.event(playerInput);    
}

function save(){// save data in localstorage
    let playerJson=JSON.stringify(player);//convert player object to json
    localStorage.setItem("playerData",playerJson);

    let dragonCaveSaveInformation=[dragonCave.dragonIsHere,dragonCave.information];
    let dragonCaveJson=JSON.stringify(dragonCaveSaveInformation);
    localStorage.setItem("dragonCaveData",dragonCaveJson);

    let mineCaveSaveInformation=[mineCave.ironOreIsHere];
    let mineCaveJson=JSON.stringify(mineCaveSaveInformation);
    localStorage.setItem("mineCaveData",mineCaveJson);

    let tavernSaveInformation=[tavern.letterIsGiven];
    let tavernJson=JSON.stringify(tavernSaveInformation);
    localStorage.setItem("tavernData",tavernJson);

    let currentLocationSaveInformation=currentLocation.name;
    localStorage.setItem("currentLocationData",currentLocationSaveInformation);
}

function load(){// get data from localstorage
    console.log("player");
    let loadPlayerJson=localStorage.getItem("playerData");
    let loadPlayerObect=JSON.parse(loadPlayerJson);//convert json to object
    console.log(player);
    player=loadPlayerObect;
    console.log(player);

    console.log("dragonCave");
    let loadDragonCaveJson=localStorage.getItem("dragonCaveData");
    let loadDragonCaveInfo=JSON.parse(loadDragonCaveJson);
    console.log(dragonCave.dragonIsHere);
    console.log(dragonCave.information);
    dragonCave.dragonIsHere=loadDragonCaveInfo[0];
    dragonCave.information=loadDragonCaveInfo[1];
    console.log(dragonCave.dragonIsHere);
    console.log(dragonCave.information);

    console.log("mineCave");
    let loadMineCaveJson=localStorage.getItem("mineCaveData");
    let loadMineCaveInfo=JSON.parse(loadMineCaveJson);
    console.log(mineCave.ironOreIsHere);
    mineCave.ironOreIsHere=loadMineCaveInfo[0];
    console.log(mineCave.ironOreIsHere);

    console.log("tavern");
    let loadtavernJson=localStorage.getItem("tavernData");
    let loadtavernInfo=JSON.parse(loadtavernJson);
    console.log(tavern.letterIsGiven);
    tavern.letterIsGiven=loadtavernInfo[0];
    console.log(tavern.letterIsGiven);

    console.log(currentLocation.name)
    let loadCurrentLocation=localStorage.getItem("currentLocationData");
    switch(loadCurrentLocation){
        case "Tavern":
            currentLocation=tavern;
            break;
        case "Castle Gate":
            currentLocation=castleGate;
            break;
        case "Cabin in The Woods":
            currentLocation=cabin;
            break;
        case "River":
            currentLocation=river;
            break;
        case "BlackSmith":
            currentLocation=blackSmith;
            break;
        case "Palace":
            currentLocation= palace;
            break;
        case "Honor Place":
            currentLocation=honorPlace;
            break;
        case "Arena":
            currentLocation=arena;
            break;
        case "Dragon Cave":
            currentLocation=dragonCave;
            break;
        case "Mine Cave":
            currentLocation=mineCave;
            break;
        default:
            alert("Error when you load data form localstorage.")
    }

    playerInformation();
    locationInformation();
}

playerInformation();//display start player's information
locationInformation();//display start location information

document.getElementById("myButton").addEventListener("click",game);
document.getElementById("saveButton").addEventListener("click",save);
document.getElementById("loadButton").addEventListener("click",load);
