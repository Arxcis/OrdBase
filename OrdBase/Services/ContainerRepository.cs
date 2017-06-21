using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using OrdBase.Models;

namespace OrdBase.Services
{	
	// 
	// @class ContainerRepository
	//  @brief Gets the names of containers
	//
    public class ContainerRepository : IDataStoreContainer
    {
        public TranslationDb Context{ get; private set; }
        public ContainerRepository() { Context = new TranslationDb { };  }

        public string[] Get(string client, string accesskey) 
        { 
            return (from t in Context.Translation

                    where t.ClientName == client &&
                          t.AccessKey == accesskey

                    group t by t.Container into grp
                    select grp.Key )
                        .ToArray();
        }

        public string[] GetOnClient(string client) 
        {
            return (from t in Context.Translation

                    where t.ClientName == client
                    select t.Container)
                        .ToArray();
        }
    }
}