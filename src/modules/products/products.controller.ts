import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    // Mapear arquivos para os campos esperados
    const fileMap: {
      [key: string]: Express.Multer.File | Express.Multer.File[];
    } = {};
    if (files) {
      files.forEach(file => {
        if (file.fieldname === 'image_example') fileMap['image_example'] = file;
        if (file.fieldname === 'cover_image') fileMap['cover_image'] = file;
        if (file.fieldname.startsWith('page_images[')) {
          fileMap['page_images'] = fileMap['page_images'] || [];
          (fileMap['page_images'] as Express.Multer.File[]).push(file);
        }
      });
    }

    if (
      !fileMap.image_example &&
      !fileMap.cover_image &&
      (!fileMap.page_images ||
        (fileMap.page_images as Express.Multer.File[]).length === 0)
    ) {
      throw new BadRequestException('Pelo menos uma imagem é necessária');
    }

    const product = await this.productsService.create(
      createProductDto,
      fileMap as {
        image_example?: Express.Multer.File;
        cover_image?: Express.Multer.File;
        page_images?: Express.Multer.File[];
      },
    );
    return { message: 'Produto criado com sucesso', product };
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(AnyFilesInterceptor())
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const fileMap: {
      [key: string]: Express.Multer.File | Express.Multer.File[];
    } = {};
    if (files) {
      files.forEach(file => {
        if (file.fieldname === 'image') fileMap['image'] = file;
        if (file.fieldname === 'images') fileMap['images'] = file;
        if (file.fieldname === 'image_example') fileMap['image_example'] = file;
        if (file.fieldname === 'cover_image') fileMap['cover_image'] = file;
        if (file.fieldname.startsWith('page_images[')) {
          fileMap['page_images'] = fileMap['page_images'] || [];
          (fileMap['page_images'] as Express.Multer.File[]).push(file);
        }
      });
    }

    const product = await this.productsService.update(
      id,
      updateProductDto,
      fileMap as {
        image?: Express.Multer.File;
        images?: Express.Multer.File;
        image_example?: Express.Multer.File;
        cover_image?: Express.Multer.File;
        page_images?: Express.Multer.File[];
      },
    );
    return { message: 'Produto alterado com sucesso', product };
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.productsService.remove(id);
    return { message: 'Produto excluído' };
  }
}
