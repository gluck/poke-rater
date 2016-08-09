var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

function polarToCartesian(centerX,centerY,radius,angleInDegrees) {
  var angleInRadians = (angleInDegrees + 90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function backArc(x,y,radius,startAngle,endAngle){

    var start = polarToCartesian(x,y,radius,endAngle);
    var end = polarToCartesian(x,y,radius,startAngle);

    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M",start.x, start.y, 
        "A", radius, radius, 0, arcSweep, 0, end.x, end.y
    ].join(" ");

    return d;       
}

function arcNode(x, y, radius, startAngle, endAngle, length){

    var start = polarToCartesian(x, y, radius - 3, endAngle);
    var linestart = polarToCartesian(x, y, radius - length, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", linestart.x, linestart.y, 
        "L", start.x, start.y
    ].join(" ");

    return d;       
}

function setAdvancedMode(on) {
  var elements = document.getElementsByClassName("advanced");
  for (var i = 0; i < elements.length; i++) {
    if (on) {
      elements[i].setAttribute("style", "display: block;");
    } else {
      elements[i].removeAttribute("style");
    }
  }
  var elements = document.getElementsByClassName("basic");
  for (var i = 0; i < elements.length; i++) {
    if (on) {
      elements[i].setAttribute("style", "display: none;");
    } else {
      elements[i].removeAttribute("style");
    }
  }
}


ind_attack = 7;
ind_defense = 7;
ind_stamina = 7;
user_cp = 112;
user_cp = 36;

var trainer_level_slider = document.getElementById("trainer_level");
trainer_level_slider.addEventListener("mousemove",  function(data) {
  if (trainer_level_slider.value != trainer_level) {
    drawImage();
  }
});
trainer_level_slider.addEventListener("touchmove",  function(data) {
  if (trainer_level_slider.value != trainer_level) {
    drawImage();
  }
});
trainer_level_slider.addEventListener("change", drawImage);

var pokemon_level_slider = document.getElementById("pokemon_level");
pokemon_level_slider.addEventListener("mousemove", function(data) {
  if (pokemon_level_slider.value != pokemon_level) {
    drawImage();
  }
});
pokemon_level_slider.addEventListener("touchmove", function(data) {
  if (pokemon_level_slider.value != pokemon_level) {
    drawImage();
  }
});
pokemon_level_slider.addEventListener("change", drawImage);

var pokemon_cp_slider = document.getElementById("pokemon_cp");
pokemon_cp_slider.addEventListener("mousemove", function(data) {
  if (pokemon_cp_slider.value != user_cp) {
    drawImage();
  }
});
pokemon_cp_slider.addEventListener("touchmove", function(data) {
  if (pokemon_cp_slider.value != user_cp) {
    drawImage();
  }
});
pokemon_cp_slider.addEventListener("change", drawImage);

var pokemon_hp_slider = document.getElementById("pokemon_hp");
pokemon_hp_slider.addEventListener("mousemove", function(data) {
  if (pokemon_hp_slider.value != user_hp) {
    drawImage();
  }
});
pokemon_hp_slider.addEventListener("touchmove", function(data) {
  if (pokemon_hp_slider.value != user_hp) {
    drawImage();
  }
});
pokemon_hp_slider.addEventListener("change", drawImage);

document.getElementById("pokemon_image").addEventListener("click", function() {
  openMenu();
});



window.onresize = function(event) {
  drawImage();
};

pk_id = 1;
current_hash = "";

loaded = false;

function drawImage() {

  if (window.location.hash != current_hash && !loaded) {
    loaded = true;
    if (window.location.hash.length > 1 && window.location.hash.split("#").length > 1) {
      encoded = window.location.hash.split("#")[1];
      decoded = Base64.decode(encoded);
      values = decoded.split(",");
      if (decoded.length != 0 && values.length == 5) {
        pk_id = parseInt(values[0]);

        trainer_level_slider.value = parseInt(values[1]);

        pokemon_level_slider.max = parseFloat(values[2]);
        pokemon_level_slider.value = parseFloat(values[2]);

        pokemon_cp_slider.min = parseInt(values[3]);
        pokemon_cp_slider.max = parseInt(values[3]);
        pokemon_cp_slider.value = parseInt(values[3]);

        pokemon_hp_slider.min = parseInt(values[4]);
        pokemon_hp_slider.max = parseInt(values[4]);
        pokemon_hp_slider.value = parseInt(values[5]);

        current_hash = '#'+encoded;
      }
    }
  }


  var arc = document.getElementById("arc");
  while (arc.firstChild) {
      arc.removeChild(arc.firstChild);
  }

  var trainer_level = trainer_level_slider.value;
  document.getElementById("trainer_level_label").innerHTML = trainer_level;
  document.getElementById("exp_req_label").innerHTML = exp_req[[trainer_level-1]];
  pokemon_level_slider.max = Math.min(parseInt(trainer_level) + 1.5, 40);
  pokemon_level = pokemon_level_slider.value;
  document.getElementById("pokemon_level_label").innerHTML = pokemon_level;
  document.getElementById("pokemon_ecpm_label").innerHTML = CpM[pokemon_level*2-2];
  document.getElementById("candy").innerHTML = candy[Math.floor(pokemon_level-1)];
  document.getElementById("stardust").innerHTML = stardust[Math.floor(pokemon_level-1)];
  
  updatePokemon();

  document.getElementById("pokemon_image").className = "pkm pkm" + pk_id;
  document.getElementById("pokemon_name").innerHTML = pokemon[pk_id].Name;

  min_cp = Math.max(Math.floor(pokemon[pk_id].BaseAttack * Math.sqrt(pokemon[pk_id].BaseDefense) * Math.sqrt(pokemon[pk_id].BaseStamina) * Math.pow(CpM[pokemon_level*2-2], 2) / 10), 10);
  max_cp = Math.max(Math.floor((pokemon[pk_id].BaseAttack+15) * Math.sqrt(pokemon[pk_id].BaseDefense+15) * Math.sqrt(pokemon[pk_id].BaseStamina+15) * Math.pow(CpM[pokemon_level*2-2], 2) / 10), 10);
  document.getElementById("min_cp").innerHTML = min_cp;
  document.getElementById("max_cp").innerHTML = max_cp;
  document.getElementById("user_min_cp").innerHTML = min_cp;
  document.getElementById("user_max_cp").innerHTML = max_cp;
  document.getElementById("pokemon_cp").min = min_cp;
  document.getElementById("pokemon_cp").max = max_cp;
  document.getElementById("cp_rank").innerHTML = pokemon[pk_id]["CP Rank"];
  document.getElementById("cp_norm").innerHTML = ((pokemon[pk_id]["CP Normalised"] - 1)*100).toPrecision(3);

  user_cp = parseInt(document.getElementById("pokemon_cp").value);
  document.getElementById("pokemon_cp_label").innerHTML = user_cp;


  min_hp = Math.max(Math.floor((pokemon[pk_id].BaseStamina) * CpM[pokemon_level*2-2]), 10);
  max_hp = Math.max(Math.floor((pokemon[pk_id].BaseStamina+15) * CpM[pokemon_level*2-2]), 10);
  document.getElementById("min_hp").innerHTML = min_hp;
  document.getElementById("max_hp").innerHTML = max_hp;
  document.getElementById("user_min_hp").innerHTML = min_hp;
  document.getElementById("user_max_hp").innerHTML = max_hp;
  document.getElementById("pokemon_hp").min = min_hp;
  document.getElementById("pokemon_hp").max = max_hp;
  document.getElementById("hp_rank").innerHTML = pokemon[pk_id]["HP Rank"];
  document.getElementById("hp_norm").innerHTML = ((pokemon[pk_id]["HP Normalised"] - 1)*100).toPrecision(3);

  user_hp = parseInt(document.getElementById("pokemon_hp").value);
  document.getElementById("pokemon_hp_label").innerHTML = user_hp;

  if (pokemon[pk_id].Type2 == "None")
    types = pokemon[pk_id].Type1;
  else
    types = pokemon[pk_id].Type1 + " / " + pokemon[pk_id].Type2;
  document.getElementById("types").innerHTML = types;


  total_attack = pokemon[pk_id].BaseAttack + ind_attack;
  total_defense = pokemon[pk_id].BaseDefense + ind_defense;
  total_stamina = pokemon[pk_id].BaseStamina + ind_stamina;

  var total_attacks = document.getElementsByClassName("total_attack");
  for (var i = 0; i < total_attacks.length; i++) {
    total_attacks[i].innerHTML = total_attack;
  }
  var total_defenses = document.getElementsByClassName("total_defense");
  for (var i = 0; i < total_defenses.length; i++) {
    total_defenses[i].innerHTML = total_defense;
  }
  var total_staminas = document.getElementsByClassName("total_stamina");
  for (var i = 0; i < total_staminas.length; i++) {
    total_staminas[i].innerHTML = total_stamina;
  }

  calc_cp = total_attack * Math.sqrt(total_defense) * Math.sqrt(total_stamina) * Math.pow(CpM[pokemon_level*2-2], 2) / 10;
  rounded_calc_cp = Math.max(Math.floor(calc_cp), 10);

  calc_hp = total_stamina * CpM[pokemon_level*2-2];
  rounded_calc_hp = Math.max(Math.floor(calc_hp), 10);

  width = document.getElementById("arc_section").offsetWidth;

  arc.setAttribute('width', width + "px");
  arc.setAttribute('height', (width / 2 + 8) + "px");

  for (var i = 0; i < Math.min((trainer_level) * 2 + 2, 79); i++) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    if ((i/2 + 1) % 10 == 0) {
      path.setAttribute("stroke", "hsla(0, 0%, 100%, .2)");
      length = 50;
    } else if ((i/2 + 1) % 1 == 0) {
      path.setAttribute("stroke", "hsla(0, 0%, 100%, .2)");
      length = 30;
    } else {
      path.setAttribute("stroke", "hsla(0, 0%, 100%, .2)");
      length = 10;
    }
    path.setAttribute("fill", "hsla(0, 0%, 0%, 0)");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("d", arcNode(width/2, width/2, width/2-40, 90, 90 + ((CpM[i]-0.094)*202.037116/CpM[trainer_level*2-2]), length));
    arc.appendChild(path);
  }
  
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", "hsla(0, 0%, 100%, .2)");
  path.setAttribute("fill", "hsla(0, 0%, 0%, 0)");
  path.setAttribute("stroke-width", "4");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("d", backArc(width/2, width/2, width/2-40, 90, 270) );
  arc.appendChild(path);
  
  var start = polarToCartesian(width/2, width/2, width/2-40, 90 + ((CpM[pokemon_level*2-2]-0.094)*202.037116/CpM[trainer_level*2-2]));

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", "hsla(0, 0%, 100%, 1)");
  path.setAttribute("fill", "hsla(0, 0%, 0%, 0)");
  path.setAttribute("stroke-width", "4");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("d", backArc(width/2, width/2, width/2-40, 90, 90 + ((CpM[pokemon_level*2-2]-0.094)*202.037116/CpM[trainer_level*2-2])) );
  arc.appendChild(path);
  
  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("stroke", "hsla(0, 0%, 0%, 0)");
  circle.setAttribute("fill", "hsla(0, 0%, 100%, 1)");
  circle.setAttribute("stroke-width", "0");
  circle.setAttribute("cx", start.x);
  circle.setAttribute("cy", start.y);
  circle.setAttribute("r", "8");
  arc.appendChild(circle);
  
  // cry = new Audio('audio/pv' + pk_id + '.wav');

  var cp_results = document.getElementById("cp_results");
  while (cp_results.firstChild) {
      cp_results.removeChild(cp_results.firstChild);
  }

  card_width = document.getElementById("cp_results_cont").offsetWidth;
  cp_results.setAttribute('width', card_width + "px");

  mobile_vert_offset = 60;

  if (card_width < 450) {
    cp_results.setAttribute('height', "220px");
  } else {
    cp_results.setAttribute('height', "160px");
  }

  cr_center_y = 50.5;
  cr_line_offset = 30.5;
  cr_min_x = cr_line_offset;
  cr_max_x = card_width - cr_line_offset;

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("stroke-width", "1");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("d", ["M", cr_min_x, cr_center_y, "L", cr_max_x, cr_center_y].join(" ") );
  cp_results.appendChild(path);


  // min cp


  function cr_cp_x(cp) {
    return (cr_max_x - cr_min_x) / (max_cp - min_cp) * ( parseInt(cp) - min_cp) + cr_min_x;
  } 

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("stroke-width", "1");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("d", ["M", cr_min_x, cr_center_y + 10, "L", cr_min_x, cr_center_y - 10].join(" ") );
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "CP";
  path.setAttribute("font-size", "10px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("x", cr_min_x);
  path.setAttribute("y", cr_center_y + 30);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
    var subpath = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    subpath.innerHTML = min_cp;
    subpath.setAttribute("font-size", "14px");
    path.appendChild(subpath);
  cp_results.appendChild(path);  

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "MIN for";
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("x", cr_min_x);
  path.setAttribute("y", cr_center_y + 45);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "Level " + pokemon_level;
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("x", cr_min_x);
  path.setAttribute("y", cr_center_y + 58);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  // max cp

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("stroke-width", "1");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("d", ["M", cr_max_x, cr_center_y + 10, "L", cr_max_x, cr_center_y - 10].join(" ") );
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "CP";
  path.setAttribute("font-size", "10px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("x", cr_max_x);
  path.setAttribute("y", cr_center_y + 30);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
    var subpath = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    subpath.innerHTML = max_cp;
    subpath.setAttribute("font-size", "14px");
    path.appendChild(subpath);
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "MAX for";
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("x", cr_max_x);
  path.setAttribute("y", cr_center_y + 45);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "Level " + pokemon_level;
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("x", cr_max_x);
  path.setAttribute("y", cr_center_y + 58);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  // document.getElementById("cp_resutls_output").src = cp_results.toDataURL("image/png");
  for (var i = min_cp + 1; i < max_cp; i++) {
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("stroke", "hsla(0, 0%, 0%, .33)");
      path.setAttribute("stroke-width", "1");
      path.setAttribute("stroke-linecap", "round");
    if (i % 10 == 0) {
      path.setAttribute("d", ["M", cr_cp_x(i), cr_center_y + 5, "L", cr_cp_x(i), cr_center_y - 5].join(" ") );
    } else if (max_cp - min_cp < (cr_max_x - cr_min_x) / 4){
      path.setAttribute("d", ["M", cr_cp_x(i), cr_center_y + 2, "L", cr_cp_x(i), cr_center_y - 2].join(" ") );
    }
      cp_results.appendChild(path);
  }

  min_est_total_stamina = (user_hp) / CpM[pokemon_level*2-2];
  est_total_stamina = (user_hp + 0.5) / CpM[pokemon_level*2-2];
  max_est_total_stamina = (user_hp + 1) / CpM[pokemon_level*2-2];
  // est_ind_stamina = est_total_stamina - pokemon[pk_id].BaseStamina;
  min_br_cp = Math.max(Math.max(Math.floor(pokemon[pk_id].BaseAttack * Math.sqrt(pokemon[pk_id].BaseDefense) * Math.sqrt(min_est_total_stamina) * Math.pow(CpM[pokemon_level*2-2], 2) / 10), 10), min_cp);
  max_br_cp = Math.min(Math.max(Math.floor((pokemon[pk_id].BaseAttack + 15) * Math.sqrt(pokemon[pk_id].BaseDefense + 15) * Math.sqrt(max_est_total_stamina) * Math.pow(CpM[pokemon_level*2-2], 2) / 10), 10), max_cp);
  
  per_diff_cp = (-1 + (user_cp+0.5) / ((pokemon[pk_id].BaseAttack + 7.5) * Math.sqrt(pokemon[pk_id].BaseDefense + 7.5) * Math.sqrt(pokemon[pk_id].BaseStamina + 7.5) * Math.pow(CpM[pokemon_level*2-2], 2) / 10)) * 100;
  per_diff_sta = (-1 + (user_hp+0.5) / ((pokemon[pk_id].BaseStamina + 7.5) * CpM[pokemon_level*2-2])) * 100;
  per_diff_br = (-1 + (user_cp+0.5) / ((pokemon[pk_id].BaseAttack + 7.5) * Math.sqrt(pokemon[pk_id].BaseDefense + 7.5) * Math.sqrt(est_total_stamina) * Math.pow(CpM[pokemon_level*2-2], 2) / 10)) * 100;
  
  rating_cp = (user_cp - min_cp) / (max_cp - min_cp) * 100;
  rating_sta = (user_hp - min_hp) / (max_hp - min_hp) * 100;
  rating_br = (user_cp - min_br_cp) / (max_br_cp - min_br_cp) * 100;
 

  // var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // path.setAttribute("stroke", "hsla(200, 50%, 50%, 1)");
  // path.setAttribute("stroke-width", "1");
  // path.setAttribute("stroke-linecap", "round");
  // path.setAttribute("fill", "none");
  // path.setAttribute("d", ["M", (cr_max_x - cr_min_x) * .75 + cr_min_x, cr_center_y, "L", (cr_max_x - cr_min_x) * .75 + cr_min_x, cr_center_y + 30].join(" ") );
  // cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  path.setAttribute("x", cr_cp_x(min_br_cp));
  path.setAttribute("y", cr_center_y - 7.5);  
  path.setAttribute("width", cr_cp_x(max_br_cp) - cr_cp_x(min_br_cp));
  path.setAttribute("height", 15);
  path.setAttribute("fill", "hsl(200, 50%, 50%)");
  cp_results.appendChild(path);


  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "POSS. CP RANGE INFLUENCED BY HP";
  path.setAttribute("font-size", "10px");
  path.setAttribute("fill", "hsla(0, 0%, 100%, 1)");
  path.setAttribute("x", (cr_cp_x(min_br_cp) + cr_cp_x(max_br_cp)) / 2);
  path.setAttribute("y", cr_center_y + 3);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  // var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // path.setAttribute("stroke", "hsla(200, 50%, 30%, 1)");
  // path.setAttribute("stroke-width", "1");
  // path.setAttribute("stroke-linecap", "round");
  // path.setAttribute("d", ["M", cr_cp_x(min_br_cp), cr_center_y + 7, "L", cr_cp_x(min_br_cp), cr_center_y - 7].join(" ") );
  // cp_results.appendChild(path);

  // var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // path.setAttribute("stroke", "hsla(200, 50%, 30%, 1)");
  // path.setAttribute("stroke-width", "1");
  // path.setAttribute("stroke-linecap", "round");
  // path.setAttribute("d", ["M", cr_cp_x(max_br_cp), cr_center_y + 7, "L", cr_cp_x(max_br_cp), cr_center_y - 7].join(" ") );
  // cp_results.appendChild(path);


  // actual cp

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "CP";
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("font-weight", "bold");
  path.setAttribute("x", cr_cp_x(user_cp));
  path.setAttribute("y", cr_center_y - 25);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
    var subpath = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    subpath.innerHTML = user_cp;
    subpath.setAttribute("font-size", "16px");
    path.appendChild(subpath);
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("stroke-width", "1");
  // path.setAttribute("stroke-linecap", "round");
  path.setAttribute("d", ["M", cr_cp_x(user_cp), cr_center_y - 10, "L", cr_cp_x(user_cp) + 10, cr_center_y - 20, cr_cp_x(user_cp) - 10, cr_center_y - 20].join(" ") );
  cp_results.appendChild(path);

  // var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // path.setAttribute("stroke", "hsla(0, 0%, 0%, .66)");
  // path.setAttribute("stroke-width", "1");
  // path.setAttribute("stroke-linecap", "round");
  // path.setAttribute("fill", "none");
  // path.setAttribute("d", ["M", cr_cp_x(user_cp), cr_center_y + 15, "L", (cr_max_x - cr_min_x) * .25 + cr_min_x, cr_center_y + 15, (cr_max_x - cr_min_x) * .25 + cr_min_x, cr_center_y + 30].join(" ") );
  // cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = rating_br.toPrecision(3) + "%";
  path.setAttribute("font-size", "16px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("font-weight", "bold");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .25 + cr_min_x);
  if (card_width < 450) {
    path.setAttribute("y", cr_center_y + 45 + mobile_vert_offset);
  } else {
    path.setAttribute("y", cr_center_y + 45);
  }
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "BATTLE RATING";
  path.setAttribute("font-size", "14px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .25 + cr_min_x);
  if (card_width < 450) {
    path.setAttribute("y", cr_center_y + 62 + mobile_vert_offset);
  } else {
    path.setAttribute("y", cr_center_y + 62);
  }
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "Attack & Defense";
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .25 + cr_min_x);
  if (card_width < 450) {
    path.setAttribute("y", cr_center_y + 78 + mobile_vert_offset);
  } else {
    path.setAttribute("y", cr_center_y + 78);
  }
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = (per_diff_br > 0?"+":"") + per_diff_br.toPrecision(3) + "% from avg";
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .25 + cr_min_x);
  if (card_width < 450) {
    path.setAttribute("y", cr_center_y + 94 + mobile_vert_offset);
  } else {
    path.setAttribute("y", cr_center_y + 94);
  }
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);




  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = rating_cp.toPrecision(3) + "%";
  path.setAttribute("font-size", "16px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("font-weight", "bold");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .5 + cr_min_x);
  path.setAttribute("y", cr_center_y + 45);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "CP RATING";
  path.setAttribute("font-size", "14px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .5 + cr_min_x);
  path.setAttribute("y", cr_center_y + 62);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "All stats";
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .5 + cr_min_x);
  path.setAttribute("y", cr_center_y + 78);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = (per_diff_cp > 0?"+":"") + per_diff_cp.toPrecision(3) + "% from avg";
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .5 + cr_min_x);
  path.setAttribute("y", cr_center_y + 94);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);








  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = rating_sta.toPrecision(3) + "%";
  path.setAttribute("font-size", "16px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("font-weight", "bold");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .75 + cr_min_x);
  if (card_width < 450) {
    path.setAttribute("y", cr_center_y + 45 + mobile_vert_offset);
  } else {
    path.setAttribute("y", cr_center_y + 45);
  }
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "HP RATING";
  path.setAttribute("font-size", "14px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .75 + cr_min_x);
  if (card_width < 450) {
    path.setAttribute("y", cr_center_y + 62 + mobile_vert_offset);
  } else {
    path.setAttribute("y", cr_center_y + 62);
  }
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "Stamina";
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .75 + cr_min_x);
  if (card_width < 450) {
    path.setAttribute("y", cr_center_y + 78 + mobile_vert_offset);
  } else {
    path.setAttribute("y", cr_center_y + 78);
  }
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);


  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = (per_diff_sta > 0?"+":"") + per_diff_sta.toPrecision(3) + "% from avg";
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .75 + cr_min_x);
  if (card_width < 450) {
    path.setAttribute("y", cr_center_y + 94 + mobile_vert_offset);
  } else {
    path.setAttribute("y", cr_center_y + 94);
  }
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  encoded = Base64.encode(pk_id + "," + trainer_level_slider.value + "," + pokemon_level_slider.value + "," + pokemon_cp_slider.value + "," + pokemon_hp_slider.value);
  if(history.replaceState) {
      history.replaceState(null, null, '#'+encoded);
  } else {
      location.hash = '#'+encoded;
  }
}

