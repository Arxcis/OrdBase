using System;
using System.Data.Entity.Migrations;

using OrdBase.Models;

namespace OrdBase.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<OrdBase.Models.TranslationDb>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(OrdBase.Models.TranslationDb context)
        {
            context.Language.AddOrUpdate(
                new Language { LanguageId = 1, Name = "Norwegian", ShortName = "NOR" },
                new Language { LanguageId = 2, Name = "Swedish", ShortName = "SWE" },
                new Language { LanguageId = 3, Name = "Danish", ShortName = "DAN" },
                new Language { LanguageId = 4, Name = "English", ShortName = "EN" }
            );

            context.Category.AddOrUpdate(
                new Category { CategoryId = 1, RegisteredClientId = 1, Name = "HeaderText"},
                new Category { CategoryId = 2, RegisteredClientId = 1, Name = "MainText"},
                new Category { CategoryId = 3, RegisteredClientId = 1, Name = "FooterText"}
            );

            context.RegisteredClient.AddOrUpdate(
            
                new RegisteredClient { RegisteredClientId = 1, Name = "FMSF" ,  ApiKey = "238904239084390840java"  , LastAccess = new DateTime (2008, 10, 10 ) },
                new RegisteredClient { RegisteredClientId = 2, Name = "DIFI",   ApiKey = "238904239084390840csharp", LastAccess = new DateTime ( 2008, 12, 12 ) }
            );

            context.Translation.AddOrUpdate(
                
                // @wtf @buf - Why do I have to explicitly define Models.Translation here?? Is it a naming-conflict?
                new Models.Translation { TranslationId = 1, LanguageId = 4, RegisteredClientId = 1, Key = "hello_world", Value = "Hello World"   , IsComplete = false, },
                new Models.Translation { TranslationId = 2, LanguageId = 1, RegisteredClientId = 1, Key = "hello_world", Value = "Hallo verden"  , IsComplete = false, },
                new Models.Translation { TranslationId = 3, LanguageId = 4, RegisteredClientId = 1, Key = "this_is_me",  Value = "This is me!"   , IsComplete = false, },
                new Models.Translation { TranslationId = 4, LanguageId = 1, RegisteredClientId = 1, Key = "this_is_me",  Value = "Dette er meg!" , IsComplete = false, }
            );
            
        }
    }
}
