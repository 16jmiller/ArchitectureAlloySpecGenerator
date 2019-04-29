(function () {
    $('[data-toggle="tooltip"]').tooltip();

    // Component Table Listeners
    $("#add-new-component").click(function () { addNewRow(this, "component-table", "component") });
    $(document).on("click", ".add-component", function () {
        let successful = addRow(this, "add-new-component", "component");
        if (successful) addComponentConnectorElement(this, "component");
    });
    $(document).on("click", ".edit-component", function () { editRow(this, "add-new-component", "component") });
    $(document).on("click", ".delete-component", function ()  { deleteRow(this, "add-new-component", "component") });

    // Port Table Listeners
    $("#add-new-port").click(function () { addNewRow_RolePort(this, "port-table", "port") });
    $(document).on("click", ".add-port", function () {
        let successful = addRow_RolePort(this, "add-new-port", "port");
        if (successful) addRolePort(this, "port");
    });
    $(document).on("click", ".edit-port", function () { editRow_RolePort(this, "add-new-port", "port") });
    $(document).on("click", ".delete-port", function () { deleteRow(this, "add-new-port", "port") });

    // Connector Table Listeners
    $("#add-new-connector").click(function () { addNewRow(this, "connector-table", "connector") });
    $(document).on("click", ".add-connector", function () {
        let successful = addRow(this, "add-new-connector", "connector");
        if (successful) addComponentConnectorElement(this, "connector");
    });
    $(document).on("click", ".edit-connector", function () { editRow(this, "add-new-connector", "connector") });
    $(document).on("click", ".delete-connector", function () { deleteRow(this, "add-new-connector", "connector") });

    // Role Action Listeners
    $("#add-new-role").click(function () { addNewRow_RolePort(this, "role-table", "role") });
    $(document).on("click", ".add-role", function () {
        let successful = addRow_RolePort(this, "add-new-role", "role");
        if (successful) addRolePort(this, "role");
    });
    $(document).on("click", ".edit-role", function () { editRow_RolePort(this, "add-new-role", "role") });
    $(document).on("click", ".delete-role", function () { deleteRow(this, "add-new-role", "role") });

    // Interaction Table Listeners
    $("#add-new-interaction").click(function () { addNewRow_Interaction(this, "interaction-table", "interaction") });
    $(document).on("click", ".add-interaction", function () {
        addRow_Interaction(this, "add-new-interaction", "interaction");
        addInteraction(this);
    });
    $(document).on("click", ".edit-interaction", function () { editRow_Interaction(this, "add-new-interaction", "interaction") });
    $(document).on("click", ".delete-interaction", function () { deleteRow(this, "add-new-interaction") });
})();

// Add new row to table
function addNewRow(button, tableId, type) {
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
    input.each(function () {
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
        });
        $(button).parents("tr").find(".add-" + type + ", .edit-" + type).toggle();
        $("#" + addNewButton).removeAttr("disabled");
    }
    return !empty;
}

// Edit row on edit button click
function editRow(button, addNewButton, type) {
    const name = $(button).parents("tr").find("td:nth-child(2)"); 
    $(name).html('<input type="text" class="form-control" value="' + $(name).text() + '">');
    $(button).parents("tr").find(".add-" + type + ", .edit-" + type).toggle();
    $("#" + addNewButton).attr("disabled", "disabled");
}

// Delete row on delete button click\
function deleteRow(button, addNewButton, type) {
    $(button).parents("tr").remove();
    $("#" + addNewButton).removeAttr("disabled");

    if (type === "component" || type === "connector") {
        deleteComponentConnector(button, type);
    } else if (type === "role" || type === "port") {
        deleteRolePort(button, type)
    }

}

function deleteComponentConnector(button, type) {
    const id = parseInt($(button).parents("tr").find("td:nth-child(1)").text());

    if (type === "component") {
        const componentIndex = window.Diagrammer.architectureElements.components.findIndex(x => x.id === id);
        window.Diagrammer.architectureElements.components.splice(componentIndex, 1);
        console.log(window.Diagrammer.architectureElements);

        removeElementFromStage(id);
    } else if (type === "connector") {
        const connectorIndex = window.Diagrammer.architectureElements.connectors.findIndex(x => x.id === id);
        window.Diagrammer.architectureElements.connectors.splice(connectorIndex, 1);
        console.log(window.Diagrammer.architectureElements);

        removeElementFromStage(id);
    }
}

