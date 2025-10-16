export type UserRole = 'player' | 'coach' | 'parent' | 'admin'

export type PlayerStatus = 'active' | 'inactive' | 'suspended'

export type SessionStatus = 'scheduled' | 'completed' | 'cancelled'

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused'

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'

export type PaymentMethod = 'bank_transfer' | 'paystack' | 'flutterwave'

export type VideoCategory = 'training' | 'match' | 'skill' | 'assessment'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  role: UserRole
  avatar_url: string | null
  date_of_birth: string | null
  created_at: string
  updated_at: string
}

export interface Player {
  id: string
  user_id: string | null
  parent_id: string | null
  position: string | null
  jersey_number: number | null
  height: number | null
  weight: number | null
  emergency_contact: string | null
  medical_info: string | null
  enrollment_date: string
  status: PlayerStatus
  created_at: string
  updated_at: string
}

export interface Coach {
  id: string
  user_id: string
  specialization: string | null
  experience_years: number | null
  certifications: string[] | null
  bio: string | null
  created_at: string
  updated_at: string
}

export interface TrainingSession {
  id: string
  coach_id: string
  title: string
  description: string | null
  session_date: string
  start_time: string
  end_time: string
  location: string | null
  max_players: number | null
  status: SessionStatus
  created_at: string
  updated_at: string
}

export interface SessionAttendance {
  id: string
  session_id: string
  player_id: string
  status: AttendanceStatus
  notes: string | null
  created_at: string
}

export interface Video {
  id: string
  player_id: string
  coach_id: string | null
  title: string
  description: string | null
  video_url: string
  thumbnail_url: string | null
  duration: number | null
  category: VideoCategory | null
  uploaded_at: string
  created_at: string
}

export interface Payment {
  id: string
  player_id: string
  amount: number
  currency: string
  payment_method: PaymentMethod | null
  transaction_reference: string | null
  status: PaymentStatus
  payment_date: string | null
  description: string | null
  created_at: string
  updated_at: string
}

export interface PerformanceMetric {
  id: string
  player_id: string
  coach_id: string | null
  session_id: string | null
  metric_type: string
  metric_value: number
  notes: string | null
  recorded_at: string
  created_at: string
}