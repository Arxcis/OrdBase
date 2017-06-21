using System;

using OrdBase.Models;

namespace OrdBase.Services
{
    public class TranslationRepository : IDataStore<Translation>, IDisposable
    {
        public TranslationDb Context{ get; private set; }
        public TranslationRepository() { Context = new TranslationDb { };  }

        public Translation Get() { return new Translation{}; } // @dummy

    	public void Dispose() { Context.Dispose();  }
    }
}