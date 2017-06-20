
using System.Collections.Generic;
using OrdBase.Models;

namespace OrdBase.ViewModels
{
    //
    // @class EditorViewModel
    //  @brief For the EditorView we need the following data attributes:
    //          - A collection of all the categories given the client.
    //          - A collection of all the categories given the translation.
    //          - A translation set, consisting of all translations for the given accesskey
    //          - AccessKey
    //
    public class EditorViewModel
    {
        public TranslationSet TranslationSet { get; set; }
        public List<string> ClientCategories { get; set; }
    }
}