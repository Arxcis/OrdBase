using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBaseCore.Models 
{   
    public class Translation
    {
        [ForeignKey("ClientNav")]
        [StringLength(16)]
        public string CId { get; set; } // ClientName
        protected virtual Client ClientNav { get; set; }

        [ForeignKey("LanguageNav")]
        [StringLength(8)]
        public string Lang { get; set; } // LanguageShortName
        protected virtual Language LanguageNav { get; set; }

        [StringLength(16)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Box { get; set; }
        
        [Column(Order = 4)]
        [StringLength(16)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Key { get; set; } // AccessKey

        [StringLength(255)]
        [Required]
        public string Txt { get; set; }
        
        [Required]
        public bool Ok { get; set; } // IsComplete
    }
}