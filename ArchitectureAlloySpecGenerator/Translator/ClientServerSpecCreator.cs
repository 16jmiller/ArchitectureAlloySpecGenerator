using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using ArchitectureAlloySpecGenerator.Interfaces;
using ArchitectureAlloySpecGenerator.Models;

namespace ArchitectureAlloySpecGenerator.Translator
{
    public class ClientServerSpecCreator : IClientServerSpecCreator
    {
        public StringBuilder CreateSpec(ClientServerSystemModel system)
        {
            StringBuilder cs_spec = new StringBuilder();

            // Header: User can rename it later.
            cs_spec.Append("module CnsExample\n\n");

            // Includes: User must have the Cns_simplified spec in a library folder where this spec is saved.
            cs_spec.Append("open library/Cns_simplified as Cns\n\n");

            // System Name:
            cs_spec.Append("one sig ");
            cs_spec.Append(system.Name);
            cs_spec.Append(" extends System{}\n\n");

            // For each Server:
            foreach (CnsServer s in system.Servers)
            {
                cs_spec.Append("one sig ");
                cs_spec.Append(s.Name);
                cs_spec.Append(" extends Server{}{\n");

                int count_ports = 0;
                foreach (CnsClientAccess ca in s.ClientAccesses)
                {
                    if(count_ports == 0)
                    {
                        cs_spec.Append("\tports = ");
                        cs_spec.Append(ca.Name);
                        count_ports = 1;
                    }
                    else
                    {
                        cs_spec.Append(" + ");
                        cs_spec.Append(ca.Name);
                    }
                }
                cs_spec.Append("\n}\n\n");
            }

            // For each CnsConnector:
            foreach (CnsConnector c in system.Connectors)
            {
                cs_spec.Append("one sig ");
                cs_spec.Append (c.Name);
                cs_spec.Append(" extends CnsConnector{}{\n");

                int count_roles = 0;
                foreach (CnsRequester r in c.Requesters)
                {
                    if (count_roles == 0)
                    {
                        cs_spec.Append("\troles = ");
                        cs_spec.Append(r.Name);
                        count_roles = 1;
                    }
                    else
                    {
                        cs_spec.Append(" + ");
                        cs_spec.Append(r.Name);
                    }
                }
                foreach (CnsProvider p in c.Providers)
                {
                    if (count_roles == 0)
                    {
                        cs_spec.Append("\troles = ");
                        cs_spec.Append(p.Name);
                        count_roles = 1;
                    }
                    else
                    {
                        cs_spec.Append(" + ");
                        cs_spec.Append(p.Name);
                    }
                }
                cs_spec.Append("\n}\n\n");
            }

            // For each Client:
            foreach (CnsClient c in system.Clients)
            {
                cs_spec.Append("one sig ");
                cs_spec.Append(c.Name);
                cs_spec.Append(" extends Client{}{\n");

                int count_ports = 0;
                foreach (CnsServerRequest sr in c.ServerRequests)
                {
                    if (count_ports == 0)
                    {
                        cs_spec.Append("\tports = ");
                        cs_spec.Append(sr.Name);
                        count_ports = 1;
                    }
                    else
                    {
                        cs_spec.Append(" + ");
                        cs_spec.Append(sr.Name);
                    }
                }
                cs_spec.Append("\n}\n\n");
            }

            // For each ClientAccess:
            foreach (CnsServer s in system.Servers)
            {
                foreach (CnsClientAccess ca in s.ClientAccesses)
                {
                    cs_spec.Append("one sig ");
                    cs_spec.Append(ca.Name);
                    cs_spec.Append(" extends ClientAccess{}\n");
                }
            }

            // For each Provider + Requester:
            foreach (CnsConnector c in system.Connectors)
            {
                // Providers:
                foreach (CnsProvider p in c.Providers)
                {
                    cs_spec.Append("one sig ");
                    cs_spec.Append(p.Name);
                    cs_spec.Append(" extends Provider{}\n");
                }

                // Requesters:
                foreach (CnsRequester r in c.Requesters)
                {
                    cs_spec.Append("one sig ");
                    cs_spec.Append(r.Name);
                    cs_spec.Append(" extends Requester{}\n");
                }
            }

            // For each ServerRequest:
            foreach (CnsClient c in system.Clients)
            {
                foreach (CnsServerRequest sr in c.ServerRequests)
                {
                    cs_spec.Append("one sig ");
                    cs_spec.Append(sr.Name);
                    cs_spec.Append(" extends ServerRequest{}\n");
                }
            }


            // Fact for attachments:
            if(system.Attachments.Count > 1)
            {
                cs_spec.Append("fact Correct_Attachments {\n");
                cs_spec.Append(system.Name);
                cs_spec.Append(".attachments =\n");

                int attachment_count = 0;
                foreach(KeyValuePair<CnsRole, CnsPort> a in system.Attachments)
                {
                    if(attachment_count == 0)
                    {
                        cs_spec.Append(a.Key.Name);
                        cs_spec.Append("->");
                        cs_spec.Append(a.Value.Name);
                        cs_spec.Append("\n");
                        attachment_count = 1;
                    }
                    else
                    {
                        cs_spec.Append("+ ");
                        cs_spec.Append(a.Key.Name);
                        cs_spec.Append("->");
                        cs_spec.Append(a.Value.Name);
                        cs_spec.Append("\n");
                    }
                }
                cs_spec.Append("}\n\n");
            }

            // Footer: pred show and run show
            cs_spec.Append("pred show {\n");
            cs_spec.Append("\tone System\n");
            cs_spec.Append("}\n\n");
            cs_spec.Append("run show\n\n");

            return cs_spec;
        }
    }
}
