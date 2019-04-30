using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ArchitectureAlloySpecGenerator.Models
{
    public class CnsComponent
    {
        public string Name { get; set; }
    }

    public class CnsConnector
    {
        public string Name { get; set; }
        public List<CnsRequester> Requesters { get; set; }
        public List<CnsProvider> Providers { get; set; }

        public CnsConnector()
        {
            Requesters = new List<CnsRequester>();
            Providers = new List<CnsProvider>();
        }
    }

    public class CnsPort
    {
        public string Name { get; set; }
    }

    public class CnsRole
    {
        public string Name { get; set; }
    }

    public class ClientServerSystemModel
    {
        public string Name { get; set; }
        public List<CnsConnector> Connectors { get; set; }
        public List<CnsServer> Servers { get; set; }
        public List<CnsClient> Clients { get; set; }
        public Dictionary<CnsRole, CnsPort> Attachments { get; set; }

        public ClientServerSystemModel()
        {
            Connectors = new List<CnsConnector>();
            Servers = new List<CnsServer>();
            Clients = new List<CnsClient>();
            Attachments = new Dictionary<CnsRole, CnsPort>();
        }
    }

    public class CnsServer : CnsComponent
    {
        public List<CnsClientAccess> ClientAccesses { get; set; }

        public CnsServer()
        {
            ClientAccesses = new List<CnsClientAccess>();
        }
    }

    public class CnsClient : CnsComponent
    {
        public List<CnsServerRequest> ServerRequests { get; set; }

        public CnsClient()
        {
            ServerRequests = new List<CnsServerRequest>();
        }
    }

    public class CnsClientAccess : CnsPort { }

    public class CnsProvider : CnsRole { }

    public class CnsRequester : CnsRole { }

    public class CnsServerRequest : CnsPort { }

}
