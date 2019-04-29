using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ArchitectureAlloySpecGenerator.Models
{
    public class JsonDetails
    {
        public List<Component> components { get; set; }
        public List<Connector> connectors { get; set; }
        public List<Port> ports { get; set; }
        public List<Role> roles { get; set; }
        public List<Interaction> interactions { get; set; }
    }

    public class Component
    {
        public int id { get: set: }
        public String name { get; set; }
    }

    public class Connector
    {
        public int id { get: set: }
        public String name { get; set; }
    }

    public class Port
    {
        public int id { get: set: }
        public String name { get; set; }
        public int component { get; set; }
    }

    public class Role
    {
        public int id { get: set: }
        public String name { get; set; }
        public int connector { get; set; }
    }

    public class Interaction
    {
        public int id { get; set; }
        public int port { get; set; }
        public int role { get; set; }
    }
}
