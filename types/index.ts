export type PoolShape = "RECTANGLE" | "OVAL" | "KIDNEY" | "CUSTOM"
export type StairsPosition = "TOP_LEFT" | "TOP_RIGHT" | "BOTTOM_LEFT" | "BOTTOM_RIGHT" | "CUSTOM"

export interface PoolConfig {
  id?: number
  projectId?: number
  shape: PoolShape
  width: number
  length: number
  depth: number
  cornerRadius?: number
  material: string
  finish: string
  color: string
  hasStairs: boolean
  stairsPosition?: StairsPosition
  customShapeData?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Project {
  id?: number
  name: string
  description?: string
  userId?: number
  createdAt?: Date
  updatedAt?: Date
  poolConfig?: PoolConfig
}

export interface User {
  id?: number
  email: string
  name?: string
  password?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Session {
  user: {
    id: number
    email: string
    name?: string
  }
}
