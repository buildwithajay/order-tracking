using System;

namespace Server.Api.DTOS.ProductDtos;

public class CreateProductDto
{
    public string? Name { get; set; }
    public decimal Price { get; set; }
    public bool IsAvailable { get; set; }
}
