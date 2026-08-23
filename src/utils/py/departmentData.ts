import { getFeatureProperties } from '../geoJsonCodeQuiz'

const PARAGUAY_DEPARTMENTS = [
  'Alto Paraguay',
  'Alto Paraná',
  'Amambay',
  'Asunción',
  'Boquerón',
  'Caaguazú',
  'Caazapá',
  'Canindeyú',
  'Central',
  'Concepción',
  'Cordillera',
  'Guairá',
  'Itapúa',
  'Misiones',
  'Ñeembucú',
  'Paraguarí',
  'Presidente Hayes',
  'San Pedro',
] as const

const PARAGUAY_DEPARTMENT_IDS = new Set<string>(PARAGUAY_DEPARTMENTS)

export const PY_DEPARTMENTS = PARAGUAY_DEPARTMENTS.map((department) => ({
  id: department,
  label: department,
}))

export function getParaguayDepartmentIds(feature: unknown) {
  const rawDepartment = getFeatureProperties(feature)?.department
  if (typeof rawDepartment !== 'string') return []

  const department = rawDepartment.trim()
  return PARAGUAY_DEPARTMENT_IDS.has(department) ? [department] : []
}