types_symbol_lookup = {
"Normal": 6,
"Fighting": 9,
"Flying": 3,
"Poison": 1,
"Ground": 8,
"Rock": 11,
"Bug": 5,
"Ghost": 14,
"Steel": 12,
"Fire": 2,
"Water": 4,
"Grass": 0,
"Electric": 7,
"Psychic": 10,
"Ice": 13,
"Dragon": 15,
"Dark": 16,
"Fairy": 17
};

types_text_lookup = {
"Normal": "black",
"Fighting": "black",
"Flying": "black",
"Poison": "black",
"Ground": "black",
"Rock": "black",
"Bug": "black",
"Ghost": "black",
"Steel": "black",
"Fire": "black",
"Water": "black",
"Grass": "black",
"Electric": "black",
"Psychic": "black",
"Ice": "black",
"Dragon": "white",
"Dark": "black",
"Fairy": "black"
};

var img = new Image();
img.src = 'img/pkm_full.png';

function bestGuess() {
  var stamina;
  for (stamina = 0; stamina < 16; stamina++) {
    if (Math.floor((pokemon[pk_id].BaseStamina + stamina) * CpM[pokemon_level*2-2]) == user_hp) {
      break;
    }
  }
  possible_attacks = [];
  possible_defenses = [];
  for (var attack = 0; attack < 16; attack++) {
    for (var defense = 0; defense < 16; defense++) {
      if (Math.max(Math.floor((pokemon[pk_id].BaseAttack + attack)*Math.sqrt(pokemon[pk_id].BaseDefense + defense)*Math.sqrt(pokemon[pk_id].BaseStamina + stamina)*Math.pow(CpM[pokemon_level*2-2],2)/10), 10) == user_cp) {
        possible_attacks.push(attack);
        possible_defenses.push(defense);
      }
    }
  }
}