function deleteRolePort(button, type) {
    let id = $(button).parents("tr").find("td:nth-child(1)").text();
    console.log(id);

    const textKey = $(button).parents("tr").find("td:nth-child(3)").text();
    id = parseInt(fixId(id, textKey));

    if (type === "port") {
        const portIndex = window.Diagrammer.architectureElements.ports.findIndex(x => x.id === id);
        window.Diagrammer.architectureElements.ports.splice(portIndex, 1);
        console.log(window.Diagrammer.architectureElements);

        removeElementFromStage(id);
    } else if (type === "role") {
        const roleIndex = window.Diagrammer.architectureElements.roles.findIndex(x => x.id === id);
        window.Diagrammer.architectureElements.roles.splice(roleIndex, 1);
        console.log(window.Diagrammer.architectureElements);

        removeElementFromStage(id);
    }
}

function removeElementFromStage(id) {
    const element = window.Diagrammer.stage.getById(id);
    element.lines.forEach(function (lineObj) {
        window.Diagrammer.stage.remove(lineObj.line);
    });
    console.log(element);
    window.Diagrammer.stage.remove(element);
    window.Diagrammer.stage.renderAll();
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
    console.log("Add  " + parseInt($(button).parents("tr").find("td:nth-child(1)").text()));

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
        const id = $(button).parents("tr").find('select');
        $(id).parent("td").html($(id).find('option:selected').text());
        $(button).parents("tr").find(".add-" + type + ", .edit-" + type).toggle();
        $("#" + addNewButton).removeAttr("disabled");
    }
    console.log("Add  " + parseInt($(button).parents("tr").find("td:nth-child(1)").text()));
    return !empty;
}

function editRow_RolePort(button, addNewButton, type) {

    const name = $(button).parents("tr").find("td:nth-child(2)");
    $(name).html('<input type="text" class="form-control" value="' + $(name).text() + '">');
    $(button).parents("tr").find("td:nth-child(3)").html('<td><select class="form-control ' + type + '-options"></select></td>');
    console.log("Edit" + parseInt($(button).parents("tr").find("td:nth-child(1)").text()));

    updateAllOptions();
    console.log("Edit" + parseInt($(button).parents("tr").find("td:nth-child(1)").text()));

    $(button).parents("tr").find(".add-" + type + ", .edit-" + type).toggle();
    $("#" + addNewButton).attr("disabled", "disabled");

}

// Interactions
function addNewRow_Interaction(button, tableId, type) {
    const actions = getActions(type);
    $(button).attr("disabled", "disabled");
    let index = $("#" + tableId + " tbody tr:last-child").index();
    let row = '<tr>' +
        '<td>' + getNextElementId() + '</td>' +
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
    ids.each(function () {
        $(this).parent("td").html($(this).find('option:selected').text());
    });
    $(button).parents("tr").find(".add-" + type + ", .edit-" + type).toggle();
    $("#" + addNewButton).removeAttr("disabled");
}

function editRow_Interaction(button, addNewButton, type) {
    $(button).parents("tr").find("td:nth-child(2)").html('<td><select class="form-control interaction-port-options"></select></td>');
    $(button).parents("tr").find("td:nth-child(3)").html('<td><select class="form-control interaction-role-options"></select></td>');
    updateAllOptions();
    $(button).parents("tr").find(".add-" + type + ", .edit-" + type).toggle();
    $("#" + addNewButton).attr("disabled", "disabled");
}

