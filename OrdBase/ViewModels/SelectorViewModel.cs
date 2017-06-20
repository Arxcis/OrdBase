
using System.Collections.Generic;
using OrdBase.Models;

namespace OrdBase.ViewModels
{

    //
    // @class SelectorViewModel
    //  @brief For the SelectorView we need the following properties:
    //           - A column of all the categories for the given client
    //           - A column of all the translation sets, for the given client.
    //
    public class SelectorViewModel
    {
        public List<string> ClientCategories { get; set; }
        public List<TranslationSet> TranslationSets { get; set; }
    }
}