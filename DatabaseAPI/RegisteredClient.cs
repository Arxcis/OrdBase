using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseAPI
{
    class RegisteredClient
    {

        private string password;          // @note This is private because it should be generated in the constructor
        public string Password { get;  }
        public string Name { get; set; }
    }
}
