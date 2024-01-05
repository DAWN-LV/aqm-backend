import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"

import { CreateGroupDTO } from "@/modules/group/dto/create-group.dto"
import { UpdateGroupDTO } from "@/modules/group/dto//update-group.dto"

import { Group } from "@/modules/group/models/group.model"
import { User } from "@/modules/user/models/user.model"
import { Sensor } from "@/modules/sensor/models/sensor.model"
import { GroupGateway } from "@/modules/group/gateways/group.gateway"

@Injectable()
export class GroupService {
  constructor(private readonly groupGateway: GroupGateway) {}

  async findAll(userId: number) {
    try {
      return Group.findAll({
        include: [
          {
            model: User,
            as: 'members', 
            attributes: [],
            where: { id: userId }
          },
          {
            model: Sensor,
            attributes: ['id', 'type'],
            through: {
              attributes: []
            }
          }
        ]
      })
    } catch (error) {
      throw new BadRequestException(`Error in finding sensor link: ${ error.message }`)
    }
  }

  async findOne(groupId: number) {
    try {
      const group = await Group.findByPk(groupId, {
        include: [
          { 
            model: Sensor,
            through: {
              attributes: []
            }, 
            attributes: ['id', 'type'] 
          }
        ]
      })
  
      if (!group) {
        throw new NotFoundException(`Group with ID ${ groupId } not found`)
      }
  
      return group
    } catch (error) {
      throw new BadRequestException(`Error in finding sensor link: ${ error.message }`)
    }
  }

  async create(userId: number, dto: CreateGroupDTO): Promise<any> {
    try {
      const owner = await User.findByPk(userId)
      if (!owner) {
        throw new UnauthorizedException('User not found')
      }

      const group = await Group.create({
        name: dto.name,
        ownerId: userId,
      })

      await group.$add('members', userId)

      if (dto.sensorIds) {
        const sensorIds = dto.sensorIds.split(',').map(id => parseInt(id.trim(), 10))
        await group.$add('sensors', sensorIds)
      }

      return await this.findOne(group.id)
    } catch (error) {
      throw new BadRequestException(`Error creating group: ${ error.message }`)
    }
  }

  async update(userId: number, groupId: number, dto: UpdateGroupDTO): Promise<any> {
    try {
      const group = await Group.findByPk(groupId)
      if (!group) {
        throw new NotFoundException(`Group not found with ID ${groupId}`)
      }

      if (group.ownerId !== userId) {
        throw new UnauthorizedException('You are not authorized to update this group')
      }

      await group.update(dto)
      this.groupGateway.update(userId.toString(), { id: group.id })

      if (dto.sensorIds) {
        const sensorIds = dto.sensorIds.split(',').map(id => parseInt(id.trim(), 10))
        await group.$set('sensors', sensorIds)
      }
      
      if (!dto.sensorIds) {
        await group.$set('sensors', [])
      }

      return await this.findOne(group.id)
    } catch (error) {
      throw new BadRequestException(`Error creating group: ${ error.message }`)
    }
  }

  async delete(userId: number, sensorId: number): Promise<boolean> {
    try {
      const group = await Group.findByPk(sensorId)
      if (!group) {
        throw new NotFoundException('Sensor not found')
      }

      if (group.ownerId !== userId) {
        throw new UnauthorizedException('You are not authorized to delete this sensor')
      }

      await group.destroy()
      this.groupGateway.delete(userId.toString(), { id: group.id })

      return true
    } catch (error) {
      throw new BadRequestException(`Error in deleting sensor link: ${ error.message }`)
    }
  }

  // async addMember(groupId: number, memberId: number) {
  //   try {
  //     const group = await this.findOne(groupId)

  //     await group.$add('members', memberId)
  //     this.groupGateway.update(memberId.toString(), { id: group.id })

  //     return true
  //   } catch (error) {
  //     throw new BadRequestException(`Error in additing member to group: ${ error.message }`)
  //   }
  // }
}