function updatePokemon() {
  good_against = {}
  bad_against = {}
  resistance = {}
  attack_array1 = attack_matrix[types_lookup[pokemon[pk_id].Type1]];
  defense_array1 = defense_matrix[types_lookup[pokemon[pk_id].Type1]];

  if (pokemon[pk_id].Type2 == "None") {
    for (var i = 0; i < attack_array1.length; i++) {
      if (attack_array1[i] > 1) {
        good_against[types_dict[i]] = attack_array1[i];
      }
      if (defense_array1[i] > 1) {
        bad_against[types_dict[i]] = defense_array1[i];
      }
      if (defense_array1[i] < 1) {
        resistance[types_dict[i]] = defense_array1[i];
      }
    }
  } else {
    attack_array2 = attack_matrix[types_lookup[pokemon[pk_id].Type2]];
    defense_array2 = defense_matrix[types_lookup[pokemon[pk_id].Type2]];
    for (var i = 0; i < attack_array1.length; i++) {
      if (attack_array1[i] > 1 || attack_array2[i] > 1) {
        good_against[types_dict[i]] = Math.max(attack_array1[i], attack_array2[i]);
      }
      if (defense_array1[i] * defense_array2[i] > 1) {
        bad_against[types_dict[i]] = defense_array1[i] * defense_array2[i];
      }
      if (defense_array1[i] * defense_array2[i] < 1) {
        resistance[types_dict[i]] = defense_array1[i] * defense_array2[i];
      }
    }
  }

  quick_moves = [];
  for (var i = 0; i < pokemon[pk_id].QuickMoves.length; i++) {
    var temp_move = JSON.parse(JSON.stringify(moves[pokemon[pk_id].QuickMoves[i]]));
    if (temp_move.Type == pokemon[pk_id].Type1 || temp_move.Type == pokemon[pk_id].Type2)
      temp_move.DPS *= 1.25;
    temp_move.Id = pokemon[pk_id].QuickMoves[i];
    quick_moves[quick_moves.length] = temp_move;
  }
  cinematic_moves = [];
  for (var i = 0; i < pokemon[pk_id].CinematicMoves.length; i++) {
    var temp_move = JSON.parse(JSON.stringify(moves[pokemon[pk_id].CinematicMoves[i]]));
    if (temp_move.Type == pokemon[pk_id].Type1 || temp_move.Type == pokemon[pk_id].Type2)
      temp_move.DPS *= 1.25;
    temp_move.Id = pokemon[pk_id].CinematicMoves[i];
    cinematic_moves[cinematic_moves.length] = temp_move;
  }

  moves_bad_against = [];
  for (var type in bad_against) {
    for(var i in moves) {
      if (moves[i].Type == type) {
        temp_move = JSON.parse(JSON.stringify(moves[i]));
        temp_move.DPS *= bad_against[type];
        moves_bad_against[moves_bad_against.length] = temp_move;
      }
    }
  }

  function compare_moves(a,b) {
    if (a.DPS > b.DPS)
      return -1;
    if (a.DPS < b.DPS)
      return 1;
    return 0;
  }

  moves_bad_against.sort(compare_moves);
  all_moves = quick_moves.concat(cinematic_moves);
  quick_moves.sort(compare_moves);
  cinematic_moves.sort(compare_moves);
  all_moves.sort(compare_moves);

  var type_good_against_label = document.getElementById("type_good_against");
  while (type_good_against_label.firstChild) {
      type_good_against_label.removeChild(type_good_against_label.firstChild);
  }
  var type_bad_against_label = document.getElementById("type_bad_against");
  while (type_bad_against_label.firstChild) {
      type_bad_against_label.removeChild(type_bad_against_label.firstChild);
  }
  for (var type in good_against) {
    var type_label = document.createElement("div");
    type_label.className = "type_comp " + type;
    type_label.innerHTML = type + " <span>x" + good_against[type].toPrecision(3) + "</span>";
    type_good_against_label.appendChild(type_label);
  }
  for (var type in bad_against) {
    var type_label = document.createElement("div");
    type_label.className = "type_comp " + type;
    type_label.innerHTML = type + " <span>x" + bad_against[type].toPrecision(3) + "</span>";
    type_bad_against_label.appendChild(type_label);
  }

  var moves_best_label = document.getElementById("moves_best");
  while (moves_best_label.firstChild) {
      moves_best_label.removeChild(moves_best_label.firstChild);
  }

  // for (var i in quick_moves) {
  //   var move_label = document.createElement("div");
  //   move_label.className = "move " + quick_moves[i].Type;
  //   move_label.innerHTML = quick_moves[i].Name + "<span class='power'>" + quick_moves[i].Power + "</span><span class='DPS'>" + quick_moves[i].DPS.toPrecision(3) + " DPS</span>";
  //   moves_best_label.appendChild(move_label);
  // }  
  // moves_best_label.appendChild(document.createElement("hr"));
  // for (var i in cinematic_moves) {
  //   var move_label = document.createElement("div");
  //   move_label.className = "move " + cinematic_moves[i].Type;
  //   move_label.innerHTML = cinematic_moves[i].Name + "<span class='power'>" + cinematic_moves[i].Power + "</span><span class='DPS'>" + cinematic_moves[i].DPS.toPrecision(3) + " DPS</span>";
  //   moves_best_label.appendChild(move_label);
  // }
  for (var i in all_moves) {
    var move_label = document.createElement("div");
    move_label.className = "move " + all_moves[i].Type;
    var fast = "";
    if (all_moves[i].Speed == "Fast")
      fast = " (fast)";
    move_label.innerHTML = "<input type='checkbox' id='"+all_moves[i].Id+"-move' class='move-check' /> " + all_moves[i].Name + fast + "<span class='power'>" + all_moves[i].Power + "</span><span class='DPS'>" + all_moves[i].DPS.toPrecision(3) + makeFraction("PWR", "SEC", "Power per Second") + "</span>";
    moves_best_label.appendChild(move_label);
    document.getElementById(all_moves[i].Id+"-move").addEventListener("change", drawImage);
  } 

  var moves_best_against_label = document.getElementById("moves_best_against");
  while (moves_best_against_label.firstChild) {
      moves_best_against_label.removeChild(moves_best_against_label.firstChild);
  }
  for (var i = 0; i < all_moves.length; i++) {
    var move_label = document.createElement("div");
    move_label.className = "move " + moves_bad_against[i].Type;
    move_label.innerHTML = moves_bad_against[i].Name + "<span class='power'>" + moves_bad_against[i].Power + "</span><span class='DPS'>" + moves_bad_against[i].DPS.toPrecision(3) + makeFraction("PWR", "SEC", "Power per Second") + "</span>";
    moves_best_against_label.appendChild(move_label);
  }

  var pokemon_good_against_label = document.getElementById("pokemon_good_against");
  while (pokemon_good_against_label.firstChild) {
      pokemon_good_against_label.removeChild(pokemon_good_against_label.firstChild);
  }
  var pokemon_worst_against_label = document.getElementById("pokemon_worst_against");
  while (pokemon_worst_against_label.firstChild) {
      pokemon_worst_against_label.removeChild(pokemon_worst_against_label.firstChild);
  }
  // for (var i = 1; i < pokemon.length; i++) {
  //   for (var type in good_against) {
  //     if (pokemon[i].Type1 == type || pokemon[i].Type2 == type) {
  //       pokemon_good_against[pokemon_good_against.length] = pokemon[i];
  //     }
  //   }
  // }

  best_move_dps = 0;
  for (var i in pokemon_x_moves) {
    if (pokemon_x_moves[i].Id == pk_id) {
      best_move_dps = Math.max(pokemon_x_moves[i].DPS, best_move_dps);
    }
  }

  var pokemon_good_against = [];
  var pokemon_worst_against = [];
  for (var i in pokemon_x_moves) {
    if (pokemon[pk_id].Type1 == "Normal" && pokemon[pk_id].Type2 == "None" && best_move_dps > pokemon_x_moves[i].DPS) {
        pokemon_good_against[pokemon_good_against.length] = pokemon_x_moves[i];
    } else {
      for (var type in good_against) {
        if ((pokemon_x_moves[i].Type1 == type || pokemon_x_moves[i].Type2 == type) && best_move_dps > pokemon_x_moves[i].DPS) {
          pokemon_good_against[pokemon_good_against.length] = pokemon_x_moves[i];
        }
      }
    }
    for (var type in bad_against) {
      if (pokemon_x_moves[i].Move.Type == type) {
        pkmv = JSON.parse(JSON.stringify(pokemon_x_moves[i]));
        pkmv.DPS *= bad_against[type];
        pokemon_worst_against[pokemon_worst_against.length] = pkmv;
      }
    }
  }

  for (var i = 0; i < Math.min(10, pokemon_good_against.length); i++) {
    var mon = document.createElement("div");
    mon.className = "move " + pokemon_good_against[i].Move.Type;
    mon.innerHTML = pokemon_good_against[i].Name + " with " + pokemon_good_against[i].Move.Name + "<span class='DPS'>" + parseInt(pokemon_good_against[i].DPS) + makeFraction("AP", "SEC", "Attack-Power per Second") +"</span>";
    pokemon_good_against_label.appendChild(mon);
  }
  for (var i = 0; i < Math.min(10, pokemon_worst_against.length); i++) {
    var mon = document.createElement("div");
    mon.className = "move " + pokemon_worst_against[i].Move.Type;
    mon.innerHTML = pokemon_worst_against[i].Name + " with " + pokemon_worst_against[i].Move.Name + "<span class='DPS'>" + parseInt(pokemon_worst_against[i].DPS) + makeFraction("AP", "SEC", "Attack-Power per Second") +"</span>";
    pokemon_worst_against_label.appendChild(mon);
  }


}


