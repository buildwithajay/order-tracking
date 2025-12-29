using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Api.Entities.Order;
using Server.Api.Entities.Products;
using Server.Api.Models.ApplicationUser;

namespace Server.Api.ApplicationData;

public class ApplicationDbContext : IdentityDbContext<AppUser>

{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions): base(dbContextOptions)
    {
        
    }
    public DbSet<Order> Orders{get;set;}
    public DbSet<OrderStatusHistory> OrderStatusHistory {get;set;}
    public DbSet<Product> Products{get;set;}
    public DbSet<OrderItem> OrderItems { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Order>()
        .HasIndex(o=>o.OrderNumber)
        .IsUnique();

        List<IdentityRole> roles = new List<IdentityRole>
        {
            new IdentityRole
                {
                    Id = "1",
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                    ConcurrencyStamp="1"
             },
            new IdentityRole {
                    Id="2",
                    Name = "Manager",
                    NormalizedName = "MANAGER",
                    ConcurrencyStamp="2"
                    },
              new IdentityRole
                {
                    Id= "3",
                    Name = "User",
                    NormalizedName = "USER",
                    ConcurrencyStamp="3"
                },
                new IdentityRole
                {
                    Id="4",
                    Name="DeliveryPerson",
                    NormalizedName="DELIVERYPERSON",
                    ConcurrencyStamp="4"
                }

        };
        builder.Entity<IdentityRole>()
        .HasData(roles);



        builder.Entity<Order>()
        .HasOne(u=>u.AppUser)
        .WithMany()
        .HasForeignKey(u=>u.CustomerId);

        builder.Entity<OrderItem>()
        .HasOne(o=>o.Order)
        .WithMany(o=>o.OrderItems)
        .HasForeignKey(k=>k.Order_Id);

        builder.Entity<OrderItem>()
        .HasOne(p=>p.Product)
        .WithMany()
        .HasForeignKey(k=>k.Product_Id);
        
    } 
}

