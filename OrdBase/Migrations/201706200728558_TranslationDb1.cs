namespace OrdBase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TranslationDb1 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Translations", "LanguageShortName", "dbo.Languages");
            DropIndex("dbo.Translations", new[] { "LanguageShortName" });
            DropPrimaryKey("dbo.Languages");
            DropPrimaryKey("dbo.Translations");
            AlterColumn("dbo.Languages", "ShortName", c => c.String(nullable: false, maxLength: 7));
            AlterColumn("dbo.Translations", "LanguageShortName", c => c.String(nullable: false, maxLength: 7));
            AddPrimaryKey("dbo.Languages", "ShortName");
            AddPrimaryKey("dbo.Translations", new[] { "ClientName", "AccessKey", "LanguageShortName" });
            CreateIndex("dbo.Translations", "LanguageShortName");
            AddForeignKey("dbo.Translations", "LanguageShortName", "dbo.Languages", "ShortName");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Translations", "LanguageShortName", "dbo.Languages");
            DropIndex("dbo.Translations", new[] { "LanguageShortName" });
            DropPrimaryKey("dbo.Translations");
            DropPrimaryKey("dbo.Languages");
            AlterColumn("dbo.Translations", "LanguageShortName", c => c.String(nullable: false, maxLength: 2));
            AlterColumn("dbo.Languages", "ShortName", c => c.String(nullable: false, maxLength: 2));
            AddPrimaryKey("dbo.Translations", new[] { "ClientName", "AccessKey", "LanguageShortName" });
            AddPrimaryKey("dbo.Languages", "ShortName");
            CreateIndex("dbo.Translations", "LanguageShortName");
            AddForeignKey("dbo.Translations", "LanguageShortName", "dbo.Languages", "ShortName");
        }
    }
}
