using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Collections.Generic;

using OrdBaseCore.Models;
using OrdBaseCore.IData;

namespace OrdBaseCore.Services
{
    public class TranslationRepository : ITranslationData
    {
        private readonly TranslationDb _context;
                
        public TranslationRepository(TranslationDb context) 
        { 
            _context = context; 
        }
        public Translation[] Get (string client, string language, string container, string accessKey)
        {
            return (from t in _context.Translation

                    where t.ClientName == client &&
                          t.Lang == language &&
                          t.Container == container &&
                          t.Key == accessKey

                    select t)
                        .ToArray();        
        }

        public Translation[] GetOnClient   (string client)
        {
            return (from t in _context.Translation

                    where t.ClientName == client
                    select t)
                        .ToArray();
        }
        
        public IQueryable<object> GetOnContainer (string client, string container) 
        {
            return (from t in _context.Translation

                    where t.ClientName == client &&
                          t.Container == container
                    select new {
                        key = t.Key,
                        Text = t.Text,
                        }
                    );
        }

         public Dictionary<string,string> GetOnContainer (string client, string language, string container) 
        {
            return (from t in _context.Translation

                    where t.ClientName == client &&
                          t.Lang == language &&
                          t.Container == container
                    select t)
                        .ToDictionary(o => o.Key, o => o.Text);
                       
            
           // return  x.ToDictionary(p => p.AccessKey, p => p.Text);    
        }

        public Translation[] GetOnAccessKey(string client, string accesskey)
        {
            return (from t in _context.Translation

                    where t.ClientName == client &&
                          t.Key == accesskey
                    select t)
                        .ToArray();
        }

        public Translation[] GetOnLanguage(string client, string language)
        {
            return (from t in _context.Translation

                    where t.ClientName == client &&
                          t.Lang == language
                    select t)
                        .ToArray();
        }


        //
        // POST - Create, update, delete
        //
        public IActionResult Create(Translation translation) 
        {
            _context.Translation.Add(translation);
            _context.SaveChanges();
            return new CreatedAtRouteResult ("api/{client}/translation/{container}/{accessKey}/{language}",
                                new { client = translation.ClientName, 
                                      container = translation.Container, 
                                      accessKey = translation.Key,
                                      language = translation.Lang }, 
                                translation);
        }

        public IActionResult Update(Translation item) 
        {   
            // @note - Documentation suggest using FirstOrDefault here. I Do not fully understand what default means in this context - JSolsvik 23.06.17
            var translation = _context.Translation.First(
                t => t.ClientName == item.ClientName &&
                     t.Lang == item.Lang &&
                     t.Container == item.Container &&
                     t.Key == item.Key);

            if (translation == null) 
            {
                return new NotFoundResult {};
            }

            translation.Text = translation.Text;
            translation.Ok = translation.Ok;
            
            _context.Translation.Update(translation);
            _context.SaveChanges();
            return new NoContentResult {};
        }

        public IActionResult Delete(string client, string language, string container, string accesskey) 
        {   
            var translation = _context.Translation.First(
                t => t.ClientName == client &&
                     t.Lang == language &&
                     t.Container == container &&
                     t.Key == accesskey);    
            
            if (translation == null)
            {
                return new NotFoundResult {};
            }

            _context.Translation.Remove(translation);
            _context.SaveChanges();
            return new NoContentResult {};
        }

        //
        // TESTDATA add
        //
        public static void AddTestData(TranslationDb context) 
        { 
            context.Translation.AddRange( 
                new Translation {  ClientName = "FMSF", Lang = "en",     Container = "Main"   , Key = "hello_world",  Text = "Hello World"   , Ok = true,  },
                new Translation {  ClientName = "FMSF", Lang = "no-nb",  Container = "Main"   , Key = "hello_world",  Text = "Hallo verden"  , Ok = false, },
                new Translation {  ClientName = "DIFI", Lang = "en",     Container = "Special", Key = "this_is_me",   Text = "This is me!"   , Ok = false, },
                new Translation {  ClientName = "DIFI", Lang = "no-nb",  Container = "Special", Key = "this_is_me",   Text = "Dette er meg!" , Ok = true,  }
            );
            context.SaveChanges();
        }
    }
}