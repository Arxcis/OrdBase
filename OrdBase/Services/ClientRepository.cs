using System;

using OrdBase.Models;

namespace OrdBase.Services
{
    public class ClientRepository : IDataStore, IDisposable
    {
        public TranslationDb Context{ get; private set; }
        public ClientRepository() { Context = new TranslationDb { };  }

    	public void Dispose() { Context.Dispose();  }
    }
}