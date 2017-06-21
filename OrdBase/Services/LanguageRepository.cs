using System;

using OrdBase.Models;

namespace OrdBase.Services
{
    public class LanguageRepository : IDataStore<Language>, IDisposable
    {
        public TranslationDb Context{ get; private set; }
        public LanguageRepository() { Context = new TranslationDb { };  }

        public Language Get() { return new Language{}; } // @dummy

    	public void Dispose() { Context.Dispose();  }
    }
}