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
                _context.ClientContainer.Add( new ClientContainer 
                {
                    ClientKey = clientKey,
                    ContainerKey = containerKey,
                })
            );

            _context.SaveChanges();
            return new NoContentResult {};
        }
        public IActionResult CreateDefaultLanguages(string clientKey, IEnumerable<string> defaultLanguages)
        {
            defaultLanguages.Select(languageKey =>
                _context.ClientLanguage.Add( new ClientLanguage 
                {
                    ClientKey = clientKey,
                    LanguageKey = languageKey,
                })
            );

            _context.SaveChanges();
            return new NoContentResult {};            
        }

        //
        // @note On these two methods i am just flushing the old containers down the toilet replacing them with a new set.
        //       There are many possibilities here and the way I have done it should probably be revised at some point,
        //        but it was simple to implement and easy to understand. JSolsvik - 25.07.17
        //
        public IActionResult UpdateDefaultContainers(string clientKey, IEnumerable<string> defaultContainers) 
        {

            var newDefaultClientContainers = defaultContainers.Select(dc => new ClientContainer { ClientKey = clientKey, ContainerKey = dc });
            var oldDefaultClientContainers = (from dcc in _context.ClientContainer
                                             where dcc.ClientKey == clientKey
                                             select dcc);

            _context.ClientContainer.RemoveRange(oldDefaultClientContainers);
            _context.ClientContainer.AddRange(newDefaultClientContainers);
            _context.SaveChanges();
            return new NoContentResult {};            
        }
        
        public IActionResult UpdateDefaultLanguages(string clientKey, IEnumerable<string> defaultLanguages) 
        {
            
            var newDefaultClientLanguages = defaultLanguages.Select(dl => new ClientLanguage { ClientKey = clientKey, LanguageKey = dl });
            var oldDefaultClientLanguages = (from dcl in _context.ClientLanguage
                                             where dcl.ClientKey == clientKey
                                             select dcl);

            _context.ClientLanguage.RemoveRange(oldDefaultClientLanguages);
            _context.ClientLanguage.AddRange(newDefaultClientLanguages);
            _context.SaveChanges();
            return new NoContentResult {};            
        }
        

        //
        // TESTDATA
        //
        public static void AddTestData(TranslationDb context)
        {
            context.Client.AddRange(
                new Client { Key = "FMSF",         ApiKey = "1", ThumbnailUrl = "http://placehold.it/250x125/FFC107", WebpageUrl = "https://fmsf.plaholder.magic"},
                new Client { Key = "DIFI",         ApiKey = "2", ThumbnailUrl = "http://placehold.it/250x125/FFC107", WebpageUrl = "https://difi.plaholder.magic"},
                new Client { Key = "Skatteetaten", ApiKey = "3", ThumbnailUrl = "http://placehold.it/250x125/FFC107", WebpageUrl = "https://skatteetaten.plaholder.magic"}
            );
            context.SaveChanges();
        }
    }
}