using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using OrdBase.Models;

namespace OrdBase.ViewModels
{
    //
    // @class EditorViewModel
    //  @brief Simply all the data the EditorView will need, in the correct format.
    //
    public class EditorViewModel
    {
        public string TranslationKey { get; set; }
        
        public List<Category> TranslationCategories { get; set; }
        public List<Category> ClientCategories { get; set; }
    }
}