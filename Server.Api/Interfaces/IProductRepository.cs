using System;

using Server.Api.DTOS.ProductDtos;
using Server.Api.Entities.Products;

namespace Server.Api.Interfaces;

public interface IProductRepository
{
    Task<List<Product>> GetProductsAsync();
    Task<Product> CreateProductAsync(CreateProductDto createProductDto);
    Task<Product?> GetProductByIdAsync(int id);
    Task<Product?> UpdateProductAsync(int id, UpdateProductRequestDto updateProductRequest);
    Task<Product?> DeleteProductAsync(int id);
}
