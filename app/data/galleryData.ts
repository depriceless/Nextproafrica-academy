// data/galleryData.ts

export interface GalleryItem {
  id: number
  type: 'image' | 'video'
  url: string
  category: string
  title: string
  description: string
  date: string
  tags: string[]
  objectPosition?: string
}

export interface Category {
  id: string
  label: string
  count: number
}

export const galleryItems: GalleryItem[] = [
  { 
    id: 1, 
    type: 'image',
    url: '/match.jpg', 
    category: 'training', 
    title: 'Training Session',
    description: 'Professional training drills',
    date: 'October 8, 2025',
    tags: ['Skills', 'Training', 'Development']
  },
  { 
    id: 2, 
    type: 'image',
    url: '/matchii.jpg', 
    category: 'matches', 
    title: 'Match Day',
    description: 'Team in action',
    date: 'October 5, 2025',
    tags: ['Match', 'Competition', 'Team']
  },
  { 
    id: 3, 
    type: 'image',
    url: '/matchiii.jpg', 
    category: 'events', 
    title: 'Team Spirit',
    description: 'Building champions together',
    date: 'October 3, 2025',
    tags: ['Team', 'Spirit', 'Unity']
  },
  { 
    id: 4, 
    type: 'image', 
    url: './pic.jpg', 
    category: 'facilities', 
    title: 'Training Ground', 
    description: 'State-of-the-art facilities',
    date: 'September 30, 2025',
    tags: ['Facilities', 'Infrastructure', 'Modern']
  },
  { 
    id: 5, 
    type: 'image', 
    url: './jerrad.jpg', 
    category: 'matches', 
    title: 'Victory Celebration', 
    description: 'Team celebrating tournament win',
    date: 'September 25, 2025',
    tags: ['Victory', 'Celebration', 'Trophy']
  },
  { 
    id: 6, // ✅ Changed from 5 to 6
    type: 'image', 
    url: './collect.jpg', 
    category: 'matches', 
    title: 'Trophy Collection', 
    description: 'Collecting championship trophies',
    date: 'September 25, 2025',
    tags: ['Victory', 'Celebration', 'Trophy']
  },
]

export const categories: Category[] = [
  { id: 'all', label: 'All Media', count: 6 }, // Updated count
  { id: 'training', label: 'Training', count: 1 },
  { id: 'matches', label: 'Matches', count: 3 }, // Updated count
  { id: 'events', label: 'Events', count: 1 },
  { id: 'facilities', label: 'Facilities', count: 1 }
]