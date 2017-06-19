using System.ComponentModel.DataAnnotations;

namespace OrdBase.Models
{
	public class Language 
	{
        [Key]
        [MaxLength(3), MinLength(3)] // NOR, SWE ...
        public string ShortName { get; set; } 

        [Index(IsUnique = True)]
        public string Name { get; set; }
	}
}