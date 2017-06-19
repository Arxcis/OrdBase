using System.ComponentModel.DataAnnotations;

namespace OrdBase.Models
{
	public class Language 
	{
        [Key]
		public uint LanguageId { get; set; }

        [Required]
		public string Name { get; set; }
        [Required]
        public string ShortName { get; set; } 
	}
}