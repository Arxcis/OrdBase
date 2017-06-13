using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseAPI
{
    public class StringTranslation
    {
        public string Key     { get; }        // @note should be readonly, generated once maybe
        public string Nynorsk { get; set; }
        public string Bokmal  { get; set; }
        public string Samisk  { get; set; }
        public string English { get; set; }
    }
}
