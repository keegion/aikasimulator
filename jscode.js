
var points = 49;
var level = 50;
var skillDescription;
var skillPoint;
var skillLevel;
var chosenClass = "Rifleman";
var skillInfo;
var mp;
var cd;
var cast;
var passive;
var maxPoints = [];
var lvl99Points = 0;
var CDValue = 0.99;


function loadPoints() {

    document.getElementById("points").innerHTML = points;
    for (i = 0; i < 31; i++) {
        for (y = 0; y < skillLevel[i].length + 1; y++) {

            if (level < skillLevel[i][y] || y == skillLevel[i].length) {
                maxPoints[i] = y;
                break;
            }
        }
        document.getElementById("skill" + (i + 1) + "Points").innerHTML = skillPoint[i] + "/" + maxPoints[i];
        $("#skill" + (i + 1) + "Points").addClass("notMaxedSkillPoint").removeClass("maxedSkillPoint");
        lvl99Points = 0;
        document.getElementById("99points").innerHTML = lvl99Points;
    }
    
}

function IncreasePoints(index) {

    if (skillLevel[index][skillPoint[index]] <= level && points > 0) {
        skillPoint[index]++;
        points--;
    }

    document.getElementById("skill" + (index + 1) + "Points").innerHTML = skillPoint[index] + "/" + maxPoints[index];
    document.getElementById("points").innerHTML = points;
    if (skillPoint[index] == maxPoints[index] && maxPoints[index] > 0) {
        $("#skill" + (index + 1) + "Points").addClass("maxedSkillPoint").removeClass("notMaxedSkillPoint");
    }

}

function IncreasePointsMax(index) {
    if (skillPoint[index] < maxPoints[index]) {
        if (points < maxPoints[index] - skillPoint[index]) {
            skillPoint[index] += points;
            points = 0;
        } else {
            points -= maxPoints[index] - skillPoint[index];
            skillPoint[index] = maxPoints[index];
        }


    }
    document.getElementById("skill" + (index + 1) + "Points").innerHTML = skillPoint[index] + "/" + maxPoints[index];
    document.getElementById("points").innerHTML = points;
    if (skillPoint[index] == maxPoints[index] && maxPoints[index] > 0) {
        $("#skill" + (index + 1) + "Points").addClass("maxedSkillPoint").removeClass("notMaxedSkillPoint");
    }
}

function DecreasePoints(index) {
    if (index == 0 && skillPoint[index] > 1) {
        skillPoint[index]--;
        points++;
    } else if (index > 0 && skillPoint[index] > 0) {
        skillPoint[index]--;
        points++;
    }
    document.getElementById("skill" + (index + 1) + "Points").innerHTML = skillPoint[index] + "/" + maxPoints[index];
    document.getElementById("points").innerHTML = points;
    $("#skill" + (index + 1) + "Points").addClass("notMaxedSkillPoint").removeClass("maxedSkillPoint");
    
}

//Colors skill points if they are maxed
function CheckIfSkillPointsAreMaxed(){
    for (i = 0; i < 31; i++) {
        if (skillPoint[i] == maxPoints[i] && maxPoints[i] > 0) {
            $("#skill" + (i + 1) + "Points").addClass("maxedSkillPoint").removeClass("notMaxedSkillPoint");
        }
    
    }
}

function DecreasePointsMin(index) {
    if (index == 0) {
        points += skillPoint[index] - 1;
        skillPoint[index] = 1;
    } else {
        points += skillPoint[index];
        skillPoint[index] = 0;
    }
    document.getElementById("skill" + (index + 1) + "Points").innerHTML = skillPoint[index] + "/" + maxPoints[index];
    document.getElementById("points").innerHTML = points;
    $("#skill" + (index + 1) + "Points").addClass("notMaxedSkillPoint").removeClass("maxedSkillPoint");
}

function SetLevel(lvl) {
    level = lvl;
    if (lvl < 51) {
        points = lvl - 1;
    } else {
        points = (lvl - 50) * 2 + 49;
    }

    document.getElementById("level").innerHTML = level;
    skillPoint = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    loadPoints();
    LoadPicturesAndDescription();
 
}

