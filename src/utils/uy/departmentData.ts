import { getFeatureProperties } from '../geoJsonCodeQuiz'

const URUGUAY_DEPARTMENTS = [
  'Artigas',
  'Canelones',
  'Cerro Largo',
  'Colonia',
  'Durazno',
  'Flores',
  'Florida',
  'Lavalleja',
  'Maldonado',
  'Montevideo',
  'Paysandú',
  'Río Negro',
  'Rivera',
  'Rocha',
  'Salto',
  'San José',
  'Soriano',
  'Tacuarembó',
  'Treinta y Tres',
] as const

const URUGUAY_DEPARTMENT_IDS = new Set<string>(URUGUAY_DEPARTMENTS)

export const UY_DEPARTMENTS = URUGUAY_DEPARTMENTS.map((department) => ({
  id: department,
  label: department,
}))

export function getUruguayDepartmentIds(feature: unknown) {
  const rawDepartment = getFeatureProperties(feature)?.department
  if (typeof rawDepartment !== 'string') return []

  const department = rawDepartment.trim()
  return URUGUAY_DEPARTMENT_IDS.has(department) ? [department] : []
}
