using System;

using OrdBase.Models;

namespace OrdBase.Services
{
    public class ClientRepository : IDataStore<Client>, IDisposable
    {
        public TranslationDb Context{ get; private set; }
        public ClientRepository() { Context = new TranslationDb { };  }

        public Client Get() { return new Client{}; } // @dummy

    	public void Dispose() { Context.Dispose();  }
    }
}