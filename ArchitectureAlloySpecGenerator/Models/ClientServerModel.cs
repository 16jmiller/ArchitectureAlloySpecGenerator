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
        public List<Requester> Requesters { get; set; }
        public List<Provider> Providers { get; set; }
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
    }

    public class CnsServer : CnsComponent
    {
        public List<ClientAccess> ClientAccesses { get; set; }
    }

    public class CnsClient : CnsComponent
    {
        public List<CnsServerRequest> ServerRequests { get; set; }
    }

    public class CnsClientAccess : CnsPort { }

    public class CnsProvider : CnsRole { }

    public class CnsRequester : CnsRole { }

    public class CnsServerRequest : CnsPort { }

}
