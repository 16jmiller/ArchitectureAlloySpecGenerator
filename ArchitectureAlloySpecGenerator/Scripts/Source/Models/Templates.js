﻿// Pipe and Filter Templates
const PIPE_AND_FILTER = {
    type: "PipeAndFilter",
    components: [
        {
            id: 1,
            name: "DataSource"
        }, {
            id: 2,
            name: "DataSink"
        }
    ],
    connectors: [
        {
            id: 3,
            name: "Pipe1"
        }
    ],
    ports: [
        {
            id: 4,
            name: "Output1",
            component: 1
        }, {
            id: 5,
            name: "Input1",
            component: 2
        }
    ],
    roles: [
        {
            id: 6,
            name: "Source1",
            connector: 3
        }, {
            id: 7,
            name: "Sink1",
            connector: 3
        }
    ],
    interactions: [
        {
            id: 8,
            port: 4,
            role: 6
        },
        {
            id: 9,
            port: 5,
            role: 7
        }
    ]
};

const CLIENT_SERVER = {
    type: "ClientServer",
    components: [
        {
            id: 1,
            name: "DatabaseServer"
        }, {
            id: 2,
            name: "DataClient1"
        }, {
            id: 3,
            name: "DataClient2"
        }
    ],
    connectors: [
        {
            id: 4,
            name: "DataConnector1"
        }, {
            id: 5,
            name: "DataConnector2"
        }
    ],
    ports: [
        {
            id: 6,
            name: "DataAccess",
            component: 1
        }, {
            id: 7,
            name: "DataServerRequest1",
            component: 2
        }, {
            id: 8,
            name: "DataServerRequest2",
            component: 3
        }
    ],
    roles: [
        {
            id: 9,
            name: "DataRequester1",
            connector: 4
        }, {
            id: 10,
            name: "DataRequester2",
            connector: 5
        }, {
            id: 11,
            name: "DataProvider1",
            connector: 4
        }, {
            id: 12,
            name: "DataProvider2",
            connector: 5
        }
    ],
    interactions: [
        {
            id: 13,
            port: 6,
            role: 9
        }, {
            id: 14,
            port: 6,
            role: 10
        }, {
            id: 15,
            port: 7,
            role: 11
        }, {
            id: 16,
            port: 8,
            role: 12
        }
    ]
}