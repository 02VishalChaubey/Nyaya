// Central lookup so data files can reference icons by name (a plain string,
// safe to store in mock/JSON data) while components render real Lucide icons.
import {
  Scale,
  Wind,
  ShieldOff,
  Landmark,
  BookOpen,
  Gavel,
  Home,
  ShoppingBag,
  Wifi,
  Users,
  Briefcase,
  MoreHorizontal,
  HelpCircle,
} from 'lucide-react'

export const ICONS = {
  Scale,
  Wind,
  ShieldOff,
  Landmark,
  BookOpen,
  Gavel,
  Home,
  ShoppingBag,
  Wifi,
  Users,
  Briefcase,
  MoreHorizontal,
}

export function getIcon(name) {
  return ICONS[name] || HelpCircle
}
