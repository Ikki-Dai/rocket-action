import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { Team } from './team.entity';

export enum TeamMemberRole {
  OWNER = 'owner',
  MEMBER = 'member',
  READONLY = 'readonly',
}

@Entity('team_members')
@Unique(['teamId', 'userId'])
export class TeamMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'team_id' })
  teamId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({
    type: 'varchar',
    length: 20,
    default: TeamMemberRole.MEMBER,
  })
  role: TeamMemberRole;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;

  // 关系
  @ManyToOne(() => Team, team => team.members)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @ManyToOne(() => User, user => user.teamMemberships)
  @JoinColumn({ name: 'user_id' })
  user: User;
}