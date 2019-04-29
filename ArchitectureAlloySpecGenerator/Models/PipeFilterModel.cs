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
    }

    public class PnfFilter : PnfComponent
    {
        public List<PnfInput> Inputs { get; set; }
        public List<PnfOutput> Outputs { get; set; }
    }

    public class PnfDataSource : PnfComponent
    {
        public List<PnfOutput> Outputs { get; set; }
    }

    public class PnfDataSink : PnfComponent
    {
        public List<PnfInput> Inputs { get; set; }
    }

    public class PnfInput : PnfPort { }

    public class PnfSink : PnfRole { }

    public class PnfSource : PnfRole { }

    public class PnfOutput : PnfPort { }

}
