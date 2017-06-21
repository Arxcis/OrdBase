using System.Linq;

using OrdBaseCore.Models;
using OrdBaseCore.IData;

namespace OrdBaseCore.Services
{
    public class TranslationRepository : ITranslationData
    {
        private readonly TranslationDb _context;
        public TranslationRepository(TranslationDb context) 
        { _context = context; }

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
    }
}