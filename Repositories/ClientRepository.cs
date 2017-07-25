using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

using OrdBaseCore.Models;
using OrdBaseCore.IData;

namespace OrdBaseCore.Repositories
{
    public class ClientRepository : IClientData
    {
        private readonly TranslationDb _context;

        public ClientRepository(TranslationDb context) 
        { 
            _context = context; 
        }

        //
        // GET
        // 
        public IEnumerable<Client> Get(string name) 
        {
        	return (from c in _context.Client
        			where c.Key == name
        			select c)
        				.ToArray();
        } 

        public IEnumerable<Client> GetAll() 
        {
        	return _context.Client.ToArray();
        }

        //
        // CREATE
        //
        public IActionResult Create(Client client)  
        {
            _context.Client.Add(client);
            _context.SaveChanges();
            return new NoContentResult {};
        }

        public IActionResult CreateDefaultContainers(string clientKey, IEnumerable<string> defaultContainers)
        {
            defaultContainers.Select(containerKey =>
                _context.Translation.Add(new Translation{
                    ClientKey    = clientKey,
                    LanguageKey  = "default",
                    ContainerKey = containerKey,
                    Key          = "default",
                    Text         = "default",
                    IsComplete   = true,
                })
            );  
            _context.SaveChanges();
            return new NoContentResult {};
        }
        public IActionResult CreateDefaultLanguages(string clientKey, IEnumerable<string> defaultLanguages)
        {

            defaultLanguages.Select(languageKey =>
                _context.Translation.Add(new Translation{
                    ClientKey    = clientKey,
                    LanguageKey  = languageKey,
                    ContainerKey = "default",
                    Key          = "default",
                    Text         = "default",
                    IsComplete   = true,
                })
            );  
            _context.SaveChanges();
            return new NoContentResult {};            
        }

        //
        // TESTDATA
        //
        public static void AddTestData(TranslationDb context)
        {
            context.Client.AddRange(
                new Client { Key = "FMSF",         ApiKey = "1"},
                new Client { Key = "DIFI",         ApiKey = "2"},
                new Client { Key = "Skatteetaten", ApiKey = "3"}
            );
            context.SaveChanges();
        }
    }
}