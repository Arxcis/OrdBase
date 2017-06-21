namespace OrdBase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TranslationDb2 : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.RegisteredClients", newName: "Clients");
            DropForeignKey("dbo.Categories", "ClientName", "dbo.RegisteredClients");
            DropIndex("dbo.Categories", "IndexClientCategories");
            DropPrimaryKey("dbo.Translations");
            AddColumn("dbo.Translations", "Namespace", c => c.String(nullable: false, maxLength: 32));
            AddPrimaryKey("dbo.Translations", new[] { "ClientName", "LanguageShortName", "Namespace", "AccessKey" });
            DropTable("dbo.Categories");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        ClientName = c.String(nullable: false, maxLength: 32),
                        AccessKey = c.String(nullable: false, maxLength: 32),
                        Name = c.String(nullable: false, maxLength: 32),
                    })
                .PrimaryKey(t => new { t.ClientName, t.AccessKey, t.Name });
            
            DropPrimaryKey("dbo.Translations");
            DropColumn("dbo.Translations", "Namespace");
            AddPrimaryKey("dbo.Translations", new[] { "ClientName", "AccessKey", "LanguageShortName" });
            CreateIndex("dbo.Categories", new[] { "ClientName", "Name" }, unique: true, name: "IndexClientCategories");
            AddForeignKey("dbo.Categories", "ClientName", "dbo.RegisteredClients", "Name");
            RenameTable(name: "dbo.Clients", newName: "RegisteredClients");
        }
    }
}