var pokemon_selector = document.getElementById("pokemon_selector");
for (var i = 1; i <= 151; i++) {
  var pk = document.createElement("div");
  pk.className = "pkm pokemon pkm" + i;
  pk.id = i+"pkm";
  pk.addEventListener("click", function(data) {
    closeMenu(parseInt(data.target.id));
  });
  pokemon_selector.appendChild(pk);
}


function openMenu() {
  pokemon_selector.setAttribute("style", "display: block");
}

function closeMenu(pk) {
  pokemon_selector.removeAttribute("style");
  pk_id = pk;
  drawImage();
}

function makeFraction(top, bottom, title) {
  return "<span class='fraction' title='" + title + "'><span class='top'>" + top + "</span><span class='bottom'>" + bottom + "</span></span>";
}


function compare_pokemon_x_move(a,b) {
  if (a.DPS > b.DPS)
    return -1;
  if (a.DPS < b.DPS)
    return 1;
  return 0;
}

pokemon_x_moves = [];
for (var i = 1; i < pokemon.length; i++) {
  for (var move_id in pokemon[i].QuickMoves) {
    var pk = JSON.parse(JSON.stringify(pokemon[i]));
    pk.Move = JSON.parse(JSON.stringify(moves[pk.QuickMoves[move_id]]));
    pk.DPS = pk.Move.DPS * (pk.BaseAttack + 7.5);
    if (pk.Move.Type == pk.Type1 || pk.Move.Type == pk.Type2)
      pk.DPS *= 1.25;
    pokemon_x_moves[pokemon_x_moves.length] = pk;
  }
  for (var move_id in pokemon[i].CinematicMoves) {
    var pk = JSON.parse(JSON.stringify(pokemon[i]));
    pk.Move = JSON.parse(JSON.stringify(moves[pk.CinematicMoves[move_id]]));
    pk.DPS = pk.Move.DPS * (pk.BaseAttack + 7.5);
    if (pk.Move.Type == pk.Type1 || pk.Move.Type == pk.Type2)
      pk.DPS *= 1.25;
    pokemon_x_moves[pokemon_x_moves.length] = pk;
  }
}

