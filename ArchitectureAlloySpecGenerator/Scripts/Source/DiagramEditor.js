(function () {
    $('[data-toggle="tooltip"]').tooltip();

    // Component Table Listeners
    $("#add-new-component").click(function () { addNewRow(this, "component-table", "component") });
    $(document).on("click", ".add-component", function () { addRow(this, "add-new-component", "component") });
    $(document).on("click", ".edit-component", function () { editRow(this, "add-new-component", "component") });
    $(document).on("click", ".delete-component", function ()  { deleteRow(this, "add-new-component") });

    // Port Table Listeners
    $("#add-new-port").click(function () { addNewRow_RolePort(this, "port-table", "port") });
    $(document).on("click", ".add-port", function () { addRow_RolePort(this, "add-new-port", "port"); });
    $(document).on("click", ".edit-port", function () { editRow_RolePort(this, "add-new-port", "port") });
    $(document).on("click", ".delete-port", function () { deleteRow(this, "add-new-port") });

    // Connector Table Listeners
    $("#add-new-connector").click(function () { addNewRow(this, "connector-table", "connector") });
    $(document).on("click", ".add-connector", function () { addRow(this, "add-new-connector", "connector"); });
    $(document).on("click", ".edit-connector", function () { editRow(this, "add-new-connector", "connector") });
    $(document).on("click", ".delete-connector", function () { deleteRow(this, "add-new-connector") });

    // Role Action Listeners
    $("#add-new-role").click(function () { addNewRow_RolePort(this, "role-table", "role") });
    $(document).on("click", ".add-role", function () { addRow_RolePort(this, "add-new-role", "role"); });
    $(document).on("click", ".edit-role", function () { editRow_RolePort(this, "add-new-role", "role") });
    $(document).on("click", ".delete-role", function () { deleteRow(this, "add-new-role") });

    // Interaction Table Listeners
    $("#add-new-interaction").click(function () { addNewRow_Interaction(this, "interaction-table", "interaction") });
    $(document).on("click", ".add-interaction", function () { addRow_Interaction(this, "add-new-interaction", "interaction"); });
    $(document).on("click", ".edit-interaction", function () { editRow_Interaction(this, "add-new-interaction", "interaction") });
    $(document).on("click", ".delete-interaction", function () { deleteRow(this, "add-new-interaction") });
})();

// Add new row to table
function addNewRow(button, tableId, actions, type) {
    console.log("add new row");
    const actions = getActions(type);
    $(button).attr("disabled", "disabled");
    let index = $("#" + tableId + " tbody tr:last-child").index();
    let row = '<tr>' +
        '<td>' + getNextElementId() + '</td>' +
        '<td><input type="text" class="form-control" name="name" id="name"></td>' +
        '<td>' + actions + '</td>' +
        '</tr>';
    $("#" + tableId).append(row);
    $("#" + tableId + " tbody tr").eq(index + 1).find(".add-" + type + ", .edit-" + type).toggle();
    $('[data-toggle="tooltip"]').tooltip();
}

// Add row on add button click
function addRow(button, addNewButton, type) {
    var empty = false;
    var input = $(button).parents("tr").find('input[type="text"]');
    console.log(input);
    input.each(function () {
        console.log($(input).val());
        if (!$(this).val()) {
            $(this).addClass("error");
            empty = true;
        } else {
            $(this).removeClass("error");
        }
    });
    $(button).parents("tr").find(".error").first().focus();
    if (!empty) {
        input.each(function () {
            $(this).parent("td").html($(this).val());
        });
        $(button).parents("tr").find(".add-" + type + ", .edit-" + type).toggle();
        $("#" + addNewButton).removeAttr("disabled");
    }
}

// Edit row on edit button click
function editRow(button, addNewButton, type) {
    $(button).parents("tr").find("td:nth-child(2)").html('<input type="text" class="form-control" value="' + $(this).text() + '">');
    $(button).parents("tr").find(".add-" + type + ", .edit-" + type).toggle();
    $("#" + addNewButton).attr("disabled", "disabled");
}

// Delete row on delete button click\
function deleteRow(button, addNewButton) {
    $(button).parents("tr").remove();
    $("#" + addNewButton).removeAttr("disabled");
}

