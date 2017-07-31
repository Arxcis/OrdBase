using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

using OrdBaseCore.Models;
using OrdBaseCore.IData;

// @doc Better to use where to check for exist only https://github.com/aspnet/EntityFramework/issues/7064

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
        public IEnumerable<Client> Get(ClientQuery query) 
        {
        	return (from c in _context.Client
        			where c.Key == query.ClientKey
        			select c)
        			.ToArray();
        } 

        public IEnumerable<string> GetContainers(ClientQuery query)
        {
            return (from cl in _context.ClientContainer
                    where cl.ClientKey == query.ClientKey
                    select cl.ContainerKey)
                    .ToArray();
        }     

        public IEnumerable<string> GetLanguages(ClientQuery query)
        {
            return (from cl in _context.ClientLanguage
                    where cl.ClientKey == query.ClientKey
                    select cl.LanguageKey)
                    .ToArray();
        }

        //
        // CREATE, Update, delete
        //
        public IActionResult Create(Client client)  
        {
            _context.Client.Add(client);
            _context.SaveChanges();
            return new NoContentResult {};
        }

        public IActionResult Update(ClientQuery query, Client client) 
        {
            // @note Do some research into if there is any better cleaner way to update entry in the database. -JSolsvik 26.07.17
            var _client = _context.Client.First(c => c.Key == query.ClientKey);

            if (_client == null)
                return new NotFoundResult {};

            _client.Key          = client.Key;
            _client.ApiKey       = client.ApiKey;
            _client.WebpageUrl   = client.WebpageUrl;
            _client.ThumbnailUrl = client.ThumbnailUrl;

            _context.Client.Update(_client);
            _context.SaveChanges();
            return new NoContentResult {};   
        }

        public IActionResult Delete(ClientQuery query) 
        {
            var client = _context.Client.First(c => c.Key == query.ClientKey);
            
            if (client == null)
                return new NotFoundResult {};

            _context.Client.Remove(client);
            _context.SaveChanges();
            return new NoContentResult {};
        }

        //
        // SET containers and langugaes on client
        //
        public IActionResult SetContainers(ClientQuery query, IEnumerable<string> containerArray)
        {

            var _clientContainers = _context.ClientContainer.Where(cc => cc.ClientKey == query.ClientKey);
            _context.RemoveRange(_clientContainers);
            _context.SaveChanges();

            var clientContainers = containerArray.Select(containerKey => new ClientContainer 
            { 
                ClientKey = clientKey, 
                ContainerKey = containerKey,
            });

            _context.AddRange(clientContainers);
            _context.SaveChanges();
            return new NoContentResult {};
        }
        public IActionResult SetLanguages(ClientQuery query, IEnumerable<string> languageArray)
        {
            var _clientLanguages = _context.ClientLanguage.Where(cl => cl.ClientKey == query.ClientKey);
            _context.RemoveRange(_clientLanguages);
            _context.SaveChanges();

            var clientLanguages = languageArray.Select(languageKey => new ClientLanguage 
            { 
                ClientKey   = query.ClientKey, 
                LanguageKey = languageKey,
            });

            _context.AddRange(clientLanguages);
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