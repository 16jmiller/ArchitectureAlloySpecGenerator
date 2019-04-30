using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using ArchitectureAlloySpecGenerator.Interfaces;
using ArchitectureAlloySpecGenerator.Models;
using Newtonsoft.Json;

namespace ArchitectureAlloySpecGenerator.Translator
{
    public class ClientServerJSONTranslator : IClientServerJSONTranslator
    {
        public ClientServerSystemModel CreateModel(string json)
        {
            var details = JsonConvert.DeserializeObject<JsonDetails>(json);

            ClientServerSystemModel system = new ClientServerSystemModel();
            system.Name = "ClientServerSystemExample";

            // For each Connector
            foreach (Connector c in details.connectors)
            {
                CnsConnector newConnector = new CnsConnector();
                newConnector.Name = c.name;

                //Find Requesters and Providers
                foreach(Role r in details.roles)
                {
                    if(r.connector == c.id)
                    {
                        if(r.name.Contains("Requester"))
                        {
                            CnsRequester tempRequester = new CnsRequester();
                            tempRequester.Name = r.name;
                            newConnector.Requesters.Add(tempRequester);
                        }
                        else if(r.name.Contains("Provider"))
                        {
                            CnsProvider tempProvider = new CnsProvider();
                            tempProvider.Name = r.name;
                            newConnector.Providers.Add(tempProvider);
                        }
                        else
                        {
                            //THROW ERROR: role is not named correctly, big sad
                        }
                    }
                }
                if((newConnector.Providers == null || newConnector.Providers.Count < 1) ||
                (newConnector.Requesters == null || newConnector.Requesters.Count < 1))
                {
                    //THROW ERROR: no roles found for connector
                }
                else
                {
                    system.Connectors.Add(newConnector);
                }
            }

            // For each Component
            foreach (Component c in details.components)
            {
                if(c.name.Contains("Server"))
                {
                    CnsServer newServer = new CnsServer();
                    newServer.Name = c.name;

                    // Find ClientAccesses
                    foreach(Port p in details.ports)
                    {
                        if(p.component == c.id)
                        {
                            if(p.name.Contains("ClientAccess"))
                            {
                                CnsClientAccess tempClientAccess = new CnsClientAccess();
                                tempClientAccess.Name = p.name;
                                newServer.ClientAccesses.Add(tempClientAccess);
                            }
                            else
                            {
                                //THROW ERROR: port should contain "ClientAccess" for Servers.
                            }
                        }
                    }
                    if(newServer.ClientAccesses == null || newServer.ClientAccesses.Count < 1)
                    {
                        //THROW ERROR: no ClientAccess found for Server.
                    }
                    else
                    {
                        system.Servers.Add(newServer);
                    }
                }
                else if(c.name.Contains("Client"))
                {
                  CnsClient newClient = new CnsClient();
                  newClient.Name = c.name;

                  // Find ServerRequests
                  foreach(Port p in details.ports)
                  {
                      if(p.component == c.id)
                      {
                          if(p.name.Contains("ServerRequest"))
                          {
                              CnsServerRequest tempServerRequest = new CnsServerRequest();
                              tempServerRequest.Name = p.name;
                              newClient.ServerRequests.Add(tempServerRequest);
                          }
                          else
                          {
                              //THROW ERROR: port should contain "ServerRequest" for Clients
                          }
                      }
                  }
                  if(newClient.ServerRequests == null || newClient.ServerRequests.Count < 1)
                  {
                      //THROW ERROR: no ServerRequests found for Client.
                  }
                  else
                  {
                      system.Clients.Add(newClient);
                  }
                }
                else
                {
                    //THROW ERROR: components named incorrectly, should contain either "Client" or "Server".
                }
            }

            // For each attachment
            foreach(Interaction i in details.interactions)
            {
                CnsRole tempRole = new CnsRole();
                CnsPort tempPort = new CnsPort();

                // Find name of each role
                foreach(Role r in details.roles)
                {
                    if(i.role == r.id)
                    {
                        tempRole.Name = r.name;
                    }
                }
                // Find name of each port
                foreach(Port p in details.ports)
                {
                    if(i.port == p.id)
                    {
                        tempPort.Name = p.name;
                    }
                }

                // if both are not null add to attachments
                if(string.IsNullOrEmpty(tempPort.Name) || string.IsNullOrEmpty(tempRole.Name) )
                {
                    //THROW ERROR: Broken, ids are wrong for interactions
                }
                else
                {
                    system.Attachments.Add(tempRole, tempPort);
                }
            }
            return system;
        }
    }
}
