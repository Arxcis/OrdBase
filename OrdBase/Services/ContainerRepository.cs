using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using OrdBase.Models;

namespace OrdBase.Services
{	
	// 
	// @class ContainerRepository
	//  @brief Manages Translation-containers logic
	//
    public class ContainerRepository : IDataStore<string>, IDisposable
    {
        public TranslationDb Context{ get; private set; }
        public ContainerRepository() { Context = new TranslationDb { };  }

        public string Get() { return "hello"; } // @dummy

    	public void Dispose() { Context.Dispose();  }
    }
}