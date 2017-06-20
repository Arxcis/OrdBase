namespace OrdBase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Translation : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        ClientName = c.String(nullable: false, maxLength: 32),
                        AccessKey = c.String(nullable: false, maxLength: 32),
                        Name = c.String(nullable: false, maxLength: 32),
                    })
                .PrimaryKey(t => new { t.ClientName, t.AccessKey, t.Name })
                .ForeignKey("dbo.RegisteredClients", t => t.ClientName)
                .Index(t => new { t.ClientName, t.Name }, unique: true, name: "IndexClientCategories");
            
            CreateTable(
                "dbo.RegisteredClients",
                c => new
                    {
                        Name = c.String(nullable: false, maxLength: 32),
                        ApiKey = c.String(maxLength: 64),
                        LastAccess = c.DateTime(),
                    })
                .PrimaryKey(t => t.Name)
                .Index(t => t.ApiKey, unique: true);
            
            CreateTable(
                "dbo.Languages",
                c => new
                    {
                        ShortName = c.String(nullable: false, maxLength: 2),
                        Name = c.String(maxLength: 32),
                    })
                .PrimaryKey(t => t.ShortName)
                .Index(t => t.Name, unique: true);
            
            CreateTable(
                "dbo.Translations",
                c => new
                    {
                        ClientName = c.String(nullable: false, maxLength: 32),
                        AccessKey = c.String(nullable: false, maxLength: 32),
                        LanguageShortName = c.String(nullable: false, maxLength: 2),
                        Text = c.String(nullable: false, maxLength: 2048),
                        IsComplete = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => new { t.ClientName, t.AccessKey, t.LanguageShortName })
                .ForeignKey("dbo.Languages", t => t.LanguageShortName)
                .ForeignKey("dbo.RegisteredClients", t => t.ClientName)
                .Index(t => t.ClientName)
                .Index(t => t.LanguageShortName);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Translations", "ClientName", "dbo.RegisteredClients");
            DropForeignKey("dbo.Translations", "LanguageShortName", "dbo.Languages");
            DropForeignKey("dbo.Categories", "ClientName", "dbo.RegisteredClients");
            DropIndex("dbo.Translations", new[] { "LanguageShortName" });
            DropIndex("dbo.Translations", new[] { "ClientName" });
            DropIndex("dbo.Languages", new[] { "Name" });
            DropIndex("dbo.RegisteredClients", new[] { "ApiKey" });
            DropIndex("dbo.Categories", "IndexClientCategories");
            DropTable("dbo.Translations");
            DropTable("dbo.Languages");
            DropTable("dbo.RegisteredClients");
            DropTable("dbo.Categories");
        }
    }
}