// Roles and ports 
function addNewRow_RolePort(button, tableId, type) {
    const actions = getActions(type);
    $(button).attr("disabled", "disabled");
    let index = $("#" + tableId + " tbody tr:last-child").index();
    let row = '<tr>' +
        '<td>' + getNextElementId() + '</td>' +
        '<td><input type="text" class="form-control" name="name" id="name"></td>' +
        '<td><select class="form-control ' + type + '-options"></select></td>' +
        '<td>' + actions + '</td>' +
        '</tr>';
    $("#" + tableId).append(row);
    updateAllOptions();
    $("#" + tableId + " tbody tr").eq(index + 1).find(".add-" + type + ", .edit-" + type).toggle();
    $('[data-toggle="tooltip"]').tooltip();
}

function addRow_RolePort(button, addNewButton, type) {
    var empty = false;
    var name = $(button).parents("tr").find('input[type="text"]');
    if (!$(name).val()) {
        $(name).addClass("error");
        empty = true;
    } else {
        $(name).removeClass("error");
    }
    $(button).parents("tr").find(".error").first().focus();
    if (!empty) {
        $(name).parent("td").html($(name).val());
        var id = $(button).parents("tr").find('select');
        $(id).parent("td").html($(id).find('option:selected').text());
        $(button).parents("tr").find(".add-" + type + ", .edit-" + type).toggle();
        $("#" + addNewButton).removeAttr("disabled");
    }
}

function editRow_RolePort(button, addNewButton, type) {
    $(button).parents("tr").find("td:nth-child(2)").html('<input type="text" class="form-control" value="' + $(this).text() + '">');
    $(button).parents("tr").find("td:nth-child(3)").html('<td><select class="form-control ' + type + '-options"></select></td>');
    updateAllOptions();
    $(button).parents("tr").find(".add-" + type + ", .edit-" + type).toggle();
    $("#" + addNewButton).attr("disabled", "disabled");
}

// Interactions
function addNewRow_Interaction(button, tableId, type) {
    const actions = getActions(type);
    $(button).attr("disabled", "disabled");
    let index = $("#" + tableId + " tbody tr:last-child").index();
    let row = '<tr>' +
        '<td><select class="form-control interaction-port-options"></select></td>' +
        '<td><select class="form-control interaction-role-options"></select></td>' +
        '<td>' + actions + '</td>' +
        '</tr>';
    $("#" + tableId).append(row);
    updateAllOptions();
    $("#" + tableId + " tbody tr").eq(index + 1).find(".add-" + type + ", .edit-" + type).toggle();
    $('[data-toggle="tooltip"]').tooltip();
}

function addRow_Interaction(button, addNewButton, type) {
    $(name).parent("td").html($(name).val());
    var ids = $(button).parents("tr").find('select');
    console.log(ids);
    ids.each(function () {
        $(this).parent("td").html($(this).find('option:selected').text());
    });
    $(button).parents("tr").find(".add-" + type + ", .edit-" + type).toggle();
    $("#" + addNewButton).removeAttr("disabled");
}

function editRow_Interaction(button, addNewButton, type) {
    $(button).parents("tr").find("td:nth-child(1)").html('<td><select class="form-control interaction-port-options"></select></td>');
    $(button).parents("tr").find("td:nth-child(2)").html('<td><select class="form-control interaction-role-options"></select></td>');
    updateAllOptions();
    $(button).parents("tr").find(".add-" + type + ", .edit-" + type).toggle();
    $("#" + addNewButton).attr("disabled", "disabled");
}

// Add, edit, delete actions broken out by type
function getActions(type) {
    const actions = '<td>' + 
        '<a class="add add-' + type + '" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
        '<a class="edit edit-' + type + '" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
        '<a class="delete delete-' + type + '" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>' +
        '</td>';
    return $(actions).html();
}

function updateAllOptions() {
    updateOptions(window.Diagrammer.architectureElements.components, "port");
    updateOptions(window.Diagrammer.architectureElements.connectors, "role");
    updateOptions(window.Diagrammer.architectureElements.ports, "interaction-port");
    updateOptions(window.Diagrammer.architectureElements.roles, "interaction-role");
}

function updateOptions(elements, type) {
    let ids = [];

    elements.forEach(function (element) {
        ids.push(element.id);
    });

    for (var i = 0; i < ids.length; i++) {
        $('<option/>').val(ids[i]).html(ids[i]).appendTo('.' + type + '-options');
    }
    console.log(ids);
}

function getNextElementId() {
    return ++id;
}