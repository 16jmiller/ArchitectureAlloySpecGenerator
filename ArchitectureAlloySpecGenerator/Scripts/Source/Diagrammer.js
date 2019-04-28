let STAGE = undefined;

(function () {
    const stage = initializeCanvas();

    if (!window.Diagrammer) window.Diagrammer = {};
    window.Diagrammer = {
        stage: stage,
        architecturalElements: {
            components: [],
            connectors: [],
            ports: [],
            roles: [],
            interactions: []
        },
    };

    $("#new-diagram-form").on("submit", initializeNewDiagram());
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
        window.Diagrammer.architecturalElements = PIPE_AND_FILTER;
    } else if (architectureStyle === "Client Server") {

    }
    initializeArchitectureElements();
}

function initializeArchitectureElements(event) {
    window.Diagrammer.architecturalElements.components.forEach(function (element) {
        element.fabricObj = addComponentToCanvas(element);
        console.log(element);
    });
    window.Diagrammer.architecturalElements.connectors.forEach(function (element) {
        element.fabricObj = addConnectorToCanvas(element);
    });
    window.Diagrammer.architecturalElements.ports.forEach(function (element) {
        element.fabricObj = addPortToCanvas(element);
    });
    window.Diagrammer.architecturalElements.roles.forEach(function (element) {
        element.fabricObj = addRoleToCanvas(element);
    });
    console.log(window.Diagrammer.architecturalElements);
}

function addComponentToCanvas(component) {
    const componentShape = new fabric.Rect({
        originX: 'center',
        originY: 'center',
        fill: 'red',
        width: 200,
        height: 100
    });

    const componentText = new fabric.Text(component.name, {
        fontSize: 30,
        originX: 'center',
        originY: 'center'
    });

    const group = new fabric.Group([componentShape, componentText], {
        left: 150,
        top: 100
    });

    window.Diagrammer.stage.add(group);
    return group;
}

function addConnectorToCanvas(connector) {
    const connectorShape = new fabric.Rect({
        originX: 'center',
        originY: 'center',
        fill: 'green',
        width: 200,
        height: 100
    });

    const connectorText = new fabric.Text(connector.name, {
        fontSize: 30,
        originX: 'center',
        originY: 'center'
    });

    const group = new fabric.Group([connectorShape, connectorText], {
        left: 150,
        top: 100
    });

    window.Diagrammer.stage.add(group);
    return group;
}

function addPortToCanvas(port) {
    const portShape = new fabric.Triangle({
        originX: 'center',
        originY: 'center',
        fill: 'blue',
        width: 80,
        height: 80
    });

    const portText = new fabric.Text(port.name, {
        fontSize: 30,
        originX: 'center',
        originY: 'center'
    });

    const group = new fabric.Group([portShape, portText], {
        left: 150,
        top: 100
    });

    window.Diagrammer.stage.add(group);
    return group;
}

function addRoleToCanvas(role) {
    const roleShape = new fabric.Circle({
        originX: 'center',
        originY: 'center',
        fill: 'yellow',
        radius: 40
    });

    const roleText = new fabric.Text(role.name, {
        fontSize: 30,
        originX: 'center',
        originY: 'center'
    });

    const group = new fabric.Group([roleShape, roleText], {
        left: 150,
        top: 100
    });

    window.Diagrammer.stage.add(group);
    return group;
}