import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class AnglerCatch {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    anglerName!: string

    @Column()
    species!: string

    @Column()
    weight!: number

    @Column()
    length!: number

    @Column()
    latitude!: number

    @Column()
    longitude!: number

    @Column("timestamp")
    timestamp!: Date
}

export default AnglerCatch