import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    await this.productsService.create(createProductDto);
    return { message: 'Produto criado com sucesso' };
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}

// teste depos img //

// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   UseInterceptors,
//   UploadedFiles,
//   BadRequestException,
// } from '@nestjs/common';
// import { FilesInterceptor } from '@nestjs/platform-express';
// import { ProductsService } from './products.service';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

// @Controller('products')
// export class ProductsController {
//   constructor(private readonly productsService: ProductsService) {}

//   @Post()
//   @UseInterceptors(FilesInterceptor('images', 10)) // Até 10 imagens
//   async create(
//     @Body() createProductDto: CreateProductDto,
//     @UploadedFiles() files: Express.Multer.File[],
//   ) {
//     if (!files || files.length === 0) {
//       throw new BadRequestException('Pelo menos uma imagem é necessária');
//     }

//     const imageUrls = files.map(file => `/uploads/images/${file.filename}`);
//     return this.productsService.create({
//       ...createProductDto,
//       images: imageUrls,
//       image_example: imageUrls[0],
//       cover_image: imageUrls[0],
//     });
//   }

//   @Get()
//   findAll() {
//     return this.productsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.productsService.findOne(id);
//   }

//   @Patch(':id')
//   @UseInterceptors(FilesInterceptor('images', 10)) // Suporte opcional para imagens
//   async update(
//     @Param('id') id: string,
//     @Body() updateProductDto: UpdateProductDto,
//     @UploadedFiles() files: Express.Multer.File[],
//   ) {
//     const imageUrls = files?.length
//       ? files.map(file => `/uploads/images/${file.filename}`)
//       : undefined;
//     return this.productsService.update(id, {
//       ...updateProductDto,
//       ...(imageUrls && {
//         images: imageUrls,
//         image_example: imageUrls[0],
//         cover_image: imageUrls[0],
//       }),
//     });
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.productsService.remove(id);
//   }
// }
