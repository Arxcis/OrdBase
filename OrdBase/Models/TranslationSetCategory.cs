using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OrdBase.Models 
{
    //
    // @note Meta-table
    //  @doc [Column] - http://www.entityframeworktutorial.net/code-first/column-dataannotations-attribute-in-code-first.aspx
    //  @doc [Key]    - http://www.entityframeworktutorial.net/code-first/key-dataannotations-attribute-in-code-first.aspx
    //
    public class TranslationSetCategory
	{
        [Key]
        [Column(Order=1)]
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        [Key]
        [Column(Order=2)]
        [ForeignKey("TranslationSet")]
        public int TranslationSetId { get; set; }
        public TranslationSet TranslationSet { get; set; }
    }
}