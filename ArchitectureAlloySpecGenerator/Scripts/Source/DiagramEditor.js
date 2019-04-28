(function () {
    $('[data-toggle="tooltip"]').tooltip();

    // Component Table Listeners
    const componentActions = getActions("component");
    $("#add-new-component").click(function () { addNewRow(this, "component-table", componentActions, "component") });
    $(document).on("click", ".add-component", function () { addRow(this, "add-new-component", "component"); });
    $(document).on("click", ".edit-component", function () { editRow(this, "add-new-component", "component") });
    $(document).on("click", ".delete-component", function ()  { deleteRow(this, "add-new-component") });

    // Connector Table Listeners
    const connectorActions = getActions("connector");
    $("#add-new-connector").click(function () { addNewRow(this, "connector-table", connectorActions, "connector") });
    $(document).on("click", ".add-connector", function () { addRow(this, "add-new-connector", "connector"); });
    $(document).on("click", ".edit-connector", function () { editRow(this, "add-new-connector", "connector") });
    $(document).on("click", ".delete-connector", function () { deleteRow(this, "add-new-connector") });

    // Interaction Table Listeners
    const interactionActions = getActions("interaction");
    $("#add-new-interaction").click(function () { addNewRow(this, "interaction-table", interactionActions, "interaction") });
    $(document).on("click", ".add-interaction", function () { addRow(this, "add-new-interaction", "interaction"); });
    $(document).on("click", ".edit-interaction", function () { editRow(this, "add-new-interaction", "interaction") });
    $(document).on("click", ".delete-interaction", function () { deleteRow(this, "add-new-interaction") });
})();

// Add new row to table
function addNewRow(button, tableId, actions, type) {
    console.log("add new row");
    $(button).attr("disabled", "disabled");
    let index = $("#" + tableId + " tbody tr:last-child").index();
    let row = '<tr>' +
        '<td><input type="text" class="form-control" name="name" id="name"></td>' +
        '<td><input type="text" class="form-control" name="port" id="port"></td>' +
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
        let architectureElement = [];
        input.each(function () {
            $(this).parent("td").html($(this).val());
            architectureElement.push($(this).val());
        });
        addArchitectureElement(architectureElement, type);
        $(button).parents("tr").find(".add-" + type + ", .edit-" + type).toggle();
        $("#" + addNewButton).removeAttr("disabled");
    }
}

// Edit row on edit button click
function editRow(button, addNewButton, type) {
    $(button).parents("tr").find("td:not(:last-child)").each(function () {
        $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
    });
    $(button).parents("tr").find(".add-" + type + ", .edit-" + type).toggle();
    $("#" + addNewButton).attr("disabled", "disabled");
}

// Delete row on delete button click\
function deleteRow(button, addNewButton) {
    $(button).parents("tr").remove();
    $("#" + addNewButton).removeAttr("disabled");
}

function getActions(type) {
    const actions = '<td>' + 
        '<a class="add add-' + type + '" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
        '<a class="edit edit-' + type + '" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
        '<a class="delete delete-' + type + '" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>' +
        '</td>';
    return $(actions).html();
}

function addArchitectureElement(element, type) {
    const elementId = getNextElementId();
    if (type === "component") {
        const component = {
            id: elementId,
            name: element[0],
            port: element[1]
        };
        window.Diagrammer.architecturalElements.components.push(component);
    } else if (type === "connector") {
        const connector = {
            id: elementId,
            name: element[0],
            role: element[1]
        };
        window.Diagrammer.architecturalElements.connectors.push(connector);
    } else if (type === "interaction") {
        const interaction = {
            id: elementId,
            port: element[0],
            role: element[1]
        };
        window.Diagrammer.architecturalElements.interactions.push(interaction);
    }
    console.log(window.Diagrammer.architecturalElements);
}

function getNextElementId() {
    return architecturalElements.components.length + architecturalElements.connectors.length + 1;
}