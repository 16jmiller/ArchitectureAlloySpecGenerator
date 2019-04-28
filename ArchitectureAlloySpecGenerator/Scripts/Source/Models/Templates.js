// Pipe and Filter Templates
const PIPE_AND_FILTER = {
    components: [
        {
            id: 1,
            name: "Pipe1",
            ports: [4]
        }, {
            id: 2,
            name: "Pipe2",
            ports: [5]
        }
    ],
    connectors: [
        {
            id: 3,
            name: "Filter1",
            roles: [6, 7]
        }
    ],
    ports: [
        {
            id: 4,
            name: "Port1",
            component: 1
        }, {
            id: 5,
            name: "Port2",
            component: 2
        }
    ],
    roles: [
        {
            id: 6,
            name: "Role1",
            connector: 3
        }, {
            id: 7,
            name: "Role2",
            connector: 3
        }
    ],
    interactions: [
        {
            port: 4,
            role: 6
        },
        {
            port: 5,
            role: 7
        }
    ]
}