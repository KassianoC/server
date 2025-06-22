import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const order = this.orderRepository.create(createOrderDto);

    // Corrige UserService para userService
    const user: ReturnUserDto = await this.userService.findOne(
      Number(createOrderDto.user_id),
    );

    const savedOrder = await this.orderRepository.save(order);

    const orderItems = createOrderDto.items.map(item => ({
      ...item,
      user_id: createOrderDto.user_id,
      order_id: savedOrder.id,
      language: user.language as Language,
    }));

    await this.orderRepository.manager
      .getRepository(OrderItem)
      .save(orderItems);

    return savedOrder;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['user'] });
  }

  async findAllByUsers(user_id: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user_id },
      relations: ['user'],
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
