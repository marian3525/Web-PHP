window.onload = function() {
  console.log("loaded");
  $("#submit_button").click(onSubmitClicked);
}

function onSubmitClicked(ev) {
    // GET to the server
    // will return a username string if the data was valid, empty string otherwise
    console.log("login button clicked");

    username = $("#username")[0].value;
    password = $("#password")[0].value;

    $.ajax({
                url:"login.php",
                method:"POST",
                data: {username:username, password: password},
                success: function (data)
                {
                  console.log("server reply: ", data);

                  data = JSON.parse(data);

                  if(data != username) {
                    // not auth
                    console.log("not logged in");
                  }
                  else {
                    //user logged in
                    console.log("logged in");
                    setCookie("username", username, 1);
                    window.location.href = "home.html";
                  }
                }
            });
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
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
