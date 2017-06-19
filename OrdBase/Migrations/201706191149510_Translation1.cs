namespace OrdBase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Translation1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Translations", "IsComplete", c => c.Boolean(nullable: false));
            DropColumn("dbo.Translations", "Completed");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Translations", "Completed", c => c.Boolean(nullable: false));
            DropColumn("dbo.Translations", "IsComplete");
        }
    }
}
