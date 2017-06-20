using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBase.Models
{
	public class Language 
	{
        //
        // @example: en, no, no-nn, ger
        // @doc HTML lan codes: https://www.w3schools.com/tags/ref_language_codes.asp
        //
        [MaxLength(7), MinLength(2)]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string ShortName { get; set; } 

        [Required]
        [MaxLength(32), MinLength(0)]
        [Index(IsUnique = true)]
        public string Name { get; set; }
	}
}