using System.Linq;

using OrdBaseCore.Models;
using OrdBaseCore.IData;

namespace OrdBaseCore.Services
{
	// 
	// @class LanguageRepository
	//  @brief Get language data
	//
    public class LanguageRepository : ILanguageData
    {
        private readonly TranslationDb _context;
        public LanguageRepository(TranslationDb context) 
        { 
            _context = context; 
        }
        public Language[] GetAll()
        {
            return _context.Language.ToArray();
        }

        public Language[] GetOnClient(string client)
        {
            return (from t in _context.Translation
                    join l in _context.Language on t.Lang equals l.Short
                    join c in _context.Client on t.ClientName equals c.Name
                    where c.Name == client
                    select l)
                        .ToArray();
        }
        
        public static void AddTestData(TranslationDb context) 
        {
            context.Language.AddRange(
                new Language { Name = "Norwegian", Short = "no-nb" },
                new Language { Name = "Swedish",   Short = "sv"    },
                new Language { Name = "Danish",    Short = "da"    },
                new Language { Name = "English",   Short = "en"    }
            );
            context.SaveChanges();
        }
    }
}