//Hide div boxes that are below the level limit
//Not in use atm
function HideSkillsThatAreOutOfRange(lvl){
    var S4 = document.getElementsByClassName("S4")[0]; //51-70 skills
    var S5 = document.getElementsByClassName("S5")[0]; //71-90 skills
    var S6 = document.getElementsByClassName("S6")[0]; //91+ skills

    if(lvl < 51){
        S4.style.opacity = "0.1";
        S5.style.opacity = "0.1";
        S6.style.opacity = "0.1";

    }else if(lvl < 71){
        S4.style.opacity = "1";
        S5.style.opacity = "0.1";
        S6.style.opacity = "0.1";


    }else if(lvl < 95){
        S4.style.opacity = "1";
        S5.style.opacity = "1";
        S6.style.opacity = "0.1";

    }else{
        S4.style.opacity = "1";
        S5.style.opacity = "1";
        S6.style.opacity = "1";
    }
}

function SetClass(ChClass) {
    chosenClass = ChClass;
    LoadData();
}

function CheckIfURLHasData(){
    var url = window.location.href;
    var res = url.split("?");
    var data = res[1];
    LoadData();
    if(data){
        LoadDataFromUrl(data);
    }

}

function LoadDataFromUrl(res){

    var splitData = res.split("&");
    SetClass(splitData[1]);
    SetLevel(Number(splitData[0]));
    skillPoint = [Number(splitData[5]), Number(splitData[6]), Number(splitData[7]), Number(splitData[8]), Number(splitData[9]), Number(splitData[10]), Number(splitData[11]), Number(splitData[12]), Number(splitData[13]), Number(splitData[14]),
    Number(splitData[15]), Number(splitData[16]), Number(splitData[17]), Number(splitData[18]), Number(splitData[19]), Number(splitData[20]), Number(splitData[21]), Number(splitData[22]), Number(splitData[23]), Number(splitData[24]),
    Number(splitData[25]), Number(splitData[26]), Number(splitData[27]), Number(splitData[28]), Number(splitData[29]), Number(splitData[30]), Number(splitData[31]), Number(splitData[32]), Number(splitData[33]),
    Number(splitData[34]), Number(splitData[35]), Number(splitData[36]), Number(splitData[37]), Number(splitData[38]), Number(splitData[39]), Number(splitData[40]), Number(splitData[41]), Number(splitData[42]), Number(splitData[43])];
    LoadPicturesAndDescription();
    CalculateCD(Number(splitData[4]));
    points = Number(splitData[2]);
    loadPoints();
    CheckIfSkillPointsAreMaxed();
    lvl99Points = Number(splitData[3]);
    document.getElementById("99points").innerHTML = lvl99Points;

}

function SaveDataToUrl(){
    var currentWebsite = "https://aikaskillsimulator.xyz?";
    var currentSkillSet = skillPoint[0] + "&" + skillPoint[1] + "&" + skillPoint[2] + "&" + skillPoint[3] + "&" + skillPoint[4] + "&" + skillPoint[5] + "&" + skillPoint[6] + "&" + skillPoint[7] + "&" +
    skillPoint[8] + "&" + skillPoint[9] + "&" + skillPoint[10] + "&" + skillPoint[11] + "&" + skillPoint[12] + "&" + skillPoint[13] + "&" + skillPoint[14] + "&" + skillPoint[15] + "&" + skillPoint[16] + "&" +
    skillPoint[17] + "&" + skillPoint[18] + "&" + skillPoint[19] + "&" + skillPoint[20] + "&" + skillPoint[21] + "&" + skillPoint[22] + "&" + skillPoint[23] + "&" + skillPoint[24] + "&" + skillPoint[25] + "&" +
    skillPoint[26] + "&" + skillPoint[27] + "&" + skillPoint[28] + "&" + skillPoint[29] + "&" + skillPoint[30];
    var newURL = currentWebsite + level + "&" + chosenClass + "&" + points + "&" + lvl99Points + "&" + ((1-CDValue)*100).toFixed(2) + "&" + currentSkillSet;
    document.getElementById("UrlInput").value = newURL;
    console.log(newURL);
}

function LoadData() {

    const skillData = eval(chosenClass);
    skillLevel = skillData.skillLevel;
    skillDescription = skillData.skillDescription;
    mp = skillData.mp;
    cd = skillData.cd;
    skillInfo = skillData.skillInfo;
    cast = skillData.cast;
    document.getElementById("class").innerHTML = chosenClass;
    chosenLvl = document.getElementById("levelSelect").value
    SetLevel(chosenLvl);
}

