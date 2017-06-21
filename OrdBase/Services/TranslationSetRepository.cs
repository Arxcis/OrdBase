﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using OrdBase.Models;

namespace OrdBase.Services
{
    public class TranslationSetRepository : IDataStore, IDisposable
    {

    	   	//
            // @doc Group by - https://stackoverflow.com/questions/7325278/group-by-in-linq
            // @doc More group by - https://stackoverflow.com/questions/2697253/using-linq-to-group-a-list-of-objects-into-a-new-grouped-list-of-list-of-objects
            // @doc MSDN Linq examples - https://msdn.microsoft.com/en-us/library/gg509017.aspx
            //
        public TranslationDb Context{ get; private set; }
        public TranslationSetRepository() { Context = new TranslationDb { };  }

    	public void Dispose() { Context.Dispose();  }
    }
}