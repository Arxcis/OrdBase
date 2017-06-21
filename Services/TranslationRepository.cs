using System.Linq;

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
            AddTestData(_context); 
        }
        public Translation[] Get (string client, string language, string container, string accessKey)
        {
            return (from t in _context.Translation

                    where t.ClientName == client &&
                          t.LanguageShortName == language &&
                          t.Container == container &&
                          t.AccessKey == accessKey

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
        
        public Translation[] GetOnContainer (string client, string container) 
        {
            return (from t in _context.Translation

                    where t.ClientName == client &&
                          t.Container == container
                    select t)
                        .ToArray();
        }

        public Translation[] GetOnContainer (string client, string language, string container) 
        {
            return (from t in _context.Translation

                    where t.ClientName == client &&
                          t.LanguageShortName == language &&
                          t.Container == container
                    select t)
                        .ToArray();
        }

        public Translation[] GetOnAccessKey(string client, string accesskey)
        {
            return (from t in _context.Translation

                    where t.ClientName == client &&
                          t.AccessKey == accesskey
                    select t)
                        .ToArray();
        }

        public Translation[] GetOnLanguage(string client, string language)
        {
            return (from t in _context.Translation

                    where t.ClientName == client &&
                          t.LanguageShortName == language
                    select t)
                        .ToArray();
        }

        private void AddTestData(TranslationDb context) 
        { 
            context.AddRange( 
                new Translation {  ClientName = "FMSF", LanguageShortName = "en",  Container = "Main"   , AccessKey = "hello_world",  Text = "Hello World"   , IsComplete = true,  },
                new Translation {  ClientName = "FMSF", LanguageShortName = "no-nb",  Container = "Main"   , AccessKey = "hello_world",  Text = "Hallo verden"  , IsComplete = false, },
                new Translation {  ClientName = "DIFI", LanguageShortName = "en",  Container = "Special", AccessKey = "this_is_me",   Text = "This is me!"   , IsComplete = false, },
                new Translation {  ClientName = "DIFI", LanguageShortName = "no-nb",  Container = "Special", AccessKey = "this_is_me",   Text = "Dette er meg!" , IsComplete = true,  }
            );
            context.SaveChanges();
        }
    }
}