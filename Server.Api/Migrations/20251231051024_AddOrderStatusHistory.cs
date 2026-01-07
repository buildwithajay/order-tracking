using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderStatusHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderStatusHistory_AspNetUsers_AppUserId",
                table: "OrderStatusHistory");

            migrationBuilder.DropIndex(
                name: "IX_OrderStatusHistory_AppUserId",
                table: "OrderStatusHistory");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "OrderStatusHistory");

            migrationBuilder.AlterColumn<string>(
                name: "Update_By",
                table: "OrderStatusHistory",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Order_Status",
                table: "OrderStatusHistory",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderStatusHistory_Order_Id",
                table: "OrderStatusHistory",
                column: "Order_Id");

            migrationBuilder.CreateIndex(
                name: "IX_OrderStatusHistory_Update_By",
                table: "OrderStatusHistory",
                column: "Update_By");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderStatusHistory_AspNetUsers_Update_By",
                table: "OrderStatusHistory",
                column: "Update_By",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderStatusHistory_Orders_Order_Id",
                table: "OrderStatusHistory",
                column: "Order_Id",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderStatusHistory_AspNetUsers_Update_By",
                table: "OrderStatusHistory");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderStatusHistory_Orders_Order_Id",
                table: "OrderStatusHistory");

            migrationBuilder.DropIndex(
                name: "IX_OrderStatusHistory_Order_Id",
                table: "OrderStatusHistory");

            migrationBuilder.DropIndex(
                name: "IX_OrderStatusHistory_Update_By",
                table: "OrderStatusHistory");

            migrationBuilder.AlterColumn<string>(
                name: "Update_By",
                table: "OrderStatusHistory",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Order_Status",
                table: "OrderStatusHistory",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "OrderStatusHistory",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderStatusHistory_AppUserId",
                table: "OrderStatusHistory",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderStatusHistory_AspNetUsers_AppUserId",
                table: "OrderStatusHistory",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
