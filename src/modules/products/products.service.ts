import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
  private readonly uploadDir = path.join(
    __dirname,
    '../../../public/uploads/products',
  );

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    //Criar pasta de uploads se não existir
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async create(
    createProductDto: CreateProductDto,
    files: {
      image_example?: Express.Multer.File;
      cover_image?: Express.Multer.File;
      page_images?: Express.Multer.File[];
    },
  ): Promise<Product> {
    console.log('Creating product with data:', createProductDto);
    console.log('Files received:', files);

    const imageName = files.image_example?.filename ?? null;
    const coverImageName = files.cover_image?.filename ?? null;
    const pageImagesNames = files.page_images?.map(file => file.filename) ?? [];

    const product = this.productRepository.create({
      ...createProductDto,
      image_example: imageName,
      cover_image: coverImageName,
      page_images: pageImagesNames,
    });

    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ where: { del: false } });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    files: {
      image_example?: Express.Multer.File;
      cover_image?: Express.Multer.File;
      page_images?: Express.Multer.File[];
    },
  ): Promise<Product> {
    console.log('Updating product with ID:', id);
    console.log('With data:', updateProductDto);
    console.log('Files received:', files);

    const product = await this.findOne(id);

    const imageExample = files.image_example?.filename ?? product.image_example;
    const coverImageName = files.cover_image?.filename ?? product.cover_image;

    // Atualiza page_images substituindo pelo índice correto, não apenas acrescentando
    let pageImagesNames: string[] = Array.isArray(product.page_images)
      ? [...product.page_images]
      : [];

    if (files.page_images && files.page_images.length > 0) {
      files.page_images.forEach(file => {
        // Extrai o índice do nome do campo (ex: page_images[2])
        const match = file.fieldname.match(/page_images\[(\d+)\]/);
        if (match) {
          const idx = parseInt(match[1], 10);
          pageImagesNames[idx] = file.filename;
        } else {
          // Se não tiver índice, adiciona ao final
          pageImagesNames.push(file.filename);
        }
      });
      // Remove possíveis "buracos" (undefined) se algum índice não foi enviado
      pageImagesNames = pageImagesNames.filter(Boolean);
    }

    Object.assign(product, {
      ...updateProductDto,
      image_example: imageExample,
      cover_image: coverImageName,
      page_images: pageImagesNames,
    });

    const savedProduct = await this.productRepository.save(product);
    console.log('Saved product:', savedProduct);
    return savedProduct;
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    product.del = true;
    await this.productRepository.save(product);
  }
}
