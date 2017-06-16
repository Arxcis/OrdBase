using System;

namespace OrdBase.Models 
{
	//
	// @note Meta-table
	//
	public class TranslationStringCategory
	{
		public int TranslationStringCategoryId { get; set; }
		public int StringCategoryId { get; set; }
		public int TranslationId { get; set; }

		public virtual StringCategory StringCategory { get; set; }
		public virtual Translation Translation { get; set; }
	}
}