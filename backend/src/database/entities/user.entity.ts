import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Team } from './team.entity';
import { TeamMember } from './team-member.entity';
import { Project } from './project.entity';
import { Task } from './task.entity';
import { TaskComment } from './task-comment.entity';
import { ActivityLog } from './activity-log.entity';

export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  @Column({ name: 'full_name', length: 100, nullable: true })
  fullName: string;

  @Column({ name: 'avatar_url', length: 255, nullable: true })
  avatarUrl: string;

  @Column({
    type: 'varchar',
    length: 16,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // 关系
  @OneToMany(() => Team, team => team.owner)
  ownedTeams: Team[];

  @OneToMany(() => TeamMember, teamMember => teamMember.user)
  teamMemberships: TeamMember[];

  @OneToMany(() => Project, project => project.createdBy)
  createdProjects: Project[];

  @OneToMany(() => Task, task => task.assignedTo)
  assignedTasks: Task[];

  @OneToMany(() => Task, task => task.createdBy)
  createdTasks: Task[];

  @OneToMany(() => TaskComment, comment => comment.user)
  comments: TaskComment[];

  @OneToMany(() => ActivityLog, log => log.user)
  activityLogs: ActivityLog[];
}