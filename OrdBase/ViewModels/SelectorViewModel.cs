using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using OrdBase.Models;

namespace OrdBase.ViewModels
{

    //
    // @class SelectorViewModel
    //  @brief Simply all the data that the SelectorView will need, in the correct format.
    //
    public class SelectorViewModel
    {
        public List<string> ClientCategory { get; set; }
        public List<TranslationSet> TranslationSets { get; set; }  
    }
}