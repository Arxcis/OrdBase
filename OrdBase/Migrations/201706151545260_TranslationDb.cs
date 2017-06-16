namespace OrdBase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TranslationDb : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Languages",
                c => new
                    {
                        LanguageId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        ShortName = c.String(),
                    })
                .PrimaryKey(t => t.LanguageId);
            
            CreateTable(
                "dbo.RegisteredClients",
                c => new
                    {
                        RegisteredClientId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        ApiKey = c.String(),
                        LastAccess = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.RegisteredClientId);
            
            CreateTable(
                "dbo.StringCategories",
                c => new
                    {
                        StringCategoryId = c.Int(nullable: false, identity: true),
                        RegisteredClientId = c.Int(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.StringCategoryId)
                .ForeignKey("dbo.RegisteredClients", t => t.RegisteredClientId)
                .Index(t => t.RegisteredClientId);
            
            CreateTable(
                "dbo.Translations",
                c => new
                    {
                        TranslationId = c.Int(nullable: false, identity: true),
                        LanguageId = c.Int(nullable: false),
                        RegisteredClientId = c.Int(nullable: false),
                        Key = c.String(),
                        Value = c.String(),
                    })
                .PrimaryKey(t => t.TranslationId)
                .ForeignKey("dbo.Languages", t => t.LanguageId)
                .ForeignKey("dbo.RegisteredClients", t => t.RegisteredClientId)
                .Index(t => t.LanguageId)
                .Index(t => t.RegisteredClientId);
            
            CreateTable(
                "dbo.TranslationStringCategories",
                c => new
                    {
                        TranslationStringCategoryId = c.Int(nullable: false, identity: true),
                        StringCategoryId = c.Int(nullable: false),
                        TranslationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.TranslationStringCategoryId)
                .ForeignKey("dbo.StringCategories", t => t.StringCategoryId)
                .ForeignKey("dbo.Translations", t => t.TranslationId)
                .Index(t => t.StringCategoryId)
                .Index(t => t.TranslationId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TranslationStringCategories", "TranslationId", "dbo.Translations");
            DropForeignKey("dbo.TranslationStringCategories", "StringCategoryId", "dbo.StringCategories");
            DropForeignKey("dbo.Translations", "RegisteredClientId", "dbo.RegisteredClients");
            DropForeignKey("dbo.Translations", "LanguageId", "dbo.Languages");
            DropForeignKey("dbo.StringCategories", "RegisteredClientId", "dbo.RegisteredClients");
            DropIndex("dbo.TranslationStringCategories", new[] { "TranslationId" });
            DropIndex("dbo.TranslationStringCategories", new[] { "StringCategoryId" });
            DropIndex("dbo.Translations", new[] { "RegisteredClientId" });
            DropIndex("dbo.Translations", new[] { "LanguageId" });
            DropIndex("dbo.StringCategories", new[] { "RegisteredClientId" });
            DropTable("dbo.TranslationStringCategories");
            DropTable("dbo.Translations");
            DropTable("dbo.StringCategories");
            DropTable("dbo.RegisteredClients");
            DropTable("dbo.Languages");
        }
    }
}
