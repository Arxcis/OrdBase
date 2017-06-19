using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBase.Models
{
    public class TranslationSet
    {
        [Key]
        public int TranslationSetId { get; set; }                        // Primary key - API Accecss key

        [InverseProperty("TranslationSetId")]
        public List<Translation> Translations { get; set; }    

        [InverseProperty("TranslationSetId")]
        public List<TranslationSetCategory> TranslationSetCategories { get; set; }
    }
}