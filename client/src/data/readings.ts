// Note: the full text of the Church's daily Mass readings (the Lectionary) is
// copyrighted by its translators/publishers, so this app does not reproduce it.
// Instead we surface a public-domain Scripture verse and an original daily
// reflection, plus a direct link to the USCCB's official readings for the date.

export type DailyReflection = {
  verseRef: string
  verseText: string // Douay-Rheims / public domain translation
  reflectionTitle: string
  reflection: string
  premium?: boolean
}

export const dailyReflections: DailyReflection[] = [
  { verseRef: 'Psalm 23:1', verseText: 'The Lord ruleth me: and I shall want nothing.', reflectionTitle: 'The Good Shepherd', reflection: 'Christ knows each of us by name and leads us, even through the valley of darkness, to still waters. Trust today that you are not walking alone.' },
  { verseRef: 'Matthew 11:28', verseText: 'Come to me, all you that labour, and are burdened, and I will refresh you.', reflectionTitle: 'Rest in Him', reflection: 'Whatever weighs on your heart today — bring it to Christ in prayer before you try to carry it alone.' },
  { verseRef: 'Philippians 4:6', verseText: 'Be nothing solicitous, but in every thing, by prayer and supplication, with thanksgiving, let your petitions be made known to God.', reflectionTitle: 'Anxious for Nothing', reflection: 'Anxiety shrinks when it is handed over. Name one worry right now and offer it to God in a single sentence of prayer.' },
  { verseRef: 'John 15:5', verseText: 'I am the vine: you the branches. He that abideth in me, and I in him, the same beareth much fruit.', reflectionTitle: 'Abiding in Christ', reflection: 'Fruitfulness is not produced by effort alone but by staying connected to the source of grace. Where can you make more room for him today?' },
  { verseRef: 'Isaiah 41:10', verseText: 'Fear not, for I am with thee: turn not aside, for I am thy God.', reflectionTitle: 'Do Not Be Afraid', reflection: 'God does not promise an absence of difficulty, but his abiding presence within it. Let that be enough for today.' },
  { verseRef: 'Romans 8:28', verseText: 'We know that to them that love God, all things work together unto good.', reflectionTitle: 'All Things for Good', reflection: 'Even the parts of your story that make no sense yet are being woven by a Father who sees the whole tapestry.' },
  { verseRef: 'Psalm 34:8', verseText: 'O taste, and see that the Lord is sweet: blessed is the man that hopeth in him.', reflectionTitle: 'Taste and See', reflection: 'Faith is not only believed but tasted — in the sacraments, in silence, in small mercies noticed throughout the day.' },
  { verseRef: 'Matthew 6:33', verseText: 'Seek ye first the kingdom of God, and his justice, and all these things shall be added unto you.', reflectionTitle: 'Seek First', reflection: 'Reorder today\'s priorities around this one line, and watch how the lesser things fall into their proper place.' },
  { verseRef: '1 Corinthians 13:4', verseText: 'Charity is patient, is kind: charity envieth not, dealeth not perversely.', reflectionTitle: 'The Nature of Love', reflection: 'Read this verse slowly and ask where in your relationships today you are called to a more patient love.' },
  { verseRef: 'John 14:27', verseText: 'Peace I leave with you, my peace I give unto you: not as the world giveth, do I give unto you.', reflectionTitle: 'A Different Peace', reflection: 'The peace Christ offers does not depend on circumstances. Ask for it specifically in whatever is unsettled today.' },
  { verseRef: 'Psalm 46:10', verseText: 'Be still and see that I am God.', reflectionTitle: 'Be Still', reflection: 'Before the noise of the day begins, take sixty seconds of true silence and simply rest in his presence.' },
  { verseRef: 'Galatians 2:20', verseText: 'I live, now not I, but Christ liveth in me.', reflectionTitle: 'Christ in Me', reflection: 'Union with Christ is not a metaphor — it is offered anew at every Mass and every moment of grace.' },
  { verseRef: 'James 1:19', verseText: 'Let every man be swift to hear, but slow to speak, and slow to anger.', reflectionTitle: 'Slow to Anger', reflection: 'Before your next difficult conversation today, ask the Holy Spirit for the grace to listen first.' },
  { verseRef: 'Psalm 119:105', verseText: 'Thy word is a lamp to my feet, and a light to my paths.', reflectionTitle: 'A Lamp Unto My Feet', reflection: 'You may not see the whole road ahead, but Scripture gives enough light for the next step.' },
  { verseRef: 'Matthew 5:16', verseText: 'Let your light shine before men, that they may see your good works, and glorify your Father.', reflectionTitle: 'Let Your Light Shine', reflection: 'What is one small, unseen act of goodness you can offer today, purely for the glory of God?' },
  { verseRef: 'Luke 1:38', verseText: 'Behold the handmaid of the Lord; be it done to me according to thy word.', reflectionTitle: 'Mary\'s Fiat', reflection: 'Mary\'s yes changed history. Where is God inviting a small yes from you today, even without knowing the full outcome?' },
  { verseRef: 'Psalm 139:14', verseText: 'I will praise thee, for thou art fearfully wonderfully made.', reflectionTitle: 'Fearfully and Wonderfully Made', reflection: 'You are not an accident. Let this truth shape how you see yourself and everyone you meet today.' },
  { verseRef: 'Colossians 3:23', verseText: 'Whatsoever you do, do it from the heart, as to the Lord, and not to men.', reflectionTitle: 'Work as Prayer', reflection: 'Offer your ordinary work today as a prayer — it becomes worship when done with love.' },
  { verseRef: 'Matthew 18:20', verseText: 'For where there are two or three gathered together in my name, there am I in the midst of them.', reflectionTitle: 'Gathered in His Name', reflection: 'Community is not incidental to the Christian life. Who can you reach out to today in Christ\'s name?' },
  { verseRef: '2 Corinthians 12:9', verseText: 'My grace is sufficient for thee: for power is made perfect in infirmity.', reflectionTitle: 'Grace in Weakness', reflection: 'Your weaknesses are not disqualifications; they are the very places where God\'s power shows most clearly.' },
]

export const seasonalGreetings: Record<string, string> = {
  Advent: 'A season of watchful hope as we prepare for the coming of Christ.',
  Christmas: 'A season of joy at the birth of our Savior, Emmanuel, God with us.',
  Lent: 'A season of prayer, fasting, and almsgiving on our journey to Easter.',
  'Sacred Triduum': 'The holiest days of the year — from the Last Supper to the empty tomb.',
  Easter: 'Fifty days of rejoicing — Christ is risen, alleluia!',
  'Ordinary Time': 'The season of growth, as we walk with Christ through everyday discipleship.',
}

export function usccbReadingsUrl(date: Date): string {
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const yy = String(date.getFullYear()).slice(-2)
  return `https://bible.usccb.org/bible/readings/${mm}${dd}${yy}.cfm`
}

export function reflectionForDate(date: Date): DailyReflection {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const dayOfYear = Math.floor(diff / 86400000)
  return dailyReflections[dayOfYear % dailyReflections.length]
}