pokemon_x_moves.sort(compare_pokemon_x_move);
// for (var i in pokemon_x_moves) {
//   console.log(pokemon_x_moves[i].Name + " with " + pokemon_x_moves[i].Move.Name + "\t" + pokemon_x_moves[i].DPS);
// }


function uploadImage() {
  document.getElementById("upload_image").disabled = true;
  document.getElementById("upload_image").innerHTML = "Uploading";
  try {
      var img = document.getElementById('playing_card').toDataURL('image/png').split(',')[1];
  } catch(e) {
      var img = document.getElementById('playing_card').toDataURL().split(',')[1];
  }


  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
      document.getElementById("upload_image").disabled = false;
      document.getElementById("upload_image").innerHTML = "Upload to imgur";
      var response = JSON.parse(xmlhttp.responseText);
      if (xmlhttp.status == 200) {
        document.getElementById("imgur_link").value = response.data.link;
      } else if (xmlhttp.status == 400) {
        document.getElementById("imgur_link").value = "There was an error uploading the image.";
        console.log("There was an error uploading the image.");
      } else {
        console.log("IDK.");
      }
    }
  };

  xmlhttp.open("POST", "https://api.imgur.com/3/image", true);
  xmlhttp.setRequestHeader('Authorization', 'Client-ID 5758d0465f9014d');
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.send(JSON.stringify({ image: img }));

  // $.ajax({
  //     url: 'https://api.imgur.com/3/image',
  //     type: 'post',
  //     headers: {
  //         Authorization: 'Client-ID 5758d0465f9014d'
  //     },
  //     data: {
  //         image: img
  //     },
  //     dataType: 'json',
  //     success: function(response) {
  //         if(response.success) {
  //         }
  //     }
  // });
}


drawImage();