using System;
using System.Linq;
using OrdBase.Models;

namespace OrdBase.Services
{
    public class TranslationRepository : IDataStore<Translation>, IDisposable
    {
        public TranslationDb Context{ get; }
        public TranslationRepository() { Context = new TranslationDb { };  }
        public void Dispose() { Context.Dispose(); }

        public Translation GetDummy() { return new Translation { }; }

        public Translation[] Get (string client, string language, string container, string accessKey)
        {
            return (from t in Context.Translation

                    where t.ClientName == client &&
                          t.LanguageShortName == language &&
                          t.Container == container &&
                          t.AccessKey == accessKey

                    select t)
                        .ToArray();        
        }

        public Translation[] GetOnClient   (string client)
        {
            return (from t in Context.Translation

                    where t.ClientName == client
                    select t)
                        .ToArray();
        }
        
        public Translation[] GetOnContainer (string client, string container) 
        {
            return (from t in Context.Translation

                    where t.ClientName == client &&
                          t.Container == container
                    select t)
                        .ToArray();
        }

        public Translation[] GetOnContainer (string client, string language, string container) 
        {
            return (from t in Context.Translation

                    where t.ClientName == client &&
                          t.LanguageShortName == language &&
                          t.Container == container
                    select t)
                        .ToArray();
        }

        public Translation[] GetOnAccessKey(string client, string accesskey)
        {
            return (from t in Context.Translation

                    where t.ClientName == client &&
                          t.AccessKey == accesskey
                    select t)
                        .ToArray();
        }

        public Translation[] GetOnLanguage(string client, string language)
        {
            return (from t in Context.Translation

                    where t.ClientName == client &&
                          t.LanguageShortName == language
                    select t)
                        .ToArray();
        }
    }
}