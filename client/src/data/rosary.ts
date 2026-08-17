export type Mystery = {
  title: string
  fruit: string
  reflection: string
}

export type MysterySet = {
  id: string
  name: string
  days: string
  mysteries: Mystery[]
}

export const mysterySets: MysterySet[] = [
  {
    id: 'joyful',
    name: 'Joyful Mysteries',
    days: 'Monday & Saturday',
    mysteries: [
      { title: 'The Annunciation', fruit: 'Humility', reflection: 'The Angel Gabriel announces to Mary that she will be the Mother of God, and she responds with her fiat: "Let it be done unto me."' },
      { title: 'The Visitation', fruit: 'Love of Neighbor', reflection: 'Mary travels to visit her cousin Elizabeth, who greets her as "the Mother of my Lord," and Mary sings the Magnificat.' },
      { title: 'The Nativity', fruit: 'Poverty of Spirit / Detachment', reflection: 'Jesus is born in a humble stable in Bethlehem, and the shepherds come to adore the newborn King.' },
      { title: 'The Presentation', fruit: 'Obedience', reflection: 'Mary and Joseph present the infant Jesus in the Temple, where Simeon prophesies and Anna praises God.' },
      { title: 'The Finding in the Temple', fruit: 'Joy in Finding Jesus', reflection: 'After three days of searching, Mary and Joseph find the boy Jesus in the Temple, teaching among the doctors of the Law.' },
    ],
  },
  {
    id: 'sorrowful',
    name: 'Sorrowful Mysteries',
    days: 'Tuesday & Friday',
    mysteries: [
      { title: 'The Agony in the Garden', fruit: 'Sorrow for Sin', reflection: 'Jesus prays in Gethsemane in anguish, sweating blood, and accepts the Father\'s will: "Not my will, but thine be done."' },
      { title: 'The Scourging at the Pillar', fruit: 'Purity', reflection: 'Jesus is bound to a pillar and brutally scourged for our sins, bearing the weight of our transgressions in his flesh.' },
      { title: 'The Crowning with Thorns', fruit: 'Moral Courage', reflection: 'Soldiers mock Jesus as king, pressing a crown of thorns into his head and clothing him in a purple robe.' },
      { title: 'The Carrying of the Cross', fruit: 'Patience', reflection: 'Jesus carries the heavy wooden cross to Calvary, falling beneath its weight, helped by Simon of Cyrene.' },
      { title: 'The Crucifixion', fruit: 'Perseverance / Salvation', reflection: 'Jesus is nailed to the cross and dies for the salvation of the world, forgiving those who crucify him.' },
    ],
  },
  {
    id: 'glorious',
    name: 'Glorious Mysteries',
    days: 'Wednesday & Sunday',
    mysteries: [
      { title: 'The Resurrection', fruit: 'Faith', reflection: 'On the third day, Jesus rises from the dead in glory, conquering sin and death forever.' },
      { title: 'The Ascension', fruit: 'Hope / Desire for Heaven', reflection: 'Jesus ascends into heaven before his disciples, promising to send the Holy Spirit and to return again.' },
      { title: 'The Descent of the Holy Spirit', fruit: 'Wisdom / Love of God', reflection: 'The Holy Spirit descends upon Mary and the apostles at Pentecost, giving them courage to proclaim the Gospel.' },
      { title: 'The Assumption of Mary', fruit: 'Grace of a Happy Death', reflection: 'Mary is assumed body and soul into heavenly glory at the end of her earthly life.' },
      { title: 'The Coronation of Mary', fruit: 'Trust in Mary\'s Intercession', reflection: 'Mary is crowned Queen of Heaven and Earth by her Son, as our loving Mother and Advocate.' },
    ],
  },
  {
    id: 'luminous',
    name: 'Luminous Mysteries',
    days: 'Thursday',
    mysteries: [
      { title: 'The Baptism in the Jordan', fruit: 'Openness to the Holy Spirit', reflection: 'Jesus is baptized by John, and the Father\'s voice proclaims, "This is my beloved Son."' },
      { title: 'The Wedding at Cana', fruit: 'To Jesus through Mary', reflection: 'At Mary\'s request, Jesus performs his first miracle, changing water into wine.' },
      { title: 'The Proclamation of the Kingdom', fruit: 'Repentance and Trust in God', reflection: 'Jesus preaches the Kingdom of God and calls all people to conversion and faith.' },
      { title: 'The Transfiguration', fruit: 'Desire for Holiness', reflection: 'Jesus is transfigured in glory before Peter, James, and John atop Mount Tabor.' },
      { title: 'The Institution of the Eucharist', fruit: 'Adoration', reflection: 'At the Last Supper, Jesus gives us his Body and Blood under the appearance of bread and wine.' },
    ],
  },
]

export const rosarySteps = {
  opening: [
    'Make the Sign of the Cross.',
    'Say the Apostles\' Creed while holding the crucifix.',
    'Say one Our Father on the first large bead.',
    'Say three Hail Marys on the next three beads, for an increase of Faith, Hope, and Charity.',
    'Say the Glory Be.',
  ],
  decade: [
    'Announce the Mystery and read the reflection.',
    'Say one Our Father.',
    'Say ten Hail Marys while meditating on the Mystery.',
    'Say the Glory Be.',
    'Say the Fatima Prayer: "O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those in most need of thy mercy."',
  ],
  closing: [
    'Say the Hail, Holy Queen.',
    'Say the closing prayer: "O God, whose only-begotten Son, by his life, death, and resurrection, has purchased for us the rewards of eternal life; grant, we beseech thee, that meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the same Christ our Lord. Amen."',
    'Make the Sign of the Cross.',
  ],
}

export function mysteriesForToday(dayOfWeek: number): MysterySet {
  // 0 = Sunday
  const map: Record<number, string> = {
    0: 'glorious',
    1: 'joyful',
    2: 'sorrowful',
    3: 'glorious',
    4: 'luminous',
    5: 'sorrowful',
    6: 'joyful',
  }
  return mysterySets.find((m) => m.id === map[dayOfWeek])!
}
