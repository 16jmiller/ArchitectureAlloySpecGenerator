let id = 5;

(function () {
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

    $("#new-diagram-form").on("submit", initializeNewDiagram());
    populateEditorTables();
})();

function initializeCanvas() {
    var oldCanvas = document.getElementById('canvas');

    return new fabric.Canvas('canvas',
        {
            width: oldCanvas.parentNode.clientWidth,
            height: oldCanvas.parentNode.clientHeight
        });
}

function initializeNewDiagram() {
    const architectureStyle = $("#architecture-style").val();
    if (architectureStyle === "Pipe and Filter") {
        window.Diagrammer.architectureElements = PIPE_AND_FILTER;
    } else if (architectureStyle === "Client Server") {

    }
    initializeArchitectureElements();
    populateEditorTables();
}

function initializeArchitectureElements(event) {
    window.Diagrammer.architectureElements.components.forEach(function (element) {
        element.fabricObj = addComponentToCanvas(element);
        console.log(element);
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
    console.log(window.Diagrammer.architectureElements);
}

function addComponentToCanvas(component) {
    const componentShape = new fabric.Rect({
        originX: 'center',
        originY: 'center',
        fill: 'red',
        width: 200,
        height: 100
    });

    const labeledComponent = labelElement(componentShape, component.name);
    window.Diagrammer.stage.add(labeledComponent);
    return labeledComponent;
}

function addConnectorToCanvas(connector) {
    const connectorShape = new fabric.Rect({
        originX: 'center',
        originY: 'center',
        fill: 'green',
        width: 200,
        height: 100
    });

    const labeledConnector = labelElement(connectorShape, connector.name);
    window.Diagrammer.stage.add(labeledConnector);
    return labeledConnector;
}

function addPortToCanvas(port) {
    const portShape = new fabric.Triangle({
        originX: 'center',
        originY: 'center',
        fill: 'blue',
        width: 80,
        height: 80
    });

    const labeledPort = labelElement(portShape, port.name);
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

    const labeledRole = labelElement(roleShape, role.name);
    window.Diagrammer.stage.add(labeledRole);
    return labeledRole;
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
    return group
}

function populateEditorTables() {
    window.Diagrammer.architectureElements.components.forEach(function (element) {
        addFilledRow("component-table", element, "component");
    });

}

function addFilledRow(tableId, element, type) {
    const actions = getActions(type);
    const index = $("#" + tableId + " tbody tr:last-child").index();
    const row = '<tr>' +
        '<td>' + element.id + '</td>' +
        '<td' + element.name + '</td>' +
        '<td>' + actions + '</td>' +
        '</tr>';
    $("#" + tableId).append(row);
    $("#" + tableId + " tbody tr").eq(index + 1).find(".add-" + type + ", .edit-" + type).toggle();
}
