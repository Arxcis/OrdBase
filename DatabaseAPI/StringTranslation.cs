using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseAPI
{
    public class Client


    public class Language 
    {

    }

    public class Translation
    {
        public Guid ClientID { get;  }
        public string Key    { get;  }       // @note should be readonly, generated once maybe
        
    }
}
