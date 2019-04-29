let _ID = 0;

(function () {
    initializeDiagrammer();
    //initializeNewDiagram("Pipe and Filter");

    $("#new-diagram-form").on("submit", function (event) {
        event.preventDefault();
        clearArchitectureElements();
        initializeNewDiagram();
        $("#new-diagram-form").modal("hide");
        return;
    });

    $("#btn-generate-alloy").on("click", generateAlloy);

    window.Diagrammer.stage.on("object:moving", function (e) {
        const element = e.target;
        const elementCenter = getElementCenter(element);
        element.lines.forEach(function (lineObj) {
            if (lineObj.first) {
                lineObj.line.set({ "x1": elementCenter.left, "y1": elementCenter.top });
            } else {
                lineObj.line.set({ "x2": elementCenter.left, "y2": elementCenter.top });
            }
        });
        window.Diagrammer.stage.renderAll();
    });
})();

fabric.Canvas.prototype.getById = function (id) {
    const objects = this.getObjects();

    for (var i = 0, len = this.size(); i < len; i++) {
        if (objects[i].id && objects[i].id === id) {
            return objects[i];
        }
    }
};

function initializeDiagrammer() {
    const stage = initializeCanvas();

    if (!window.Diagrammer) window.Diagrammer = {};
    window.Diagrammer = {
        stage: stage,
        architectureElements: {
            components: [],
            connectors: [],
            ports: [],
            roles: [],
            interactions: []
        },
    };

}

function clearArchitectureElements() {
    window.Diagrammer.architectureElements = {
        components: [],
        connectors: [],
        ports: [],
        roles: [],
        interactions: []
    }
    window.Diagrammer.stage.clear();
}

function initializeCanvas() {
    var oldCanvas = document.getElementById('canvas');

    return new fabric.Canvas('canvas',
        {
            width: oldCanvas.parentNode.clientWidth,
            height: oldCanvas.parentNode.clientHeight
        });
}

function initializeNewDiagram(type) {
    let architectureStyle = type;
    if (!architectureStyle) {
        architectureStyle = $("#architecture-style").find('option:selected').text();
    } 
    if (architectureStyle === "Pipe and Filter") {
        console.log("P&F selected");
        window.Diagrammer.architectureElements = PIPE_AND_FILTER;
    } else if (architectureStyle === "Client Server") {
        console.log("CNS selected");
        window.Diagrammer.architectureElements = CLIENT_SERVER;
    }
    initializeArchitectureElements();
    initializeInteractions();
    initializeIdCounter();
    populateEditorTables();
}

function initializeArchitectureElements() {
    window.Diagrammer.architectureElements.components.forEach(function (element) {
        element.fabricObj = addComponentToCanvas(element);
    });
    window.Diagrammer.architectureElements.connectors.forEach(function (element) {
        element.fabricObj = addConnectorToCanvas(element);
    });
    window.Diagrammer.architectureElements.ports.forEach(function (element) {
        element.fabricObj = addPortToCanvas(element);
    });
    window.Diagrammer.architectureElements.roles.forEach(function (element) {
        element.fabricObj = addRoleToCanvas(element);
    });
}

function initializeInteractions() {
    window.Diagrammer.architectureElements.ports.forEach(function (port) {
        addPortComponentInteraction(port);
    });
    window.Diagrammer.architectureElements.roles.forEach(function (role) {
        addRoleConnectorInteraction(role);
    });
    window.Diagrammer.architectureElements.interactions.forEach(function (interaction) {
        addPortRoleInteraction(interaction);
    });
}

function addPortComponentInteraction(port) {
    console.log("adding port line");
    const componentIndex = window.Diagrammer.architectureElements.components.findIndex(x => x.id === port.component);
    const component = window.Diagrammer.architectureElements.components[componentIndex];
    addLine(port, component);
}

function addRoleConnectorInteraction(role) {
    const connectorIndex = window.Diagrammer.architectureElements.connectors.findIndex(x => x.id === role.connector);
    const connector = window.Diagrammer.architectureElements.connectors[connectorIndex];
    addLine(role, connector);
}

function addPortRoleInteraction(interaction) {
    const portIndex = window.Diagrammer.architectureElements.ports.findIndex(x => x.id === interaction.port);
    const port = window.Diagrammer.architectureElements.ports[portIndex];
    const roleIndex = window.Diagrammer.architectureElements.roles.findIndex(x => x.id === interaction.role);
    const role = window.Diagrammer.architectureElements.roles[roleIndex];
    addLine(port, role);
}

function addComponentToCanvas(component) {
    const componentShape = new fabric.Rect({
        originX: 'center',
        originY: 'center',
        fill: 'pink',
        width: 200,
        height: 100
    });

    let labeledComponent = labelElement(componentShape, component.name);
    labeledComponent.id = component.id;
    window.Diagrammer.stage.add(labeledComponent);
    return labeledComponent;
}

function addConnectorToCanvas(connector) {
    const connectorShape = new fabric.Rect({
        originX: 'center',
        originY: 'center',
        fill: 'lightgreen',
        width: 200,
        height: 100
    });

    let labeledConnector = labelElement(connectorShape, connector.name);
    labeledConnector.id = connector.id;
    window.Diagrammer.stage.add(labeledConnector);
    return labeledConnector;
}

function addPortToCanvas(port) {
    const portShape = new fabric.Triangle({
        originX: 'center',
        originY: 'center',
        fill: 'lightblue',
        width: 80,
        height: 80
    });

    let labeledPort = labelElement(portShape, port.name);
    labeledPort.id = port.id;
    window.Diagrammer.stage.add(labeledPort);
    return labeledPort;
}

