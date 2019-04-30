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
    public class PipeFilterJSONTranslator : IPipeFilterJSONTranslator
    {
        public PipeFilterSystemModel CreateModel(String json)
        {
            var details = JsonConvert.DeserializeObject<JsonDetails>(json);

            PipeFilterSystemModel system = new PipeFilterSystemModel();
            system.Name = "PipeFilterSystemExample";

            // For each Component
            foreach (Component c in details.components)
            {
                if(c.name.Contains("DataSink"))
                {
                    PnfDataSink tempDataSink = new PnfDataSink();
                    tempDataSink.Name = c.name;

                    // Find inputs
                    foreach(Port p in details.ports)
                    {
                        if(p.component == c.id)
                        {
                            if(p.name.Contains("Input"))
                            {
                                PnfInput tempInput = new PnfInput();
                                tempInput.Name = p.name;
                                tempDataSink.Inputs.Add(tempInput);
                            }
                            else
                            {
                                //THROW ERROR: name for port should contain "Input" for DataSink
                            }
                        }
                    }
                    if(tempDataSink.Inputs == null || tempDataSink.Inputs.Count < 1)
                    {
                        //THROW ERROR: no inputs found for DataSink
                    }
                    else
                    {
                        system.DataSinks.Add(tempDataSink);
                    }
                }
                else if(c.name.Contains("DataSource"))
                {
                  PnfDataSource tempDataSource = new PnfDataSource();
                  tempDataSource.Name = c.name;

                  // Find outputs
                  foreach(Port p in details.ports)
                  {
                      if(p.component == c.id)
                      {
                          if(p.name.Contains("Output"))
                          {
                              PnfOutput tempOutput = new PnfOutput();
                              tempOutput.Name = p.name;
                              tempDataSource.Outputs.Add(tempOutput);
                          }
                          else
                          {
                              //THROW ERROR: name for port should contain "Output" for DataSource
                          }
                      }
                  }
                  if(tempDataSource.Outputs == null || tempDataSource.Outputs.Count < 1)
                  {
                      //THROW ERROR: no outputs found for DataSource
                  }
                  else
                  {
                      system.DataSources.Add(tempDataSource);
                  }
                }
                else if(c.name.Contains("Filter"))
                {
                    PnfFilter tempFilter = new PnfFilter();
                    tempFilter.Name = c.name;

                    // Find inputs and outputs
                    foreach(Port p in details.ports)
                    {
                        if(p.component == c.id)
                        {
                            if(p.name.Contains("Input"))
                            {
                                PnfInput tempInput = new PnfInput();
                                tempInput.Name = p.name;
                                tempFilter.Inputs.Add(tempInput);
                            }
                            else if(p.name.Contains("Output"))
                            {
                                PnfOutput tempOutput = new PnfOutput();
                                tempOutput.Name = p.name;
                                tempFilter.Outputs.Add(tempOutput);
                            }
                            else
                            {
                                //THROW ERROR: name for port should contain "Input" or "Output" for Filter
                            }
                        }
                    }
                    if((tempFilter.Outputs == null || tempFilter.Outputs.Count < 1) ||
                    (tempFilter.Inputs == null || tempFilter.Inputs.Count < 1))
                    {
                        //THROW ERROR: no inputs or outputs found for Filter
                    }
                    else
                    {
                        system.Filters.Add(tempFilter);
                    }
                }
                else
                {
                    //THROW ERROR: Wrong name for component. Should be "DataSink", "DataSource", or "Filter".
                }
            }
            // For each Connector
            foreach (Connector c in details.connectors)
            {
                // All connectors are Pipes
                PnfPipe newPipe = new PnfPipe();
                newPipe.Name = c.name;

                // Find Sinks and Sources
                foreach(Role r in details.roles)
                {
                    if(r.connector == c.id)
                    {
                        if(r.name.Contains("Sink"))
                        {
                            PnfSink tempSink = new PnfSink();
                            tempSink.Name = r.name;
                            newPipe.Sinks.Add(tempSink);
                        }
                        else if(r.name.Contains("Source"))
                        {
                            PnfSource tempSource = new PnfSource();
                            tempSource.Name = r.name;
                            newPipe.Sources.Add(tempSource);
                        }
                        else
                        {
                            //THROW ERROR: role name should contain either "Sink" or "Source" for Pipes.
                        }
                    }
                }
                if((newPipe.Sinks == null || newPipe.Sinks.Count < 1) ||
                (newPipe.Sources == null || newPipe.Sources.Count < 1))
                {
                    //THROW ERROR: no Sinks or Sources found for Pipe.
                }
                else
                {
                    system.Pipes.Add(newPipe);
                }
            }

            // For each attachment
            foreach(Interaction i in details.interactions)
            {
                PnfRole tempRole = new PnfRole();
                PnfPort tempPort = new PnfPort();

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
