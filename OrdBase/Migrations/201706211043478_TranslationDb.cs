namespace OrdBase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TranslationDb : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Clients",
                c => new
                    {
                        Name = c.String(nullable: false, maxLength: 32),
                        ApiKey = c.String(maxLength: 64),
                        LastAccess = c.DateTime(),
                        RequestCount = c.Int(),
                    })
                .PrimaryKey(t => t.Name)
                .Index(t => t.ApiKey, unique: true);
            
            CreateTable(
                "dbo.Languages",
                c => new
                    {
                        ShortName = c.String(nullable: false, maxLength: 7),
                        Name = c.String(nullable: false, maxLength: 32),
                    })
                .PrimaryKey(t => t.ShortName)
                .Index(t => t.Name, unique: true);
            
            CreateTable(
                "dbo.Translations",
                c => new
                    {
                        ClientName = c.String(nullable: false, maxLength: 32),
                        LanguageShortName = c.String(nullable: false, maxLength: 7),
                        Container = c.String(nullable: false, maxLength: 32),
                        AccessKey = c.String(nullable: false, maxLength: 32),
                        Text = c.String(nullable: false, maxLength: 2048),
                        IsComplete = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => new { t.ClientName, t.LanguageShortName, t.Container, t.AccessKey })
                .ForeignKey("dbo.Clients", t => t.ClientName)
                .ForeignKey("dbo.Languages", t => t.LanguageShortName)
                .Index(t => t.ClientName)
                .Index(t => t.LanguageShortName);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Translations", "LanguageShortName", "dbo.Languages");
            DropForeignKey("dbo.Translations", "ClientName", "dbo.Clients");
            DropIndex("dbo.Translations", new[] { "LanguageShortName" });
            DropIndex("dbo.Translations", new[] { "ClientName" });
            DropIndex("dbo.Languages", new[] { "Name" });
            DropIndex("dbo.Clients", new[] { "ApiKey" });
            DropTable("dbo.Translations");
            DropTable("dbo.Languages");
            DropTable("dbo.Clients");
        }
    }
}
