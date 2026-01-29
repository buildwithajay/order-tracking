using System;
using Server.Api.DTOS.ProductDtos;

using Server.Api.Entities.Products;

namespace Server.Api.Mapper;

public static class ProductMapper
{
    public static ShowProduct ToShowProductDto(this Product productDto)
    {
        return new ShowProduct
        {
            Id= productDto.Id,
            Name= productDto.Name,
            Price= productDto.Price,
            IsAvailable= productDto.IsAvailable
        };
    }
    public static Product ToProductFromCreate(this CreateProductDto createProductDto)
    {
        return new Product
        {
            Name= createProductDto.Name,
            Price=createProductDto.Price,
            IsAvailable=createProductDto.IsAvailable,
            
        };
    }
    public static Product ToProductFromUpdateDto(this UpdateProductRequestDto updateProductRequestDto)
    {
        return new Product
        {
            Name= updateProductRequestDto.Name,
            Price=updateProductRequestDto.Price,
            IsAvailable= updateProductRequestDto.IsAvailable
        };
    }
}