// Update global architecture elements
function addComponentConnectorElement(button, type) {
    const id = parseInt($(button).parents("tr").find("td:nth-child(1)").text());
    console.log(id);

    const name = $(button).parents("tr").find("td:nth-child(2)").text();
    console.log(name);

    const element = {
        id: id,
        name: name
    }

    if (type === "component") {
        const foundIndex = window.Diagrammer.architectureElements.components.findIndex(x => x.id === id);
        if (foundIndex < 0) {
            const fabricObj = addComponentToCanvas(element);
            element.fabricObj = fabricObj;
            window.Diagrammer.architectureElements.components.push(element);
        } else {
            window.Diagrammer.architectureElements.components[foundIndex].fabricObj.item(1).set({ text: name });
            window.Diagrammer.architectureElements.components[foundIndex].name = name;
            window.Diagrammer.stage.renderAll();
        }
    } else if (type === "connector") {
        const foundIndex = window.Diagrammer.architectureElements.connectors.findIndex(x => x.id === id);
        if (foundIndex < 0) {
            const fabricObj = addConnectorToCanvas(element);
            element.fabricObj = fabricObj;
            window.Diagrammer.architectureElements.connectors.push(element);
        } else {
            window.Diagrammer.architectureElements.connectors[foundIndex].fabricObj.item(1).set({ text: name });
            window.Diagrammer.architectureElements.connectors[foundIndex].name = name;
            window.Diagrammer.stage.renderAll();

        }
    }
    console.log(window.Diagrammer.architectureElements);

}

function addRolePort(button, type) {
    let id = $(button).parents("tr").find("td:nth-child(1)").text();
    console.log(id);
    const name = $(button).parents("tr").find("td:nth-child(2)").text();
    console.log(name);

    const textKey = $(button).parents("tr").find("td:nth-child(3)").text();
    id = parseInt(fixId(id, textKey));
    const key = parseInt(textKey);

    if (type === "port") {
        const foundIndex = window.Diagrammer.architectureElements.ports.findIndex(x => x.id === id);
        const element = {
            id: id,
            name: name,
            component: key
        }
        if (foundIndex < 0) {
            const fabricObj = addPortToCanvas(element);
            element.fabricObj = fabricObj;
            addPortComponentInteraction(element);
            window.Diagrammer.architectureElements.ports.push(element);
        } else {
            window.Diagrammer.architectureElements.ports[foundIndex].name = name;
            window.Diagrammer.architectureElements.ports[foundIndex].component = key;
            window.Diagrammer.architectureElements.ports[foundIndex].fabricObj.item(1).set({ text: name });
            window.Diagrammer.stage.renderAll();
        }
    } else if (type === "role") {
        const foundIndex = window.Diagrammer.architectureElements.roles.findIndex(x => x.id === id);
        const element = {
            id: id,
            name: name,
            connector: key
        }
        if (foundIndex < 0) {
            const fabricObj = addRoleToCanvas(element);
            element.fabricObj = fabricObj;
            addRoleConnectorInteraction(element);
            window.Diagrammer.architectureElements.roles.push(element);
        } else {
            window.Diagrammer.architectureElements.roles[foundIndex].name = name;
            window.Diagrammer.architectureElements.roles[foundIndex].connector = key;
            window.Diagrammer.architectureElements.roles[foundIndex].fabricObj.item(1).set({ text: name });
            window.Diagrammer.stage.renderAll();
        }
    }
    console.log(window.Diagrammer.architectureElements);

}

function addInteraction(button) {
    let id = $(button).parents("tr").find("td:nth-child(1)").text();
    console.log(id);

    const port = parseInt($(button).parents("tr").find("td:nth-child(2)").text());
    const role = parseInt($(button).parents("tr").find("td:nth-child(3)").text());

    const textKey = "" + port + role;
    id = parseInt(fixId(id, textKey));

    const element = {
        id: id,
        port: port,
        role: role
    };

    const foundIndex = window.Diagrammer.architectureElements.interactions.findIndex(x => x.id === id);
    if (foundIndex < 0) {
        addPortRoleInteraction(element);
        window.Diagrammer.architectureElements.interactions.push(element);
    } else {
        window.Diagrammer.architectureElements.interactions[foundIndex].port = port;
        window.Diagrammer.architectureElements.interactions[foundIndex].role = role;
    }

    console.log(window.Diagrammer.architectureElements);
}

function fixId(id, key) {
    if (parseInt(id) === _ID) {
        return id;
    }
    let offset = 0;
    console.log("ID" + id);
    console.log("Key" + key);
    let badKey = id.slice(-key.length);
    let realId = id.slice(0, id.length - key.length);
    console.log("Read id " + realId);

    console.log("Bad key " + badKey);



    return badKey === id ? id : realId;
}
