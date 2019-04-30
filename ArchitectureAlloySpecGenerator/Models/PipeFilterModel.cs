using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ArchitectureAlloySpecGenerator.Models
{
    public class PnfComponent
    {
        public string Name { get; set; }
    }

    public class PnfPipe
    {
        public string Name { get; set; }
        public List<PnfSink> Sinks { get; set; }
        public List<PnfSource> Sources { get; set; }

        public PnfPipe()
        {
            Sinks = new List<PnfSink>();
            Sources = new List<PnfSource>();
        }
    }

    public class PnfPort
    {
        public string Name { get; set; }
    }

    public class PnfRole
    {
        public string Name { get; set; }
    }

    public class PipeFilterSystemModel
    {
        public string Name { get; set; }
        public List<PnfDataSink> DataSinks { get; set; }
        public List<PnfDataSource> DataSources { get; set; }
        public List<PnfFilter> Filters { get; set; }
        public List<PnfPipe> Pipes { get; set; }
        public Dictionary<PnfRole, PnfPort> Attachments { get; set; }

        public PipeFilterSystemModel()
        {
            DataSinks = new List<PnfDataSink>();
            DataSources = new List<PnfDataSource>();
            Filters = new List<PnfFilter>();
            Pipes = new List<PnfPipe>();
            Attachments = new Dictionary<PnfRole, PnfPort>();
        }
    }

    public class PnfFilter : PnfComponent
    {
        public List<PnfInput> Inputs { get; set; }
        public List<PnfOutput> Outputs { get; set; }

        public PnfFilter()
        {
            Inputs = new List<PnfInput>();
            Outputs = new List<PnfOutput>();
        }
    }

    public class PnfDataSource : PnfComponent
    {
        public List<PnfOutput> Outputs { get; set; }

        public PnfDataSource()
        {
            Outputs = new List<PnfOutput>();
        }
    }

    public class PnfDataSink : PnfComponent
    {
        public List<PnfInput> Inputs { get; set; }

        public PnfDataSink()
        {
            Inputs = new List<PnfInput>();
        }
    }

    public class PnfInput : PnfPort { }

    public class PnfSink : PnfRole { }

    public class PnfSource : PnfRole { }

    public class PnfOutput : PnfPort { }

}
