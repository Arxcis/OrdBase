using System;

using OrdBase.Models;
using OrdBase.IDataStores;

namespace OrdBase.Services
{
    public class ClientRepository : IDataStoreClient
    {
        public readonly TranslationDb Context{ get; }
        public ClientRepository() { Context = new TranslationDb { };  }

        public Client[] Get(string name) 
        {
        	return (from c in Context.Client
        			where c.Name == name
        			select c)
        				.ToArray();
        } 

        public Client[] GetAll() 
        {
        	return Context.Client.ToArray();
        }
    }
}