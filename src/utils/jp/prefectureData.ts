import { getFeatureProperties } from '../geoJsonCodeQuiz'

export const JP_MAP: Record<string, string[]> = {
  '東北（含北海道）': [
    '北海道',
    '青森県',
    '岩手県',
    '宮城県',
    '秋田県',
    '山形県',
    '福島県',
  ],
  関東: [
    '茨城県',
    '栃木県',
    '群馬県',
    '埼玉県',
    '千葉県',
    '東京都',
    '神奈川県',
  ],
  中部: [
    '新潟県',
    '富山県',
    '石川県',
    '福井県',
    '山梨県',
    '長野県',
    '岐阜県',
    '静岡県',
    '愛知県',
  ],
  関西: [
    '三重県',
    '滋賀県',
    '京都府',
    '大阪府',
    '兵庫県',
    '奈良県',
    '和歌山県',
  ],
  中国: ['鳥取県', '島根県', '岡山県', '広島県', '山口県'],
  '九州（含沖縄）': [
    '福岡県',
    '佐賀県',
    '長崎県',
    '熊本県',
    '大分県',
    '宮崎県',
    '鹿児島県',
    '沖縄県',
  ],
  四国: ['徳島県', '香川県', '愛媛県', '高知県'],
}

export const JP_PREFECTURES = Object.entries(JP_MAP).flatMap(
  ([region, prefectures]) =>
    prefectures.map((prefecture) => ({
      id: prefecture,
      label: prefecture,
      region,
    }))
)

const JP_PREFECTURE_IDS = new Set(
  JP_PREFECTURES.map((prefecture) => prefecture.id)
)

export function getJapanPrefectureIds(feature: unknown) {
  const prefecture = getFeatureProperties(feature)?.prefecture
  if (typeof prefecture !== 'string') return []

  const normalizedPrefecture = prefecture.trim()
  return JP_PREFECTURE_IDS.has(normalizedPrefecture)
    ? [normalizedPrefecture]
    : []
}
