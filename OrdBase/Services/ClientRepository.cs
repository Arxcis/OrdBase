using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using OrdBase.Models;

namespace OrdBase.Services
{
    public class ClientRepository : IDataStore, IDisposable
    {
        public TranslationDb Context{ get; private set; }
        public TranslationRepository() { Context = new TranslationDb { };  }

    	public void Dispose() { Context.Dispose();  }
    }
}