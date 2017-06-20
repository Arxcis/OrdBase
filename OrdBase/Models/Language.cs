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
        [Key]
        [MaxLength(7), MinLength(2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string ShortName { get; set; } 

        [Required]
        [StringLength(32)]
        [Index(IsUnique = true)]
        public string Name { get; set; }
	}
}