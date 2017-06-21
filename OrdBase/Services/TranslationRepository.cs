using System;

using OrdBase.Models;

namespace OrdBase.Services
{
    public class TranslationRepository : IDataStore, IDisposable
    {
        public TranslationDb Context{ get; private set; }
        public TranslationRepository() { Context = new TranslationDb { };  }
    	public void Dispose() { Context.Dispose();  }
    }
}