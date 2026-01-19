using System;

namespace Server.Api.DTOS.ProductDtos;

public class ShowProduct
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public decimal? Price { get; set; }
}
