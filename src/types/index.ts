export type CampaignStatus = "draft" | "active" | "paused" | "completed" | "cancelled"

export type MediaType = "image" | "video"

export type DonationStatus = "pending" | "successful" | "failed" | "refunded"

export type ActivityType = "campaign_created" | "donation_received" | "campaign_updated" | "milestone_reached" | "withdrawal"

export interface CampaignFormData {
  title: string
  story: string
  goalAmount: number
  currency: string
  categoryId: string
  location?: string
  country?: string
  deadline?: Date
  coverImage?: string
  videoUrl?: string
}

export interface DonationFormData {
  amount: number
  currency: string
  message?: string
  anonymous: boolean
  donorName?: string
  donorEmail?: string
}

export interface SearchFilters {
  query?: string
  category?: string
  location?: string
  sortBy?: "newest" | "most_funded" | "most_donors" | "ending_soon"
  minAmount?: number
  maxAmount?: number
  status?: CampaignStatus
}
