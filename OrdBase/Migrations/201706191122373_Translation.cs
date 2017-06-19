namespace OrdBase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Translation : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.StringCategories", "RegisteredClientId", "dbo.RegisteredClients");
            DropForeignKey("dbo.TranslationStringCategories", "StringCategoryId", "dbo.StringCategories");
            DropForeignKey("dbo.TranslationStringCategories", "TranslationId", "dbo.Translations");
            DropIndex("dbo.StringCategories", new[] { "RegisteredClientId" });
            DropIndex("dbo.TranslationStringCategories", new[] { "StringCategoryId" });
            DropIndex("dbo.TranslationStringCategories", new[] { "TranslationId" });
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        CategoryId = c.Int(nullable: false, identity: true),
                        RegisteredClientId = c.Int(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.CategoryId)
                .ForeignKey("dbo.RegisteredClients", t => t.RegisteredClientId)
                .Index(t => t.RegisteredClientId);
            
            CreateTable(
                "dbo.TranslationCategories",
                c => new
                    {
                        TranslationCategoryId = c.Int(nullable: false, identity: true),
                        StringCategoryId = c.Int(nullable: false),
                        TranslationId = c.Int(nullable: false),
                        Category_CategoryId = c.Int(),
                    })
                .PrimaryKey(t => t.TranslationCategoryId)
                .ForeignKey("dbo.Categories", t => t.Category_CategoryId)
                .ForeignKey("dbo.Translations", t => t.TranslationId)
                .Index(t => t.TranslationId)
                .Index(t => t.Category_CategoryId);
            
            AddColumn("dbo.Translations", "Completed", c => c.Boolean(nullable: false));
            DropTable("dbo.StringCategories");
            DropTable("dbo.TranslationStringCategories");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.TranslationStringCategories",
                c => new
                    {
                        TranslationStringCategoryId = c.Int(nullable: false, identity: true),
                        StringCategoryId = c.Int(nullable: false),
                        TranslationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.TranslationStringCategoryId);
            
            CreateTable(
                "dbo.StringCategories",
                c => new
                    {
                        StringCategoryId = c.Int(nullable: false, identity: true),
                        RegisteredClientId = c.Int(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.StringCategoryId);
            
            DropForeignKey("dbo.TranslationCategories", "TranslationId", "dbo.Translations");
            DropForeignKey("dbo.TranslationCategories", "Category_CategoryId", "dbo.Categories");
            DropForeignKey("dbo.Categories", "RegisteredClientId", "dbo.RegisteredClients");
            DropIndex("dbo.TranslationCategories", new[] { "Category_CategoryId" });
            DropIndex("dbo.TranslationCategories", new[] { "TranslationId" });
            DropIndex("dbo.Categories", new[] { "RegisteredClientId" });
            DropColumn("dbo.Translations", "Completed");
            DropTable("dbo.TranslationCategories");
            DropTable("dbo.Categories");
            CreateIndex("dbo.TranslationStringCategories", "TranslationId");
            CreateIndex("dbo.TranslationStringCategories", "StringCategoryId");
            CreateIndex("dbo.StringCategories", "RegisteredClientId");
            AddForeignKey("dbo.TranslationStringCategories", "TranslationId", "dbo.Translations", "TranslationId");
            AddForeignKey("dbo.TranslationStringCategories", "StringCategoryId", "dbo.StringCategories", "StringCategoryId");
            AddForeignKey("dbo.StringCategories", "RegisteredClientId", "dbo.RegisteredClients", "RegisteredClientId");
        }
    }
}
