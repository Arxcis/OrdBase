
using System.Collections.Generic;
using OrdBase.Models;

namespace OrdBase.ViewModels
{
    public class TranslationSet
    {
        public string AccessKey { get; set; }
        public List<Category> Categories { get; set; }
        public List<Translation> Translations { get; set; }        
    }
}