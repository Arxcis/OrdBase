using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrdBaseCore.Models {

    public class Container {

        [Key]
        [StringLength(64)]
        public string ContainerKey { get; set; } 

        // @brief Setting up many to many navigation property
        public virtual List<ClientContainer> Clients { get; set; } 

    }  
}