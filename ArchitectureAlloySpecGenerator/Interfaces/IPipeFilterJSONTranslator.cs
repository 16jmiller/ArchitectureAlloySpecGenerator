using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArchitectureAlloySpecGenerator.Models;

namespace ArchitectureAlloySpecGenerator.Interfaces
{
    public interface IPipeFilterJSONTranslator
    {
        PipeFilterSystemModel CreateModel(String json);

    }
}
