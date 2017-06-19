using System.Collections.Generic;
using OrdBase.Models;

namespace OrdBase.ViewModels
{
    //
    // @class AppViewModel
    //  @brief The shared state that the App needs across SelectorView and EditorView
    //
	public class AppViewModel 
	{
        public string ClientName { get; set; }
        public int TranslationCount { get; set; }
        public int TranslationCompleteCount { get; set; }
	}
}