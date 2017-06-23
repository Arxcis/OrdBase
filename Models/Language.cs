using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBaseCore.Models
{
	public class Language 
	{
                //
                // @example: en, no, no-nn, ger
                // @doc HTML lan codes: https://www.w3schools.com/tags/ref_language_codes.asp
                //
                [Key]
                [StringLength(8)]
                [DatabaseGenerated(DatabaseGeneratedOption.None)]
                public string Short { get; set; } 

                [Required]
                [StringLength(32)]
                public string Name { get; set; }
	}
}