namespace OrdBase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TranslationDb : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Languages", new[] { "Name" });
            AddColumn("dbo.RegisteredClients", "RequestCount", c => c.Int());
            AlterColumn("dbo.Languages", "Name", c => c.String(nullable: false, maxLength: 32));
            CreateIndex("dbo.Languages", "Name", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.Languages", new[] { "Name" });
            AlterColumn("dbo.Languages", "Name", c => c.String(maxLength: 32));
            DropColumn("dbo.RegisteredClients", "RequestCount");
            CreateIndex("dbo.Languages", "Name", unique: true);
        }
    }
}
