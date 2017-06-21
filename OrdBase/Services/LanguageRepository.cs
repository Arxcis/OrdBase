using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using OrdBase.Models;

namespace OrdBase.Services
{
    public class LanguageRepository : IDataStore, IDisposable
    {
        public TranslationDb Context{ get; private set; }
        public LanguageRepository() { Context = new TranslationDb { };  }

    	public void Dispose() { Context.Dispose();  }
    }
}