using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Api.Migrations
{
    /// <inheritdoc />
    public partial class FixOrderItemProductRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Products",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_Product_Id",
                table: "OrderItems",
                column: "Product_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Products_Product_Id",
                table: "OrderItems",
                column: "Product_Id",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Products_Product_Id",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_Product_Id",
                table: "OrderItems");

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Products",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");
        }
    }
}