//Load pictures and description and make skills that are not available transparentish
function LoadPicturesAndDescription(){

    for (i = 0; i < 31; i++) {
        document.getElementById("skill" + (i + 1) + "Img").src = chosenClass + "/" + (i + 1) + ".jpg";
        document.getElementById("skill" + (i + 1) + "Description").innerHTML = skillDescription[i];
        document.getElementById("skill" + (i + 1) + "Img").style.opacity = "1";
        document.getElementById("skill" + (i + 1) + "Description").style.opacity = "1";
        if(skillLevel[i][0]>level){
            document.getElementById("skill" + (i + 1) + "Img").style.opacity = "0.2";
            document.getElementById("skill" + (i + 1) + "Description").style.opacity = "0.2";
        }

    }
}

//Check if there is any skillpoints on current skill, if no, don't show popup/skill description
function popUPCheck(lvl, arrow) {
    if (arrow == "downArrow" && skillPoint[lvl] == 0) {
        return false;
    } else {
        return true;
    }
}

function points99(p) {

    p = parseInt(p);
    if(level != 99){
        alert("Your level needs to be 99 to add extra points!");
    }else{
        if(lvl99Points == 0){
         points = (points + p);
        lvl99Points = p;
        }else if (p>lvl99Points){
        points += p - lvl99Points;
        lvl99Points = p;
        }else{
            if((p-lvl99Points) + points <0){
                SetLevel(99);
                lvl99Points = p;
                points += p;
                
            }else{
                points += p-lvl99Points;
                lvl99Points = p;
            }
        }
       
    }
    document.getElementById("99points").innerHTML = lvl99Points;
    document.getElementById("points").innerHTML = points;
}

function CalculateCD(cd) {

    if(isNaN(parseFloat(cd))){
        alert("Numbers only, thanks!")
        cd = 0;
    }else if (cd<0){
     cd = 0;
    }else if(cd>70){
        cd = 70;
    }
    cd = parseFloat(cd);
    document.getElementById("CDValue").innerHTML = cd.toFixed(2) + "%";
    CDValue = 1-(cd/100);
}

function CopyTextToClipBoard(){
    var text = document.getElementById("UrlInput").value;
    navigator.clipboard.writeText(text).then(function() {
    console.log('copied' + text);
},  function(err) {
    console.error('Async: Could not copy text: ', err);
});
}

