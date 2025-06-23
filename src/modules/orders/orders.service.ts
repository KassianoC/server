import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { ReturnUserDto } from '../user/dto/retorn-user.dto';
import { UserService } from '../user/user.service';
import { Language } from '../../common/enums/language.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UserService, // Injeta UserService
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    console.log(createOrderDto);
    const user: ReturnUserDto = await this.userService.findOne(
      Number(createOrderDto.user_id),
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const orderData: DeepPartial<Order> = {
      user_id: Number(createOrderDto.user_id),
      total_amount: createOrderDto.total_amount,
      payment_status: createOrderDto.payment_status,
      delivery_status: createOrderDto.delivery_status,
      tracking_code: createOrderDto.tracking_code,
      address_line_1: createOrderDto.address_line_1,
      address_line_2: createOrderDto.address_line_2,
      district: createOrderDto.district,
      city: createOrderDto.city,
      state_code: createOrderDto.state_code,
      country: createOrderDto.country,
      postal_code: createOrderDto.postal_code,
      graphic_company: createOrderDto.graphic_company,
    };

    const order = this.orderRepository.create(orderData);
    const savedOrder = await this.orderRepository.save(order);

    const orderItemsData = createOrderDto.items.map(item => ({
      user_id: String(user.id), // Usa user_id do usuário validado
      order_id: String(savedOrder.id),
      book_title: item.book_title,
      language: item.language || (user.language as Language) || Language.EN,
      preview_url: item.preview_url,
      images: item.images,
      quantity: item.quantity,
      price: parseFloat(item.price.toString()), // Converte string para number
      personalization_id: item.personalization_id,
    }));

    await this.orderRepository.manager
      .getRepository(OrderItem)
      .save(orderItemsData);

    return savedOrder;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['user'] });
  }

  async findAllByUsers(user_id: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user_id },
      relations: ['user', 'items'],
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    Object.assign(order, updateOrderDto);
    return this.orderRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}
