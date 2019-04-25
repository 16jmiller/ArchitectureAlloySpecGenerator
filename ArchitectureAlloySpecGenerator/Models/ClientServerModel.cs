using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ArchitectureAlloySpecGenerator.Models
{
    public class Component
    {
        public string Name { get; set; }
    }

    public class Connector
    {
        public string Name { get; set; }
        public List<Requester> Requesters { get; set; }
        public List<Provider> Providers { get; set; }
    }

    public class Port
    {
        public string Name { get; set; }
    }

    public class Role
    {
        public string Name { get; set; }
    }

    public class ClientServerSystemModel
    {
        public string Name { get; set; }
        public List<Connector> Connectors { get; set; }
        public List<Server> Servers { get; set; }
        public List<Client> Clients { get; set; }
        public Dictionary<Role, Port> Attachments { get; set; }
    }

    public class Server : Component
    {
        public List<ClientAccess> ClientAccesses { get; set; }
    }

    public class Client : Component
    {
        public List<ServerRequest> ServerRequests { get; set; }
    }

    public class ClientAccess : Port { }

    public class Provider : Role { }

    public class Requester : Role { }

    public class ServerRequest : Port { }

}