function popUP(lvl, arrow) {

    var CDHere = CDValue;
    if(lvl == 16 && chosenClass == "DualGunner"){
        CDHere = 1;
    }
    var lastCheck = maxPoints[lvl] - 1;
    
    if(lastCheck<0){
        lastCheck = 0;
    }

    var name = "<div class='title'>" + skillDescription[lvl] + "</div>";
    var currentLevel = "Required Level : " + skillLevel[lvl][skillPoint[lvl] - 1];
    var nextLevel = "<div class='red'>Next level</div> Required Level : " + skillLevel[lvl][skillPoint[lvl]];
    var skilldesc = "<div class='info'>" + skillInfo[lvl][skillPoint[lvl] - 1] + "</div>";
    var mpcurrent = "Required MP : " + mp[lvl][skillPoint[lvl] - 1];
    var cdcurrent = "Cooldown time : " + (CDHere * cd[lvl][skillPoint[lvl] - 1]).toFixed(0) + " Sec";
    var castingcurrent = "Cast time : " +  cast[lvl][skillPoint[lvl] - 1] + " Sec";
    var skilldescnext = "<div class='info'>" + skillInfo[lvl][skillPoint[lvl]] + "</div>";
    var mpnext = "Required MP : " + mp[lvl][skillPoint[lvl]];
    var cdnext = "Cooldown time : " + (CDHere * cd[lvl][skillPoint[lvl]]).toFixed(0) + " Sec";
    var castingnext = "Cast time : " + cast[lvl][skillPoint[lvl]] + " Sec";
    var previousLevel = "<div class='red'>Previous level</div> Required Level : " + skillLevel[lvl][skillPoint[lvl] - 2]
    var skilldescPrev = "<div class='info'>" + skillInfo[lvl][skillPoint[lvl] - 2] + "</div>";
    var mpPrev = "Required MP : " + mp[lvl][skillPoint[lvl] - 2];
    var cdPrev = "Cooldown time : " + (CDHere * cd[lvl][skillPoint[lvl] - 2]).toFixed(0) + " Sec";
    var castingPrev = "Cast time : " + cast[lvl][skillPoint[lvl] - 2] + " Sec";
    var lastLevel = "<div class='red'>Next level</div> Required Level : " + skillLevel[lvl][lastCheck];
    var skilldescLast = "<div class='info'>" + skillInfo[lvl][lastCheck] + "</div>";
    var mpLast = "Required MP : " + mp[lvl][lastCheck];
    var cdLast = "Cooldown time : " + (CDHere * cd[lvl][lastCheck]).toFixed(0) + " Sec";
    var castingLast = "Cast time : " + cast[lvl][lastCheck] + " Sec";
    
    //if skill is passive
    if (lvl == 8 || lvl == 9 || lvl == 19 || lvl == 22) {
        var allNextLevel = nextLevel + "<div class='passive'>Passive</div>" + skilldescnext;
        var allCurrentLevel = currentLevel + "<div class='passive'>Passive</div>" + skilldesc + "<br>";
        var allPreviousLevel = previousLevel + "<div class='passive'>Passive</div>" + skilldescPrev + "<br>";
        var allLastLevel = lastLevel + "<div class='passive'>Passive</div>" + skilldescLast + "<br>";

    } else if (cast[lvl][skillPoint[0]] == 0 ||!cast[lvl][skillPoint[0]] ) {
        var allCurrentLevel = currentLevel + "<br>" + mpcurrent + "<br>" + cdcurrent + "<br>" + skilldesc + "<br>";
        var allNextLevel = nextLevel + "<br>" + mpnext + "<br>" + cdnext + "<br>" + skilldescnext;
        var allPreviousLevel = previousLevel + "<br>" + mpPrev + "<br>" + cdPrev + "<br>" + skilldescPrev;
        var allLastLevel = lastLevel + "<br>" + mpLast + "<br>" + cdLast + "<br>" + skilldescLast;
    } else {
        var allCurrentLevel = currentLevel + "<br>" + mpcurrent + "<br>" + cdcurrent + "<br>" + castingcurrent + "<br>" + skilldesc + "<br>";
        var allNextLevel = nextLevel + "<br>" + mpnext + "<br>" + cdnext + "<br>" + castingnext + "<br>" + skilldescnext;
        var allPreviousLevel = previousLevel + "<br>" + mpPrev + "<br>" + cdPrev + "<br>" + castingPrev + "<br>" + skilldescPrev;
        var allLastLevel = lastLevel + "<br>" + mpLast + "<br>" + cdLast + "<br>" + castingLast + "<br>" + skilldescLast;
    }

    //for image and secription
    if(arrow == "imgHover" || arrow == "descHover"){
        if(skillPoint[lvl]==0){
            return name + "<br>" + allNextLevel;
        }else
            return name + "<br>" + allCurrentLevel;
    }

    //for clicking "max up" arrow
    if (arrow == "dupArrow" && skillPoint[lvl] == 0) {

        return name + "<br>" + allLastLevel;

    } else if (arrow == "dupArrow" && skillPoint[lvl] == maxPoints[lvl]) {

        return name +"<br>" + allCurrentLevel;

    }else if(arrow == "dupArrow"){

        return name +"<br>" + allCurrentLevel + allLastLevel;
    }

    //for click downArrow
    if (arrow == "downArrow" && skillPoint[lvl] == 1) {

        return name + "<br>" + allCurrentLevel;

    } else if (arrow == "downArrow") {

        return name + "<br>" + allCurrentLevel + allPreviousLevel;
    }

    //for clicking up arrow
    if (skillPoint[lvl] == 0) {

        return name + "<br>" + allNextLevel; 

    } else if (skillPoint[lvl] == skillLevel[lvl].length) {

        return name + "<br>" + allCurrentLevel;

    } else {

        return name + "<br>" + allCurrentLevel + allNextLevel;
    }

}


function changeTheme(theme){
    document.getElementById("pagestyle").setAttribute("href", theme);  
    setCookie("style",theme);
}

function setStyleFromCookie(){
    
    var theme = getCookie("style");
    console.log("theme : " + theme);
    if (theme !=""){
        document.getElementById("pagestyle").setAttribute("href", theme); 
    }
    
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function setCookie(cname,cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log("cookie set");
  }