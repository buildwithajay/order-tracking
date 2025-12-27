using System;

using Microsoft.EntityFrameworkCore;
using Server.Api.ApplicationData;
using Server.Api.DTOS.ProductDtos;
using Server.Api.Entities.Products;
using Server.Api.Interfaces;

namespace Server.Api.Repository;

public class ProductRepository : IProductRepository
{
    private readonly ApplicationDbContext _context;
    public ProductRepository(ApplicationDbContext context)
    {
        _context= context;
    }
    public async Task<Product> CreateProductAsync(CreateProductDto createProductDto)
    {
       var product = new Product
       {
           Name= createProductDto.Name,
           Price=createProductDto.Price,
           IsAvailable=createProductDto.IsAvailable
       };
       await _context.Products.AddAsync(product);
       await _context.SaveChangesAsync();
       return product;
    }

    public async Task<Product?> DeleteProductAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if(product == null) return null;
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<Product?> GetProductByIdAsync(int id)
    {
        var product = await _context.Products.FirstOrDefaultAsync(s=>s.Id==id);
        return product;
    }

    public async Task<List<Product>> GetProductsAsync()
    {
        var product = await _context.Products.ToListAsync();
        return product;
    }

    public async Task<Product?> UpdateProductAsync(int id, UpdateProductRequestDto updateProductRequest)
    {
        var product = await _context.Products.FirstOrDefaultAsync(s=>s.Id==id);
        if(product is null)
        {
            return null;
        }
        product.Name= updateProductRequest.Name;
        product.Price=updateProductRequest.Price;
        product.IsAvailable=updateProductRequest.IsAvailable;

        await _context.SaveChangesAsync();
        return product;
    }
}
