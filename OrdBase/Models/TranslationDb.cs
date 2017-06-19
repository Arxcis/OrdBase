//
// @Documentation Entity Framework
//  MSDN Annotaions         - https://msdn.microsoft.com/en-us/library/jj591583(v=vs.113).aspx
//  Foreign key collections - http://www.entityframeworktutorial.net/code-first/foreignkey-dataannotations-attribute-in-code-first.aspx
//  [Column]                - http://www.entityframeworktutorial.net/code-first/column-dataannotations-attribute-in-code-first.aspx
//  [Key]                   - http://www.entityframeworktutorial.net/code-first/key-dataannotations-attribute-in-code-first.aspx
//
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace OrdBase.Models 
{
    //
    // @brief Setting up Entity Framework tables
    // @doc page. 77, ASP.NET MVC 4
    //
    public class TranslationDb : DbContext
    {
        public DbSet<RegisteredClient> RegisteredClient { get; set; }
        public DbSet<Language> Language { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Translation> Translation { get; set; }

        //
        // @note The mess below is trying to prevent an error which occurs because of a foreign key pointing to mulitple other objects, OR
        //        multiple foreign keys are pointing to the same object.
        // @doc https://stackoverflow.com/questions/12868912/specify-on-delete-no-action-in-asp-net-mvc-4-c-sharp-code-first
        //
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {    
           modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
        }
    }
}