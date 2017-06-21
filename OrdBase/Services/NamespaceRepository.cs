using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using OrdBase.Models;

namespace OrdBase.Services
{
    public class NamespaceRepository : IDataStore<string>, IDisposable
    {
        public TranslationDb Context{ get; private set; }
        public NamespaceRepository() { Context = new TranslationDb { };  }

        public string Get() { return "hello"; } // @dummy

    	public void Dispose() { Context.Dispose();  }
    }
}