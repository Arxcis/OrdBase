using System;

namespace OrdBase.Models 
{
	public class Translation 
	{
		public int TranslationId { get; set; }
		public int LanguageId { get; set; }
		public int RegisteredClientId { get; set; }

		public string Key { get; set; }
		public string Value { get; set; }

		public virtual Language Language { get; set; }
		public virtual RegisteredClient RegisteredClient { get; set; }
	}
}