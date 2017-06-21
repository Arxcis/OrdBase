using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBaseCore.Models 
{   
    public class Translation
    {
        [ForeignKey("ClientNav")]
        [StringLength(32)]
        public string CId { get; set; } // ClientName
        protected virtual Client ClientNav { get; set; }

        [ForeignKey("LanguageNav")]
        [MaxLength(7), MinLength(2)]
        public string Lang { get; set; } // LanguageShortName
        protected virtual Language LanguageNav { get; set; }

        [StringLength(32)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Box { get; set; }
        
        [Column(Order = 4)]
        [StringLength(32)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Key { get; set; } // AccessKey


        [StringLength(2048)]
        [Required]
        public string Txt { get; set; }
        
        [Required]
        public bool Ok { get; set; } // IsComplete
    }
}