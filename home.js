currentlyUpdatedId = 0;

window.onload = function() {
    user = getCookie("username");

    $("#user")[0].innerText = user;

    $("#updateModal").on("hidden.bs.modal", onUpdateModalShowing);
    $("#addModal").on("hidden.bs.modal", onAddModalShowing);

    $("#update-confirm-button").click(onUpdateConfirmClick);
    //$("#add-car-button").click(onAddCarClick);
    $("#add-entity-confirm-button").click(onAddEntityConfirmClick);

    // populate the list
    populateList();
}

function populateList() {
  data = "";
  $.ajax({type: 'GET',
            url: 'home.php',
            data: {},
            success: function(data, status) {
                onEntityListResponse(data);
            }
        }
    );
}

function onAddEntityConfirmClick(ev) {
  console.log("Add button pressed");

    errors = "";

    name = $("#header1_a")[0].value;
    if(name.length === 0) {
        errors += "Header1 must be a number\n";
    }

    other_name = $("#header2_a")[0].value;
    if(other_name.length === 0) {
        errors += "Header2 must have a value\n";
    }

    if(errors.length>0) {
        alert(errors);
        return;
    }

    // send the request to the server
    newEntity = {header1: name, header2: other_name};
    console.log("new Entity:", newEntity);

    $.ajax({
        url: 'addEntity.php',
        data: {newEntity: JSON.stringify(newEntity)},
        type: 'POST',
        success: function(data) {
            // refresh the table after adding the new car, no reply
            console.log(data);
            populateList();
        },
        error: function(msg) {
            alert(JSON.parse(msg));
        }
    });
}

function onAddModalShowing() {
    console.log("Add modal showing");

    // clear fields
    $("#header1_a")[0].value = "";

    $("#header2_a")[0].value="";
}

function onUpdateModalShowing() {
    console.log("Update modal showing");

    // clear fields

    $("#header2")[0].value="";

    $("#header3")[0].value="";
}


function onEntityListResponse(data) {
    console.log("Received server response to the filter" + data);
    console.log("Map: " + JSON.parse(data));
    // insert the divs in the 'list' div
    //car_no1 = JSON.parse(data)[0];

    // build html
    var entities = JSON.parse(data);

    // ID in the row needed for the jquery selector
    var html_str = '<table class="table table-striped"> <tr> <th>Header1</th> <th>Header2</th> <th>Header3</th></tr>';

    entities.forEach(function(entity) {
        // create a line for each car returned

        // set the ID of the line to the ID of the entity
        html_str = html_str + '<tr id="' + entity[0] + '">';

        html_str = html_str + '<td>';
        html_str = html_str + entity[0];
        html_str = html_str + '</td>';

        html_str = html_str + '<td>';
        html_str = html_str + entity[1];
        html_str = html_str + '</td>';

        html_str = html_str + '<td>';
        html_str = html_str + entity[2];
        html_str = html_str + '</td>';


        // add the buttons, row with bootstrap
        var deleteButton_html = '<button type="button" class="btn btn-danger col-4" onclick="onDeleteClick('+ entity[0] + ')">Delete</button>';  // send delete request to the server
        var updateButton_html = '<button type="button" id="update-button" class="btn btn-info col-4" data-toggle="modal" data-target="#updateModal" onclick="onUpdateClick(' + entity[0] + ')">Update</button>';

        html_str = html_str + '<td class="container"> <div class="row">';
        html_str = html_str + deleteButton_html;
        html_str = html_str + updateButton_html;
        html_str = html_str + '</div> </td>';

        html_str = html_str + '</tr>';
    });

    html_str = html_str + '</table>';


    $("#entity-list").html(html_str);
}

function onDeleteClick(eid) {
  $.ajax({
      url: 'deleteEntity.php',
      data: {entityID: JSON.stringify(eid)},
      type: 'DELETE',
      success: function(data) {
          // refresh the table after adding the new car, no reply
          console.log(data);
          populateList();
      },
      error: function(msg) {
          alert(JSON.parse(msg));
      }
  });
}

function onUpdateClick(eid) {
  console.log("Updating car " + eid);
    currentlyUpdatedId = eid;

    // populate the fields
    row = $("#" + eid)[0];
    console.log(row);

    eid = row.children[0].textContent;
    $("#header1-id")[0].value = eid;
    console.log(eid);

    name = row.children[1].textContent;
    $("#header2")[0].value = name;
    console.log(name);

    other_name = row.children[2].textContent;
    $("#header3")[0].value = other_name;
    console.log(other_name);
}

function onUpdateConfirmClick(ev) {
  console.log("Update confirm button clicked");

    errors = "";

    eid = $("#header1-id")[0].value;
    if(isNaN(eid) || eid.length === 0) {
        errors += "id must be a number\n";
    }

    name = $("#header2")[0].value;
    if(name.length == 0) {
        errors += "name must have a value\n";
    }

    other_name = $("#header3")[0].value;
    if(other_name.length == 0) {
        errors += "other_name must have a value\n";
    }

    if(errors.length>0) {
        alert(errors);
        return;
    }

    // send the request to the server
    updated = {eid: eid, name : name, other_name: other_name};

    console.log("updated", updated);

    $.ajax({
        url: 'updateEntity.php',
        data: {updated: JSON.stringify(updated)},
        type: 'PUT',
        success: function(data) {
            // refresh the table after the update, no reply
            populateList();
            console.log(data);
        },
        error: function(msg) {
            alert(JSON.parse(msg));
        }
    });
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
