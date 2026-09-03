import { getFeatureProperties } from '../geoJsonCodeQuiz'

const VIETNAM_POST_2025_PROVINCE_NAMES = [
  'An Giang',
  'Bắc Ninh',
  'Cà Mau',
  'Cần Thơ',
  'Cao Bằng',
  'Đà Nẵng',
  'Đắk Lắk',
  'Điện Biên',
  'Đồng Nai',
  'Đồng Tháp',
  'Gia Lai',
  'Hà Nội',
  'Hà Tĩnh',
  'Hải Phòng',
  'Hồ Chí Minh',
  'Huế',
  'Hưng Yên',
  'Khánh Hòa',
  'Lai Châu',
  'Lào Cai',
  'Lâm Đồng',
  'Lạng Sơn',
  'Nghệ An',
  'Ninh Bình',
  'Phú Thọ',
  'Quảng Ngãi',
  'Quảng Ninh',
  'Quảng Trị',
  'Sơn La',
  'Tây Ninh',
  'Thanh Hóa',
  'Thái Nguyên',
  'Tuyên Quang',
  'Vĩnh Long',
]

const VIETNAM_PRE_2025_PROVINCE_NAMES = [
  'An Giang',
  'Bà Rịa - Vũng Tàu',
  'Bắc Giang',
  'Bắc Kạn',
  'Bạc Liêu',
  'Bắc Ninh',
  'Bến Tre',
  'Bình Định',
  'Bình Dương',
  'Bình Phước',
  'Bình Thuận',
  'Cà Mau',
  'Cần Thơ',
  'Cao Bằng',
  'Đà Nẵng',
  'Đắk Lắk',
  'Đắk Nông',
  'Điện Biên',
  'Đồng Nai',
  'Đồng Tháp',
  'Gia Lai',
  'Hà Giang',
  'Hà Nam',
  'Hà Nội',
  'Hà Tĩnh',
  'Hải Dương',
  'Hải Phòng',
  'Hậu Giang',
  'Hòa Bình',
  'Hồ Chí Minh',
  'Hưng Yên',
  'Khánh Hòa',
  'Kiên Giang',
  'Kon Tum',
  'Lai Châu',
  'Lào Cai',
  'Lâm Đồng',
  'Lạng Sơn',
  'Long An',
  'Nam Định',
  'Nghệ An',
  'Ninh Bình',
  'Ninh Thuận',
  'Phú Thọ',
  'Phú Yên',
  'Quảng Bình',
  'Quảng Nam',
  'Quảng Ngãi',
  'Quảng Ninh',
  'Quảng Trị',
  'Sóc Trăng',
  'Sơn La',
  'Tây Ninh',
  'Thái Bình',
  'Thái Nguyên',
  'Thanh Hóa',
  'Thừa Thiên - Huế',
  'Tiền Giang',
  'Trà Vinh',
  'Tuyên Quang',
  'Vĩnh Long',
  'Vĩnh Phúc',
  'Yên Bái',
]

export const VN_POST_2025_PROVINCES = VIETNAM_POST_2025_PROVINCE_NAMES.map(
  (name) => ({ id: name, label: name })
)

export const VN_PRE_2025_PROVINCES = VIETNAM_PRE_2025_PROVINCE_NAMES.map(
  (name) => ({ id: name, label: name })
)

const VN_POST_2025_PROVINCE_IDS = new Set<string>(
  VIETNAM_POST_2025_PROVINCE_NAMES
)
const VN_PRE_2025_PROVINCE_IDS = new Set<string>(
  VIETNAM_PRE_2025_PROVINCE_NAMES
)

function getVietnamProvinceId(
  feature: unknown,
  propertyName: string,
  supportedIds: Set<string>
) {
  const rawProvince = getFeatureProperties(feature)?.[propertyName]
  if (typeof rawProvince !== 'string') return []

  const province = rawProvince.trim()
  return supportedIds.has(province) ? [province] : []
}

export function getVietnamPost2025ProvinceIds(feature: unknown) {
  return getVietnamProvinceId(feature, 'adm1_name1', VN_POST_2025_PROVINCE_IDS)
}

export function getVietnamPre2025ProvinceIds(feature: unknown) {
  return getVietnamProvinceId(feature, 'Name', VN_PRE_2025_PROVINCE_IDS)
}
