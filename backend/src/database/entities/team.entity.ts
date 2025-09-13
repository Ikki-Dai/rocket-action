import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { TeamMember } from './team-member.entity';
import { Project } from './project.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ name: 'owner_id' })
  ownerId: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // 关系
  @ManyToOne(() => User, user => user.ownedTeams)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @OneToMany(() => TeamMember, teamMember => teamMember.team)
  members: TeamMember[];

  @OneToMany(() => Project, project => project.team)
  projects: Project[];
}