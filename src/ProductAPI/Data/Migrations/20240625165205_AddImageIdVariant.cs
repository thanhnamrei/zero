using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ProductAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddImageIdVariant : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "product_image_id",
                table: "product_variants",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "product_image",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    url = table.Column<string>(type: "text", nullable: false),
                    is_primary = table.Column<bool>(type: "boolean", nullable: false),
                    variant_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_product_image", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_product_variants_product_image_id",
                table: "product_variants",
                column: "product_image_id");

            migrationBuilder.AddForeignKey(
                name: "fk_product_variants_product_image_product_image_id",
                table: "product_variants",
                column: "product_image_id",
                principalTable: "product_image",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_product_variants_product_image_product_image_id",
                table: "product_variants");

            migrationBuilder.DropTable(
                name: "product_image");

            migrationBuilder.DropIndex(
                name: "ix_product_variants_product_image_id",
                table: "product_variants");

            migrationBuilder.DropColumn(
                name: "product_image_id",
                table: "product_variants");
        }
    }
}
