namespace OrdBase.ViewModels
{
    //
    // @class AppViewModel
    //  @brief The shared state that the App needs across SelectorView and EditorView
    //
	public class AppViewModel 
	{	
		public string AppName { get; set; }
		public string AccessLevel { get; set; }
        public string ClientName { get; set; }
	}
}