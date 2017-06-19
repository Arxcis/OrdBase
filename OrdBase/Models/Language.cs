using System.ComponentModel.DataAnnotations;

namespace OrdBase.Models
{
	public class Language 
	{
        [MaxLength(3), MinLength(3)] // NOR, SWE ...
        [Key]
        public string ShortName { get; set; } 

        [MaxLength(32), MinLength(0)]
        [Index(IsUnique = True)]
        public string Name { get; set; }
	}
}