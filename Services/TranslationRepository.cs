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

                    where t.CId == client &&
                          t.Lang == language &&
                          t.Box == container &&
                          t.Key == accessKey

                    select t)
                        .ToArray();        
        }

        public Translation[] GetOnClient   (string client)
        {
            return (from t in _context.Translation

                    where t.CId == client
                    select t)
                        .ToArray();
        }
        
        public IQueryable<object> GetOnContainer (string client, string container) 
        {
            return (from t in _context.Translation

                    where t.CId == client &&
                          t.Box == container
                    select new {
                        key = t.Key,
                        txt = t.Txt,
                        }
                    );
        }

         public Dictionary<string,string> GetOnContainer (string client, string language, string container) 
        {
            return (from t in _context.Translation

                    where t.CId == client &&
                          t.Lang == language &&
                          t.Box == container
                    select t)
                        .ToDictionary(o => o.Key, o => o.Txt);
                       
            
           // return  x.ToDictionary(p => p.AccessKey, p => p.Text);    
        }

        public Translation[] GetOnAccessKey(string client, string accesskey)
        {
            return (from t in _context.Translation

                    where t.CId == client &&
                          t.Key == accesskey
                    select t)
                        .ToArray();
        }

        public Translation[] GetOnLanguage(string client, string language)
        {
            return (from t in _context.Translation

                    where t.CId == client &&
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
                                new { client = translation.CId, 
                                      container = translation.Box, 
                                      accessKey = translation.Key,
                                      language = translation.Lang }, 
                                translation);
        }

        public IActionResult Update(Translation item) 
        {   
            var translation = _context.Translation.FirstOrDefault(
                t => t.CId == item.CId &&
                     t.Lang == item.Lang &&
                     t.Box == item.Box &&
                     t.Key == item.Key);

            if (translation == null) 
            {
                return new NotFoundResult();
            }

            translation.Txt = translation.Txt;
            translation.Ok = translation.Ok;
            
            _context.Translation.Update(translation);
            _context.SaveChanges();
            return new NoContentResult();
        }

        //
        // TESTDATA add
        //
        public static void AddTestData(TranslationDb context) 
        { 
            context.Translation.AddRange( 
                new Translation {  CId = "FMSF", Lang = "en",     Box = "Main"   , Key = "hello_world",  Txt = "Hello World"   , Ok = true,  },
                new Translation {  CId = "FMSF", Lang = "no-nb",  Box = "Main"   , Key = "hello_world",  Txt = "Hallo verden"  , Ok = false, },
                new Translation {  CId = "DIFI", Lang = "en",     Box = "Special", Key = "this_is_me",   Txt = "This is me!"   , Ok = false, },
                new Translation {  CId = "DIFI", Lang = "no-nb",  Box = "Special", Key = "this_is_me",   Txt = "Dette er meg!" , Ok = true,  }
            );
            context.SaveChanges();
        }
    }
}