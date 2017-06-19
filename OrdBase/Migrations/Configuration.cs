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
            var language1 = new Language { Name = "Norwegian", ShortName = "NOR" };
            var language2 = new Language { Name = "Swedish",   ShortName = "SWE" };
            var language3 = new Language { Name = "Danish",    ShortName = "DAN" };
            var language4 = new Language { Name = "English",   ShortName = "EN"  };

            context.Language.AddOrUpdate( language1, language2, language3, language4 );

            var client1 = new RegisteredClient { Name = "FMSF" , ApiKey = "1"};
            var client2 = new RegisteredClient { Name = "DIFI" , ApiKey = "2"};

            context.RegisteredClient.AddOrUpdate( client1, client2 );

            var category1 = new Category { Name = "Front Page" , RegisteredClient = Client1 };
            var category3 = new Category { Name = "Editor" ,     RegisteredClient = Client1 };
            var category2 = new Category { Name = "Front Page",  RegisteredClient = Client2 };
            var category4 = new Category { Name = "Editor" ,     RegisteredClient = Client2 };

            context.Category.AddOrUpdate( category1, category2, category3, category4);

            var translation1 = new Models.Translation {  RegisteredClient = client1, AccessKey = "hello_world", Language = language4, Text = "Hello World"   , IsComplete = true,  };
            var translation2 = new Models.Translation {  RegisteredClient = client1, AccessKey = "hello_world", Language = language1, Text = "Hallo verden"  , IsComplete = false, };
            var translation3 = new Models.Translation {  RegisteredClient = client2, AccessKey = "this_is_me",  Language = language4, Text = "This is me!"   , IsComplete = false, };
            var translation4 = new Models.Translation {  RegisteredClient = client2, AccessKey = "this_is_me",  Language = language1, Text = "Dette er meg!" , IsComplete = true,  };
            
            context.Translation.AddOrUpdate( translation1, translation2, translation3, translation4);
        }
    }
}
