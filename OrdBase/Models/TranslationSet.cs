using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBase.Models
{
    public class TranslationSet
    {
        [Key]
        public int TranslationSetId { get; set; }                        // Primary key - API Accecss key

        [ForeignKey("RegisteredClient")]
        public int RegisteredClientId { get; set; } 
        public RegisteredClient RegisteredClient { get; set; }

        // @doc Foreign key collections - http://www.entityframeworktutorial.net/code-first/foreignkey-dataannotations-attribute-in-code-first.aspx
        public IList<Translation> Translations { get; set; }    
    }
}