using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using OrdBase.Models;

namespace OrdBase.ViewModels
{
    //
    // @struct TranslationText
    //  @brief The language the translation is in, the translation text and if it is marked as complete or not.
    //
    public struct TranslationText
    {
        public Language Language { get; set; }
        public string Text { get; set; }
        public bool IsComplete { get; set; }
    }

    //
    // @class EditorViewModel
    //  @brief Simply all the data the EditorView will need, in the correct format.
    //
    public class EditorViewModel
    {
        public string TranslationKey { get; set; }
        public TranslationSet TranslationSet { get; set; }
        public List<Category> TranslationCategories { get; set; }
        public List<Category> ClientCategories { get; set; }
    }
}