function addRoleToCanvas(role) {
    const roleShape = new fabric.Circle({
        originX: 'center',
        originY: 'center',
        fill: 'yellow',
        radius: 40
    });

    roleShape.lines = [];

    let labeledRole = labelElement(roleShape, role.name);
    labeledRole.id = role.id;
    window.Diagrammer.stage.add(labeledRole);
    return labeledRole;
}

function addLine(archElement1, archElement2) {

    console.log(archElement1);
    console.log(archElement2);
    const element1Center = getElementCenter(archElement1.fabricObj);
    const element2Center = getElementCenter(archElement2.fabricObj);
    console.log(element1Center);
    console.log(element2Center);
    const line = makeLine([element1Center.left, element1Center.top, element2Center.left, element2Center.top]);
    archElement1.fabricObj.lines.push({ line: line, first: true });
    archElement2.fabricObj.lines.push({ line: line, first: false });
    console.log(line);
    window.Diagrammer.stage.add(line);
    window.Diagrammer.stage.sendToBack(line);
    window.Diagrammer.stage.renderAll();

}

function makeLine(coords) {
    return new fabric.Line(coords, {
        fill: 'red',
        stroke: 'red',
        strokeWidth: 5,
        selectable: false,
        evented: false,
    });
}

function getElementCenter(element) {
    return {
        left: element.left + element.width / 2,
        top: element.top + element.height / 2
    }
}

function labelElement(element, label) {
    const text = new fabric.Text(label, {
        fontSize: 30,
        originX: 'center',
        originY: 'center'
    });

    const group = new fabric.Group([element, text], {
        left: 150,
        top: 100
    });

    group.lines = [];

    return group
}

function populateEditorTables() {
    $("#component-table tbody").empty();
    $("#port-table tbody").empty();
    $("#connector-table tbody").empty();
    $("#role-table tbody").empty();
    $("#interaction-table tbody").empty();

    window.Diagrammer.architectureElements.components.forEach(function (element) {
        addFilledRow("component-table", element, "component");
    });
    window.Diagrammer.architectureElements.ports.forEach(function (element) {
        addFilledRow("port-table", element, "port", element.component);
    });
    window.Diagrammer.architectureElements.connectors.forEach(function (element) {
        addFilledRow("connector-table", element, "connector");
    });
    window.Diagrammer.architectureElements.roles.forEach(function (element) {
        addFilledRow("role-table", element, "role", element.connector);
    });
    window.Diagrammer.architectureElements.interactions.forEach(function (element) {
        addInteractionRow("interaction-table", element, "interaction");
    });
}

function addFilledRow(tableId, element, type, key) {
    const actions = getActions(type);
    const index = $("#" + tableId + " tbody tr:last-child").index();
    const keyHtml = key !== undefined ? '<td>' + key + '</td>' : '';
    const row = '<tr>' +
        '<td>' + element.id + '</td>' +
        '<td>' + element.name + '</td>' +
        keyHtml +
        '<td>' + actions + '</td>' +
        '</tr>';
    $("#" + tableId).append(row);
    $("#" + tableId + " tbody tr").eq(index + 1).find(".edit - " + type + ", .add - " + type).toggle();
}

function addInteractionRow(tableId, element, type) {
    const actions = getActions(type);
    const index = $("#" + tableId + " tbody tr:last-child").index();
    const row = '<tr>' +
        '<td>' + element.id + '</td>' +
        '<td>' + element.port + '</td>' +
        '<td>' + element.role + '</td>' +
        '<td>' + actions + '</td>' +
        '</tr>';
    $("#" + tableId).append(row);
    $("#" + tableId + " tbody tr").eq(index + 1).find(".edit - " + type + ", .add - " + type).toggle();
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

    const mySelect = $('.' + type + '-options');
    for (var i = 0; i < ids.length; i++) {
        mySelect.append($('<option></option>').val(ids[i]).html(ids[i]));
    }
}

function initializeIdCounter() {
    _ID = window.Diagrammer.architectureElements.components.length
        + window.Diagrammer.architectureElements.connectors.length
        + window.Diagrammer.architectureElements.ports.length
        + window.Diagrammer.architectureElements.roles.length
        + window.Diagrammer.architectureElements.interactions.length;
}

function getNextElementId() {
    return ++_ID;
}

function generateAlloy() {
    console.log("GG Hamid");
    let architectureElementsFinal = {
        components: [],
        connectors: [],
        ports: [],
        roles: [],
        interactions: []
    }

    window.Diagrammer.architectureElements.components.forEach(function (component) {
        architectureElementsFinal.components.push({
            id: component.id,
            name: component.name
        });
    });
    window.Diagrammer.architectureElements.connectors.forEach(function (connector) {
        architectureElementsFinal.connectors.push({
            id: connector.id,
            name: connector.name
        });
    });
    window.Diagrammer.architectureElements.ports.forEach(function (port) {
        architectureElementsFinal.ports.push({
            id: port.id,
            name: port.name,
            component: port.component
        });
    });
    window.Diagrammer.architectureElements.roles.forEach(function (role) {
        architectureElementsFinal.roles.push({
            id: role.id,
            name: role.name,
            connector: role.connector
        });
    });
    window.Diagrammer.architectureElements.interactions.forEach(function (interaction) {
        architectureElementsFinal.interactions.push({
            id: interaction.id,
            port: interaction.port,
            role: interaction.role
        });
    });

    const architectureElementsFinalString = JSON.stringify(architectureElementsFinal);
}