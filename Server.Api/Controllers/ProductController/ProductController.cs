using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Api.DTOS.ProductDtos;
using Server.Api.Interfaces;
using Server.Api.Mapper;

namespace Server.Api.Controllers.ProductController
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepo;
        public ProductController(IProductRepository productRepo)
        {
            _productRepo= productRepo;
        }
        [HttpGet]
        
        public async Task<IActionResult> GetProduct()
        {
            var product = await _productRepo.GetProductsAsync();
            var productdto= product.Select(s=>s.ToShowProductDto());
            return Ok(productdto);
        }
        [HttpPost]
     
        [Authorize(Roles = "Admin, Manager")]
        public async Task<IActionResult> CreateProduct([FromBody] CreateProductDto createProductDto)
        {
            if(!ModelState.IsValid) 
                throw new Exception("cannot connect");
            var product = await _productRepo.CreateProductAsync(createProductDto);
            return Ok(product);
        }
        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetProductById([FromRoute] int id)
        {
            var product= await _productRepo.GetProductByIdAsync(id);
            if(product == null)
            {
                return NotFound("product not found");
            }
            return Ok(product.ToShowProductDto());
        }
        [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] int id, UpdateProductRequestDto updateProductRequestDto)
        {
            var product= await _productRepo.UpdateProductAsync(id, updateProductRequestDto);
            if(product == null)
            {
                return NotFound("product doesnot exist");
            }
            return Ok(product.ToShowProductDto());
        }
        [Authorize(Roles ="Admin")]
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        {
            var product= await _productRepo.DeleteProductAsync(id);
            if(product == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
