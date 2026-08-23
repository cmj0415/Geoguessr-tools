import { getFeatureProperties } from '../geoJsonCodeQuiz'

const COLOMBIA_DEPARTMENT_DATA = [
  ['Amazonas', 'Amazonas'],
  ['Antioquia', 'Antioquia'],
  ['Arauca', 'Arauca'],
  ['Atlántico', 'Atlántico'],
  ['Bogota Capital District', 'Bogotá, D.C.'],
  ['Bolívar', 'Bolívar'],
  ['Boyacá', 'Boyacá'],
  ['Caldas', 'Caldas'],
  ['Caquetá', 'Caquetá'],
  ['Casanare', 'Casanare'],
  ['Cauca', 'Cauca'],
  ['Cesar', 'Cesar'],
  ['Chocó', 'Chocó'],
  ['Córdoba', 'Córdoba'],
  ['Cundinamarca', 'Cundinamarca'],
  ['Guainía', 'Guainía'],
  ['Guaviare', 'Guaviare'],
  ['Huila', 'Huila'],
  ['La Guajira', 'La Guajira'],
  ['Magdalena', 'Magdalena'],
  ['Meta', 'Meta'],
  ['Nariño', 'Nariño'],
  ['Norte de Santander', 'Norte de Santander'],
  ['Putumayo', 'Putumayo'],
  ['Quindío', 'Quindío'],
  ['Risaralda', 'Risaralda'],
  [
    'Archipiélago de San Andrés, Providencia y Santa Catalina',
    'Archipiélago de San Andrés, Providencia y Santa Catalina',
  ],
  ['Santander', 'Santander'],
  ['Sucre', 'Sucre'],
  ['Tolima', 'Tolima'],
  ['Valle del Cauca', 'Valle del Cauca'],
  ['Vaupés', 'Vaupés'],
  ['Vichada', 'Vichada'],
] as const

const DEPARTMENT_BY_SOURCE_NAME = new Map<string, string>(
  COLOMBIA_DEPARTMENT_DATA
)

export const CO_DEPARTMENTS = COLOMBIA_DEPARTMENT_DATA.map(
  ([, department]) => ({
    id: department,
    label: department,
  })
)

export function getColombiaDepartmentIds(feature: unknown) {
  const rawDepartment = getFeatureProperties(feature)?.shapeName
  if (typeof rawDepartment !== 'string') return []

  const department = DEPARTMENT_BY_SOURCE_NAME.get(rawDepartment.trim())
  return department ? [department] : []
}
