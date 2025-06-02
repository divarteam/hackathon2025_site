import { format, formatRelative } from 'date-fns'
import { ru } from 'date-fns/locale'

export function ISOToHumanDate(isoString: string) {
  return format(new Date(isoString), 'PPpp', { locale: ru })
}

export function ISOToHumanRelativeDate(isoString: string) {
  return formatRelative(new Date(isoString), 'PPpp', { locale: ru })
}