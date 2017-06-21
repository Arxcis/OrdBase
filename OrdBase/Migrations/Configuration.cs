using System;
using System.Data.Entity.Migrations;
using System.Data.Entity.Validation;

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
            try { 
                //
                // @doc html lan codes - https://www.w3schools.com/tags/ref_language_codes.asp
                //
                var language1 = new Language { Name = "Norwegian", ShortName = "no-nb" };
                var language2 = new Language { Name = "Swedish",   ShortName = "sv"    };
                var language3 = new Language { Name = "Danish",    ShortName = "da"    };
                var language4 = new Language { Name = "English",   ShortName = "en"    };

                context.Language.AddOrUpdate( language1, language2, language3, language4 );

                var client1 = new Client { Name = "FMSF" , ApiKey = "1"};
                var client2 = new Client { Name = "DIFI" , ApiKey = "2"};

                context.Client.AddOrUpdate( client1, client2 );

                var translation1 = new Models.Translation {  Client = client1, Language = language4,  Namespace = "Main"   , AccessKey = "hello_world",  Text = "Hello World"   , IsComplete = true,  };
                var translation2 = new Models.Translation {  Client = client1, Language = language1,  Namespace = "Main"   , AccessKey = "hello_world",  Text = "Hallo verden"  , IsComplete = false, };
                var translation3 = new Models.Translation {  Client = client2, Language = language4,  Namespace = "Special", AccessKey = "this_is_me",   Text = "This is me!"   , IsComplete = false, };
                var translation4 = new Models.Translation {  Client = client2, Language = language1,  Namespace = "Special", AccessKey = "this_is_me",   Text = "Dette er meg!" , IsComplete = true,  };
            
                context.Translation.AddOrUpdate( translation1, translation2, translation3, translation4);

                context.SaveChanges();

            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }
        }
    }
}
