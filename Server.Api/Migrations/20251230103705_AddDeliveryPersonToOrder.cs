using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddDeliveryPersonToOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "deliveryPersonId",
                table: "Orders",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_deliveryPersonId",
                table: "Orders",
                column: "deliveryPersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_deliveryPersonId",
                table: "Orders",
                column: "deliveryPersonId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_deliveryPersonId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_deliveryPersonId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "deliveryPersonId",
                table: "Orders");
        }
    }
}
