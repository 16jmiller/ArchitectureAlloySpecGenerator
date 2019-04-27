using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using ArchitectureAlloySpecGenerator.Interfaces;
using ArchitectureAlloySpecGenerator.Models;

namespace ArchitectureAlloySpecGenerator.Implementations
{
    public class PipeFilterSpecCreator : IPipeFilterSpecCreator
    {
        public StringBuilder CreateSpec(PipeFilterSystemModel system)
        {
            StringBuilder pf_spec = new StringBuilder();

            // Header: User can rename it later.
            pf_spec.Append("module PnfExample\n\n");

            // Includes: User must have the Pnf_simplified spec in a library folder where this spec is saved.
            pf_spec.Append("open library/Pnf_simplified as Pnf\n\n");

            // System Name:
            pf_spec.Append("one sig ");
            pf_spec.Append(system.Name);
            pf_spec.Append(" extends System{}\n\n");

            // For each Filter:
            foreach (Filter f in system.Servers)
            {
                pf_spec.Append("one sig ");
                pf_spec.Append(f.Name);
                pf_spec.Append(" extends Filter{}{\n");

                int count_ports = 0;
                foreach (PnfInput i in f.Inputs)
                {
                    if(count_ports == 0)
                    {
                        pf_spec.Append("\tports = ");
                        pf_spec.Append(i.Name);
                        count_ports = 1;
                    }
                    else
                    {
                        pf_spec.Append(" + ");
                        pf_spec.Append(i.Name);
                    }
                }
                foreach (PnfOutput o in f.Outputs)
                {
                    if(count_ports == 0)
                    {
                        pf_spec.Append("\tports = ");
                        pf_spec.Append(o.Name);
                        count_ports = 1;
                    }
                    else
                    {
                        pf_spec.Append(" + ");
                        pf_spec.Append(o.Name);
                    }
                }
                pf_spec.Append("\n}\n\n");
            }

            // For each Pipe:
            foreach (PnfPipe p in system.Pipes)
            {
                pf_spec.Append("one sig ");
                pf_spec.Append (p.Name);
                pf_spec.Append(" extends Pipe{}{\n");

                int count_roles = 0;
                foreach (PnfSink s in p.Sinks)
                {
                    if (count_roles == 0)
                    {
                        pf_spec.Append("\troles = ");
                        pf_spec.Append(s.Name);
                        count_roles = 1;
                    }
                    else
                    {
                        pf_spec.Append(" + ");
                        pf_spec.Append(s.Name);
                    }
                }
                foreach (PnfSource s in p.Sources)
                {
                    if (count_roles == 0)
                    {
                        pf_spec.Append("\troles = ");
                        pf_spec.Append(s.Name);
                        count_roles = 1;
                    }
                    else
                    {
                        pf_spec.Append(" + ");
                        pf_spec.Append(s.Name);
                    }
                }
                pf_spec.Append("\n}\n\n");
            }

            // For each Source:
            foreach (PnfDataSource s in system.DataSources)
            {
                pf_spec.Append("one sig ");
                pf_spec.Append(s.Name);
                pf_spec.Append(" extends DataSource{}{\n");

                int count_ports = 0;
                foreach (PnfOutput o in s.Outputs)
                {
                    if (count_ports == 0)
                    {
                        pf_spec.Append("\tports = ");
                        pf_spec.Append(o.Name);
                        count_ports = 1;
                    }
                    else
                    {
                        pf_spec.Append(" + ");
                        pf_spec.Append(o.Name);
                    }
                }
                pf_spec.Append("\n}\n\n");
            }

            // For each Sink:
            foreach (PnfDataSink s in system.DataSinks)
            {
                pf_spec.Append("one sig ");
                pf_spec.Append(s.Name);
                pf_spec.Append(" extends DataSink{}{\n");

                int count_ports = 0;
                foreach (PnfInput i in s.Inputs)
                {
                    if (count_ports == 0)
                    {
                        pf_spec.Append("\tports = ");
                        pf_spec.Append(i.Name);
                        count_ports = 1;
                    }
                    else
                    {
                        pf_spec.Append(" + ");
                        pf_spec.Append(i.Name);
                    }
                }
                pf_spec.Append("\n}\n\n");
            }

            // For each Output from DataSources:
            foreach (PnfDataSource s in system.DataSources)
            {
                foreach (PnfOutput o in s.Outputs)
                {
                    pf_spec.Append("one sig ");
                    pf_spec.Append(o.Name);
                    pf_spec.Append(" extends Output{}\n");
                }
            }

            // For each Input from DataSinks:
            foreach (PnfDataSource s in system.DataSinks)
            {
                foreach (PnfInput i in s.Inputs)
                {
                    pf_spec.Append("one sig ");
                    pf_spec.Append(i.Name);
                    pf_spec.Append(" extends Input{}\n");
                }
            }

            // For each Input + Output in Filters:
            foreach (PnfFilter f in system.Filters)
            {
                // Inputs:
                foreach (PnfInput i in f.Inputs)
                {
                    pf_spec.Append("one sig ");
                    pf_spec.Append(i.Name);
                    pf_spec.Append(" extends Input{}\n");
                }

                // Outputs:
                foreach (PnfOutput o in f.Outputs)
                {
                    pf_spec.Append("one sig ");
                    pf_spec.Append(o.Name);
                    pf_spec.Append(" extends Output{}\n");
                }
            }

            // For each Source + Sink:
            foreach (PnfPipe p in system.Pipes)
            {
                foreach (PnfSource s in p.Sources)
                {
                    pf_spec.Append("one sig ");
                    pf_spec.Append(s.Name);
                    pf_spec.Append(" extends Source{}\n");
                }
                foreach (PnfSink s in p.Sinks)
                {
                    pf_spec.Append("one sig ");
                    pf_spec.Append(s.Name);
                    pf_spec.Append(" extends Sink{}\n");
                }
            }


            // Fact for attachments:
            if(system.Attachments.Count > 1)
            {
                pf_spec.Append("fact Correct_Attachments {\n");
                pf_spec.Append(system.Name);
                pf_spec.Append(".attachments =\n");

                int attachment_count = 0;
                foreach(KeyValuePair<Role, Port> a in system.Attachments)
                {
                    if(attachment_count == 0)
                    {
                        pf_spec.Append(a.Key.Name);
                        pf_spec.Append("->");
                        pf_spec.Append(a.Value.Name);
                        pf_spec.Append("\n");
                        attachment_count = 1;
                    }
                    else
                    {
                        pf_spec.Append("+ ");
                        pf_spec.Append(a.Key.Name);
                        pf_spec.Append("->");
                        pf_spec.Append(a.Value.Name);
                        pf_spec.Append("\n");
                    }
                }
                pf_spec.Append("}\n\n");
            }

            // Footer: pred show and run show
            pf_spec.Append("pred show {\n");
            pf_spec.Append("\tone System\n");
            pf_spec.Append("}\n\n");
            pf_spec.Append("run show\n\n");

            return pf_spec;
        }
    }
}
